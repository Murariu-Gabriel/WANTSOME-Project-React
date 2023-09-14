import { useEffect, useState } from "react"
import getProducts from "../../../Components/ReusableComponents/Functions/getProducts"
import replaceLine from "../../../Components/ReusableComponents/Functions/replaceLine"
import DisplayResults from "./DisplayResults"
import Filters from "./filters/Filters"

const GenerateSearchPage = ({ updateCounter, currentSearch }) => {
  const [currentItems, setCurrentItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [currentSearchedItems, setCurrentSearchedItems] = useState([])

  
  // and have a function that is passed into filters so when I activate a filter to update the display results and filters so they can be re-rendered

  const updateCurrentItems = (items) => {
    
    // ideally this function should take care dynamically of getting out or adding elements
    
  }
  
  
  /*
  This whole section of components should be like a circle and might need to be applied in the filters component
  
  - items come in everything renders
  - filter is selected then only the items selected remain, everything re-renders and generated based on the selected filter/filters
  
  - if no filters are selected render initial search, if all filters are deselected render initial search
  
  
  */
 
 
 
 const products = getProducts()
 
 useEffect(() => {
   // maybe this could be put in a function in case I need to reset to initial search
   products.then((data) => {
     const filteredData = data.filter(
       (product) =>
       product.name.includes(currentSearch) ||
       replaceLine(product.category).includes(currentSearch)
       )
       
       setCurrentItems(filteredData)
       setCurrentSearchedItems(filteredData)
       setAllItems(data)
      })
    }, [])
    
    
    // console.log(currentItems)
    
  return (
    <section className="generated-search-result ">
      <div className="container ">
        <Filters
          {...{ currentSearchedItems, currentItems, allItems, setCurrentItems }}
        />

        <DisplayResults {...{ updateCounter, currentSearch, currentItems }} />
      </div>
    </section>
  )
}

export default GenerateSearchPage