import { useEffect, useState } from "react"
import getFromDataBase from "../../../../Components/ReusableComponents/Functions/getFromDataBase"
import getLocalStorageItems from "../../../../Components/ReusableComponents/Functions/getLocalStorageItems"
import orderProducts from "../../../../Components/ReusableComponents/Functions/orderProducts"
import FilterContainer from "./FilterContainer"
import checkIfAllFiltersFalse from "../../../../Components/ReusableComponents/Functions/checkIfAllFiltersFalse"

const priceRanges = getFromDataBase("http://localhost:3000/price-ranges")

priceRanges.then(data => {
  const ranges = JSON.stringify(data)
  localStorage.setItem("price-ranges", ranges)
})

// Long story short this solution is not appropriate for applying filters to a site

// This should have been made with the json-server filtering query which is much more convenient and has more performance

const Filters = ({
  currentItems,
  setCurrentItems,
  allItems,
  currentSearchedItems,
  setFiltersToggle,
  filtersToggle,
}) => {


  const returnFromSearch = (list, fromList) => {
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
    ["all-available-products"]: [
      {
        products: allItems,
        name: "all-available-products",
        count: allItems.length,
      },
    ],
    category: returnFromSearch(allItems, "category"),
    brand: returnFromSearch(currentItems, "brand"),
    price: returnFromSearch(currentItems, "price"),
  }

  // const checkIfAllFiltersFalse = () => {
  //   const filters = getLocalStorageItems("filters")

  //   for (const filter in filters) {
  //     for (const key in filters[filter]) {
  //       if (filters[filter][key]) {
  //         return false
  //       }
  //     }
  //   }

  //   return true
  // }

  const isFilterFalse = (toCheck) => {
    // for (const filter in toCheck) {
    for (const key in toCheck) {
      if (toCheck[key]) {
        return false
      }
    }
    // }

    return true
  }

  const returnCheckedItems = () => {
    const filters = getLocalStorageItems("filters")

    const entries = Object.entries(totalFilters)

    const allCheckedArray = entries.reduce((accumulator, [key, value]) => {
      const data = totalFilters[key].reduce((accumulator, currentItem) => {
        for (const secKey in filters[key]) {
          if (currentItem.name === secKey && filters[key][secKey]) {
            return accumulator.concat(currentItem.products)
          }
        }

        return accumulator
      }, [])

      accumulator[key] = data

      return accumulator
    }, {})

    return allCheckedArray
  }

  // PROBABLY YOU WILL HAVE TO COMBINE HANDLE FILTER UPDATES WITH ALL THE IFS AND UPDATE FILTER CONTAINERS SO YOU CAN MAKE FUNCTIONALITY THAT RETURNS THE CURRENT ACTIVE FILTER ITEMS

  const handleFilterUpdates = () => {
    const filters = getLocalStorageItems("filters")

    if (
      !isFilterFalse(filters.price) &&
      returnCheckedItems().price.length !== 0
    ) {
      return returnCheckedItems().price

    } else if (
      !isFilterFalse(filters.brand) &&
      returnCheckedItems().brand.length !== 0
    ) {
      return returnCheckedItems().brand

    } else if (!isFilterFalse(filters.category)) {
     
      return returnCheckedItems().category
    } else if (!isFilterFalse(filters["all-available-products"])) {
      
      return totalFilters["all-available-products"][0].products
    } else {
      return currentSearchedItems
    }
  }

  if (
    returnCheckedItems().category.length !== 0 &&
    returnCheckedItems().brand.length === 0
  ) {
    totalFilters.brand = returnFromSearch(
      returnCheckedItems().category,
      "brand"
    )
  }

  if (returnCheckedItems().brand.length !== 0) {
   
    totalFilters.price = returnFromSearch(returnCheckedItems().brand, "price")
  }

  const updateFilterContainers = () => {
    const filters = getLocalStorageItems("filters")

    if (
      isFilterFalse(filters.category) &&
      returnCheckedItems()["all-available-products"].length === 0
    ) {
      totalFilters.brand = returnFromSearch(currentSearchedItems, "brand")
    } else if (
      !isFilterFalse(filters["all-available-products"]) &&
      isFilterFalse(filters.category)
    ) {
      totalFilters.brand = returnFromSearch(
        returnCheckedItems()["all-available-products"],
        "brand"
      )
    } else {
      totalFilters.brand = returnFromSearch(
        returnCheckedItems().category,
        "brand"
      )
    }

    if (
      isFilterFalse(filters.brand) &&
      returnCheckedItems().brand.length === 0 &&
      returnCheckedItems()["all-available-products"].length === 0
    ) {
      totalFilters.price = returnFromSearch(currentSearchedItems, "price")
    } else if (
      !isFilterFalse(filters["all-available-products"]) &&
      isFilterFalse(filters.brand)
    ) {
      totalFilters.price = returnFromSearch(
        returnCheckedItems()["all-available-products"],
        "price"
      )
    } else {
      totalFilters.price = returnFromSearch(returnCheckedItems().brand, "price")
    }
  }

  updateFilterContainers()


  // somewhere in the code this array that should be loaded with the selected filters is overwritten
  
  // the else statement works just fine


  const handleOrder = () => {
    const orderPreference = localStorage.getItem("order_preference")
    
    if(orderPreference){
      const firstWord = orderPreference.split(" ")[0].toLowerCase()
      const orderedProducts = orderProducts(firstWord, handleFilterUpdates())

      setCurrentItems(orderedProducts)
    } 
    else {

      setCurrentItems(handleFilterUpdates())
    }

  }

  const passCurrentItems = () => {
    localStorage.setItem("current_page", 0)
    handleOrder()
  }

  const deleteFilters = () => {
    localStorage.removeItem("filters")

    handleOrder()
  }

  useEffect(() => {
    handleOrder()
  }, [])

  return (
    <div className={`filters ${filtersToggle ? "display overlay" : ""}`}>
      <div className="filter-navigation">
        <p>
          <span>{currentItems.length}</span> products
        </p>
        <button
          className="button-2"
          id="display-result"
          onClick={() => setFiltersToggle(!filtersToggle)}
        >
          display
        </button>
      </div>

      <div className="generated-filters">
        <div
          className={`${checkIfAllFiltersFalse() ? "hide" : ""}`}
          id="remove-all-filters-parent"
        >
          <button
            className="remove-all-filters button"
            id="remove-all-filters"
            onClick={deleteFilters}
          >
            Remove all filters <span> X</span>
          </button>
        </div>

        <FilterContainer
          span={"all-available-products"}
          items={totalFilters["all-available-products"]}
          {...{ passCurrentItems, }}
        />

        <FilterContainer
          span={"category"}
          items={totalFilters.category}
          {...{ passCurrentItems, }}
        />

        <FilterContainer
          span={"brand"}
          items={totalFilters.brand}
          {...{ passCurrentItems, }}
        />

        <FilterContainer
          span={"price"}
          items={totalFilters.price}
          {...{ passCurrentItems, }}
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



