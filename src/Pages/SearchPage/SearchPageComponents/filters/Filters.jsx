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

  console.log(currentItems, "ITEMS IN THE PARENT COMPONENT")




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

  console.log(totalFilters, "At the top of component, all items divided")

  const checkIfAllFiltersFalse = (toCheck) => {
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

    // console.log(entries)

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

    console.log(allCheckedArray, "items accumulated from all the checkboxes ")

    return allCheckedArray
  }


  
  const handleFilterUpdates = () => {
    const filters = getLocalStorageItems("filters")
    // const currentItemsForAllFilters = returnCheckedItems()

    console.log(returnCheckedItems(), "IMPORTANT")

    // console.log(currentItemsForAllFilters)
    // console.log(totalFilters)
    // console.log(filters)

    // NEXT

    // now on click, all available products doesn't update and it s because of updateFilterContainers

    // another problem now is that price still renders the first clicked items and hides the other filters

    // the problem with all-available-products is that if i click on it while other filters are on the function that handles filters is returning me the last selected filter AND also now it does not update price and brand because of updateFilterContainers

  

  

    
      if (
        !checkIfAllFiltersFalse(filters.price) &&
        returnCheckedItems().price.length !== 0
      ) {
        console.log(returnCheckedItems().price)
        if(!checkIfAllFiltersFalse(filters["all-available-products"])){
          console.log("da")
        }

        return returnCheckedItems().price
      } else if (
        !checkIfAllFiltersFalse(filters.brand) &&
        returnCheckedItems().brand.length !== 0
      ) {
        console.log(returnCheckedItems().brand)
        return returnCheckedItems().brand

      } else if (!checkIfAllFiltersFalse(filters.category)) {
        console.log(returnCheckedItems().category)
        return returnCheckedItems().category

      } else if (!checkIfAllFiltersFalse(filters["all-available-products"])) {
        console.log(returnCheckedItems()["all-available-products"])
        return totalFilters["all-available-products"][0].products

      } else {
        //  console.log(currentSearchedItems)
        return currentSearchedItems
      }
    
    // console.log(filters, "CurrentFilters")
  }
  

  if (
    returnCheckedItems().category.length !== 0 &&
    returnCheckedItems().brand.length === 0
  ) {
    console.log(returnCheckedItems().category)
    totalFilters.brand = returnFromSearch(
      returnCheckedItems().category,
      "brand"
    )

    // totalFilters.price = returnFromSearch(
    //   returnCheckedItems().category,
    //   "price"
    // )
  }


  // console.log(returnCheckedItems().brand)

  if (returnCheckedItems().brand.length !== 0) {
    console.log(returnCheckedItems().brand)
    totalFilters.price = returnFromSearch(
      returnCheckedItems().brand,
      "price"
    )
  }


  // this function breaks loading of brand and price filters
  const updateFilterContainers = () => {
    const filters = getLocalStorageItems("filters")

  
  
   
    console.log(checkIfAllFiltersFalse(filters.brand))

    if (
      checkIfAllFiltersFalse(filters.category) &&
      returnCheckedItems()["all-available-products"].length === 0
    ) {
      console.log("meh")
      totalFilters.brand = returnFromSearch(currentSearchedItems, "brand")

    } else if (
      !checkIfAllFiltersFalse(filters["all-available-products"]) &&
      checkIfAllFiltersFalse(filters.category)
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
      checkIfAllFiltersFalse(filters.brand) &&
      returnCheckedItems().brand.length === 0 
      // && checkIfAllFiltersFalse(filters.category)
      && returnCheckedItems()["all-available-products"].length === 0
    ) {
      console.log("meh")
      totalFilters.price = returnFromSearch(currentSearchedItems, "price")

    } else if (!checkIfAllFiltersFalse(filters["all-available-products"]) &&
      checkIfAllFiltersFalse(filters.brand)
    ){
      console.log("totals")
       totalFilters.price = returnFromSearch(
         returnCheckedItems()["all-available-products"],
         "price"
       )
    } else  {
      totalFilters.price = returnFromSearch(
        returnCheckedItems().brand,
        "price"
      )
    }

  }
  updateFilterContainers() 



  // QUARANTINE PART | THIS CODE IS OUT, NEEDS UPDATING
  // const handleFilters = (array) => {
  //   // if (returnCheckedItems().length !== 0) {
  //   //   return returnCheckedItems()
  //   // }

  //   console.log(checkIfAllFiltersFalse(filters))

  //   if (checkIfAllFiltersFalse(filters)) {
  //     // console.log(array)
  //     return array
  //   } else {
  //     return currentSearchedItems
  //   }
  // }

  // console.log(returnCheckedItems())

  // Function that sends items to the parent component that re-renders everything
  const passCurrentItems = (y) => {
    // setCurrentItems(array)
    setCurrentItems(handleFilterUpdates())
    // console.log(handleFilterUpdates())

    // setCurrentItems(handleFilters(array))
    // console.log(handleFilters(array), filters)
    //  console.log(returnCheckedItems(),
    //  filters
    //  )
    //  handleFilterUpdates()
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
          items={totalFilters["all-available-products"]}
          {...{ 
            // handleCheckboxChange,
            //  filters,
              passCurrentItems }}
        />

        <FilterContainer
          span={"category"}
          items={totalFilters.category}
          {...{ 
            // handleCheckboxChange, 
            // filters,
             passCurrentItems }}
        />

        <FilterContainer
          span={"brand"}
          items={totalFilters.brand}
          {...{ 
            // handleCheckboxChange, 
            // filters,
             passCurrentItems }}
        />

        <FilterContainer
          span={"price"}
          items={totalFilters.price}
          {...{ 
            // handleCheckboxChange,
            //  filters,
              passCurrentItems }}
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




// pieces of code for later in case I need







// if (currentItemsForAllFilters.brand.length !== 0) {
//   console.log(currentItemsForAllFilters.brand)
//   totalFilters.price = returnFromSearch(
//     currentItemsForAllFilters.brand,
//     "price"
//   )
//   // return []
// } else if (currentItemsForAllFilters.category.length !== 0) {
//   console.log(currentItemsForAllFilters.category)

//   const currentStatus = returnFromSearch(
//     currentItemsForAllFilters.category,
//     "brand"
//   )

//   totalFilters.brand = currentStatus
//   console.log(totalFilters)

//   const concatArrays = currentStatus.reduce((accumulator, currentItem) => {
//     return accumulator.concat(currentItem.products)
//   }, [])

//   console.log(concatArrays)

//   return concatArrays
// }




//  if (!checkIfAllFiltersFalse(filters["all-available-products"])) {
//    console.log(currentItemsForAllFilters["all-available-products"])
//    return totalFilters["all-available-products"][0].products
//  } else if (!checkIfAllFiltersFalse(filters.category)) {
//    console.log(currentItemsForAllFilters.category)
//    return currentItemsForAllFilters.category
//  } else if (
//    !checkIfAllFiltersFalse(filters.brand) &&
//    currentItemsForAllFilters.category.length == 0
//  ) {
//    console.log(currentItemsForAllFilters.brand)
//    return currentItemsForAllFilters.brand
//  } else if (
//    !checkIfAllFiltersFalse(filters.price) &&
//    currentItemsForAllFilters.brand.length == 0
//  ) {
//    console.log(currentItemsForAllFilters.price)
//    return currentItemsForAllFilters.price
//  } else {
//    console.log(currentSearchedItems)
//    return currentSearchedItems
//  }




