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



const Filters = ({currentItems}) => {
  const [checkedItems, setCheckedItems] = useState(filters)


  // Maybe this needs to also be stored in local storage so I can access
  const handleCheckboxChange = (obj, item, isChecked) => {
    setCheckedItems({
      ...checkedItems,
      [obj]: {
        ...checkedItems[obj],
        [item]: isChecked
      },
    })
  }


  // console.log(checkedItems)

  //   handleCheckboxChange("categories", "smart-band", false)
    

  const returnFromSearch = (list, fromList) => {

    const uniqueCategories = list.reduce((accumulator, currentValue) => {

      if (fromList !== "price") {
        const value = accumulator.find(element => element.name === currentValue[fromList])

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
       

        const filter = priceRanges.find(element => 
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


  // console.log(returnFromSearch(currentItems, "category"))
  // console.log(checkedItems)
  
  const totalFilters = {
    category: returnFromSearch(currentItems, "category"),
    brand: returnFromSearch(currentItems, "brand"),
    price: returnFromSearch(currentItems, "price")
  }

  
  // Here I need up update count based on a products array
  
  // THE BIG IDEA IN FILTERS AND THEIR UPDATE SYSTEM
  
  // - the filters have to work like a cascade and re-render only the filters (you can do that maybe by somehow having a useEffects dependencies in all filters that update somehow in cascade)
  //    - when categories is accessed only brands and price change (maybe you need different functions for each category or a function that chooses which to update)
  //    - when brands is accessed only price changes
  
  





  
  // !!!!!!!!!!!!!!!!!!!!
  
  // Current IDEEA now you have to think about how are you going to generate an array of items based on the clicked filters
  // console.log(checkedItems, totalFilters)
  
  const returnCheckedItems = () => {
// checkedItems, totalFilters

    for(const key in totalFilters){
      // console.log(totalFilters[key])
      if(checkedItems[key]){
        // console.log(checkedItems[key])
        const data = totalFilters[key].map(el => {

          for(const secKey in checkedItems[key]){

          if (el.name === secKey && checkedItems[key][secKey]) {
            // console.log(checkedItems[key][secKey])
            // console.log(el.products)
            return el.products
          }
          }

          // checkedItems.map(secEl => {
          //   if (el.name === secEl) {
          //     console.log(secEl)
          //   }
          // })
          
        })

        console.log(data)
      }
    }


  }
  returnCheckedItems()
 // This function needs to return the arrays of the selected filters



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
          span={"all available products"}
          items={[
            {
              currentItems,
              name: "all available products",
              count: currentItems.length,
            },
          ]}
          {...{ handleCheckboxChange, checkedItems }}
        />
        {/* <div className="filter-container">
          <span id="filter-container-name" itemID="all-products-label">
            All available products
          </span>
          <div>
            <input id="all-items" type="checkbox" autoComplete="off" />
            <label htmlFor="all-items" name="all-items">
              products(<span id="all-items-count"></span>){" "}
            </label>
          </div>
        </div> */}

        {/* In all of these you will have to pass processed arrays */}

        <FilterContainer
          span={"category"}
          items={totalFilters.category}
          {...{ handleCheckboxChange, checkedItems }}
        />
        {/* <div className="filter-container">
          <span id="filter-container-name">Category</span>
          <aside>

       
            <div>
                <input id='${editName}' type="checkbox" autocomplete="off" />
              <label for='${editName}' name={editName}>
                ${name}
                <span>({count})</span> 
              </label>
            </div>
          </aside>
        </div> */}

        <FilterContainer
          span={"brand"}
          items={totalFilters.brand}
          {...{ handleCheckboxChange, checkedItems }}
        />
        {/* <div className="filter-container">
          <span id="filter-container-name">Brand</span>
          <aside></aside>
        </div> */}

        <FilterContainer
          span={"price"}
          items={totalFilters.price}
          {...{ handleCheckboxChange, checkedItems }}
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