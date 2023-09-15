import { useEffect } from "react"
import { useState } from "react"
import getFromDataBase from "../../../../Components/ReusableComponents/Functions/getFromDataBase"
import getLocalStorageItems from "../../../../Components/ReusableComponents/Functions/getLocalStorageItems"
import FilterContainer from "./FilterContainer"



const priceRanges = getFromDataBase("http://localhost:3000/price-ranges")
priceRanges.then(data => {
  const ranges = JSON.stringify(data)
  localStorage.setItem("price-ranges", ranges)
})



const Filters = ({currentItems, setCurrentItems, allItems, currentSearchedItems}) => {
  const filters = getLocalStorageItems("filters")

  const handleCheckboxChange = (obj, item, isChecked) => {
    const touchedItems = {
      ...filters,
      [obj]: {
        ...filters[obj],
        [item]: isChecked,
      },
    }

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

  // Current IDEA now you have to figure out how to make brand re-render only price

  const checkIfAllFiltersFalse = (filters) => {
    for (const filter in filters) {
      for (const key in filters[filter]) {
        if (filters[filter][key]) {
          return false
        }
      }
    }

    return true
  }


  // IMPORTANT - THIS PART BE BROKEN IN MULTIPLE FUNCTIONS
  // - it seems like this function returns all checked items like intended but it doesn't take in account the fact that it must return checked items based on filter containers


  // Idea, you could use this function multiple times and somehow check for last used filter category
  const returnCheckedItems = () => {
    const filters = getLocalStorageItems("filters")

    console.log(filters)
    // This part does't work as intended it returns only what has been checked inside category it needs re-working
    for (const key in totalFilters) {
      const data = totalFilters[key].reduce((accumulator, currentItem) => {
        for (const secKey in filters[key]) {
          if (currentItem.name === secKey && filters[key][secKey]) {
            return accumulator.concat(currentItem.products)
          }
        }

        return accumulator
      }, [])
      return data
    }
  }

 

  // A problem of this function is that it checks for the fact that on click the first data obtained is an empty array and this affects the flow

  const handleFilters = (array) => {

    if (returnCheckedItems().length !== 0) {
      return returnCheckedItems()
    }

    if (checkIfAllFiltersFalse(filters)) {
      console.log(array)
      return array
    } else {
      return currentSearchedItems
    }
  }

  // console.log(returnCheckedItems())

  const passCurrentItems = (array) => {
    setCurrentItems(handleFilters(array))
    console.log(handleFilters(array), filters)
     console.log(returnCheckedItems())
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
          {...{ handleCheckboxChange, filters, passCurrentItems }}
        />

        <FilterContainer
          span={"category"}
          items={totalFilters.category}
          {...{ handleCheckboxChange, filters, passCurrentItems }}
        />

        <FilterContainer
          span={"brand"}
          items={totalFilters.brand}
          {...{ handleCheckboxChange, filters, passCurrentItems }}
        />

        <FilterContainer
          span={"price"}
          items={totalFilters.price}
          {...{ handleCheckboxChange, filters, passCurrentItems }}
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