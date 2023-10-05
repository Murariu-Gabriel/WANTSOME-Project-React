import { useEffect, useState } from "react"
import getProducts from "../../../Components/ReusableComponents/Functions/getProducts"
import replaceLine from "../../../Components/ReusableComponents/Functions/replaceLine"
import DisplayResults from "./displayResults/DisplayResults"
import Filters from "./filters/Filters"

const GenerateSearchPage = ({ updateCounter, currentSearch }) => {
  const [currentItems, setCurrentItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [currentSearchedItems, setCurrentSearchedItems] = useState([])
  const [filtersToggle, setFiltersToggle] = useState(false)
  
  

 
 
 
 const products = getProducts()
 
 useEffect(() => {
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
    
    
    
  return (
    <section className="generated-search-result ">
      <div className="container ">
        <Filters
          {...{
            currentSearchedItems,
            currentItems,
            allItems,
            setCurrentItems,
            setFiltersToggle,
            filtersToggle,
          }}
        />

        <DisplayResults
          {...{
            updateCounter,
            currentItems,
            filtersToggle,
            setFiltersToggle,
            currentSearch,
            setCurrentItems,
          }}
        />
      </div>
    </section>
  )
}

export default GenerateSearchPage