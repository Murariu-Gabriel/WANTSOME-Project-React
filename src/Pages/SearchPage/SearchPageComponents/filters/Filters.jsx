import { useEffect } from "react"
import { useState } from "react"
import getFromDataBase from "../../../../Components/ReusableComponents/Functions/getFromDataBase"
import getLocalStorageItems from "../../../../Components/ReusableComponents/Functions/getLocalStorageItems"
import FilterContainer from "./FilterContainer"


const filters = getLocalStorageItems("filters")

const priceRanges = getFromDataBase("http://localhost:3000/price-ranges")
priceRanges.then(data => {
  const ranges = JSON.stringify(data)
  localStorage.setItem("price-ranges", ranges)
})



const Filters = ({ currentItems, setCurrentItems, allItems }) => {
  const [checkedItems, setCheckedItems] = useState(filters)

 

  const handleCheckboxChange = (obj, item, isChecked) => {
    const touchedItems = {
      ...checkedItems,
      [obj]: {
        ...checkedItems[obj],
        [item]: isChecked,
      },
    }

    setCheckedItems(touchedItems)
    // this works but when redered it remains clicked but array changes don t work
    const stringItems = JSON.stringify(touchedItems)
    localStorage.setItem("filters", stringItems)
  }



  // THE BIG IDEA IN FILTERS AND THEIR UPDATE SYSTEM

  // - the filters have to work like a cascade and re-render only the filters (you can do that maybe by somehow having a useEffects dependencies in all filters that update somehow in cascade)
  //    - when categories is accessed only brands and price change (maybe you need different functions for each category or a function that chooses which to update)
  //    - when brands is accessed only price changes


  const returnFromSearch = (list, fromList) => {
    // console.log(list)

    const uniqueCategories = list.reduce((accumulator, currentValue) => {
      if (fromList !== "price") {
        const value = accumulator.find(
          (element) => element.name === currentValue[fromList]
        )

        if (!value) {
          accumulator.push({
            name: currentValue[fromList],
            count: 0,
            products: [],
          })
        }

        accumulator.forEach((element) => {
          if (element.name === currentValue[fromList]) {
            element.count++
            element.products.push(currentValue)
          }
        })
      } else {
        const priceRanges = getLocalStorageItems("price-ranges")

        const filter = priceRanges.find(
          (element) =>
            element.rangeMin <= currentValue[fromList] &&
            currentValue[fromList] < element.rangeMax
        )

        const rangeString = filter.priceRange
        const minRange = filter.rangeMin

        const value = accumulator.find(
          (element) => element.name === rangeString
        )

        if (!value) {
          accumulator.push({
            name: rangeString,
            count: 0,
            products: [],
            min: minRange,
          })
        }

        accumulator.forEach((element) => {
          if (element.name === rangeString) {
            element.count++
            element.products.push(currentValue)
          }
        })
      }

      return accumulator
    }, [])

    if (fromList === "price") {
      const sortedRanges = uniqueCategories.sort((a, b) => a.min - b.min)
      return sortedRanges
    }
    return uniqueCategories
  }

  const totalFilters = {
    category: returnFromSearch(allItems, "category"),
    brand: returnFromSearch(currentItems, "brand"),
    price: returnFromSearch(currentItems, "price"),
  }



  // !!!!!!!!!!!!!!!!!!!!

  // Current IDEA now you have to figure out how to return to previous state when uncheck

  // Somewhere in the code something does not update immediately the current array of filtered checked items
  // but that actually needs to be fixed from the filterElement itself

  // On the first click return checked items returns an empty array instead of the clicked items


 // THIS FUNCTION MIGHT NEED RETHINKING
  const returnCheckedItems = (array) => {
    // console.log(checkedItems, totalFilters, currentItems)

    for (const key in totalFilters) {
      console.log(checkedItems[key])
      if (checkedItems[key]) {
        const data = totalFilters[key].reduce((accumulator, currentItem) => {
          for (const secKey in checkedItems[key]) {
            if (currentItem.name === secKey && checkedItems[key][secKey]) {
              // console.log(currentItem.name, secKey, checkedItems[key][secKey])

              return accumulator.concat(currentItem.products)
            }
          }

          // checkedItems.map(secEl => {
          //   if (el.name === secEl) {
          //     console.log(secEl)
          //   }
          // })
          return accumulator
        }, [])
        // console.log(data)
        return data
      }
    }
    return array
  }

  // console.log(returnCheckedItems())

  const passCurrentItems = (array) => {
    // console.log(returnCheckedItems(array))
    setCurrentItems(returnCheckedItems(array))
  }

  return (
    <div className="filters">
      <div className="filter-navigation">
        <p>
          <span id="products-counter">41</span> products
        </p>
        <button className="button-2" id="display-result">
          display
        </button>
      </div>

      <div className="generated-filters">
        <div className="hide" id="remove-all-filters-parent">
          <button className="remove-all-filters button" id="remove-all-filters">
            Remove all filters <span> X</span>
          </button>
        </div>

        <FilterContainer
          span={"all-available-products"}
          items={[
            {
              products: allItems,
              name: "all-available-products",
              count: allItems.length,
            },
          ]}
          {...{ handleCheckboxChange, checkedItems, passCurrentItems }}
        />
     

        <FilterContainer
          span={"category"}
          items={totalFilters.category}
          {...{ handleCheckboxChange, checkedItems, passCurrentItems }}
        />
      

        <FilterContainer
          span={"brand"}
          items={totalFilters.brand}
          {...{ handleCheckboxChange, checkedItems, passCurrentItems }}
        />
     
        <FilterContainer
          span={"price"}
          items={totalFilters.price}
          {...{ handleCheckboxChange, checkedItems, passCurrentItems }}
        />
        {/* <div className="filter-container">
          <span id="filter-container-name">price</span>
          <aside>
            <div>
               here there will be again a map generating multiple price ranges 
              <input id="0-50" type="checkbox" />
              <label htmlFor="0-50" name="0-50">
                0 - 50 <span id="filter-product-count">(2)</span>{" "}
              </label>
            </div>
          </aside>

          <div className="price-by-range">
            <input id="price-interval" type="checkbox" />
            <label htmlFor="price-interval" name="price-interval">
              Price Interval{" "}
            </label>
            <span id="filtered-products-count"></span>

            <div className="price-input">
              <input
                type="number"
                className="input-min"
                value="0"
                autoComplete="off"
              />

              <span className="separator">-</span>

              <input
                type="number"
                className="input-max"
                value="1000"
                autoComplete="off"
              />

              <button className="button" id="range-button">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 22 24"
                  height="1.5rem"
                  width="1.5rem"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
                </svg>
              </button>
            </div>

            <div className="range-slider">
              <span className="progress"></span>
              <div className="range-input">
                <input
                  type="range"
                  className="range-min"
                  min="0"
                  max="1000"
                  value="500"
                  autoComplete="off"
                />
                <input
                  type="range"
                  className="range-max"
                  min="0"
                  max="1000"
                  value="1000"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
export default Filters