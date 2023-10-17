import { useEffect } from "react"
import { useRef } from "react"
import {useState } from "react"
import ReactPaginate from "react-paginate"
import Product from "./Product"

// new issues

// you have changed the mapped items now for some reason it maps only all items there is a problem with current items

// second component doesn t update current_page correctly handle initial page function needs a better defined condition so it doesn t go 1 time in if and other in else





/// old
// there are problems with rendering current items when selecting filters,

//  for some reason when you select filters and other pages than one are selected you won t see the current selected items and it returns empty array

// my guess is that it searches for page 2 and I don t understand how to update it to not search for a second page

// const [currentItems, setCurrentItems] = useState([])
// const pageCount = Math.ceil(items.length / itemsPerPage)

// useEffect(() => {
//   const endOffset = itemOffset + itemsPerPage
//   const updatedCurrentItems = items.slice(itemOffset, endOffset)
//   setCurrentItems(updatedCurrentItems)
// }, [items, itemOffset, itemsPerPage])

const Pagination = ({
  itemsPerPage,
  items,
  updateCounter,
  viewOptionToggle,
}) => {
  const [itemOffset, setItemOffset] = useState(0)
  const [initialPage, setInitialPage] = useState(0)

  const endOffset = itemOffset + itemsPerPage
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length

    localStorage.setItem("current_page", event.selected)
    setInitialPage(event.selected)
    
    

    setItemOffset(newOffset)
    window.scrollTo(0, 0)
  }

  

  // useEffect(() => {
  //   const currentPage = localStorage.getItem("current_page")

  //       if(currentPage && currentItems.length >= itemsPerPage){
  //         const num = JSON.parse(currentPage)
  //         console.log("asd", num)
  //         setInitialPage(num)
  //       }
  //       else {
  //         const newOffset = (1 * itemsPerPage) % items.length
  //        setInitialPage(newOffset)

  //       }

  //       // console.log(pageCount ,"pageCount")

  //       // if(pageCount <= 1){
  //       //   localStorage.setItem("current_page", 0)
  //       //   return 0
  //       // }

  //       // return 0
  // }, [initialPage])

  const handleInitialPage = () => {
    const currentPage = localStorage.getItem("current_page")
    const num = JSON.parse(currentPage)

    console.log(items.length, currentItems.length, "items length")


    if (items.length >= itemsPerPage) {
      console.log("num", num)

      
      return num
    }
    // if(pageCount === 1)
     else {
      console.log(0, "A ZERO")
    
      return 0
    }

 
  }

  // const initialPageResult = handleInitialPage()

  // it is a combination of this useEffect and the function above

  useEffect(() => {
    const initialPageResult = handleInitialPage()
    
    const newOffset = (initialPageResult * itemsPerPage) % items.length

    localStorage.setItem("current_page", initialPageResult)

    console.log(initialPageResult)
  
      setItemOffset(newOffset)

      setInitialPage(initialPageResult)
    
    

  }, [items])

console.log(items)
  // console.log(currentItems, itemOffset, endOffset, "current items")
  // console.log(initialPageResult, pageCount, "initial page and page count")

  // useEffect(() => {
  //   const initial = JSON.parse(localStorage.getItem("current_page"))

  //   // console.log(initialPage)
  //   if(items.length <= itemsPerPage){
  //     setInitialPage(0)
  //     console.log("SA", initialPage)
  //   }  else {
  //     console.log("ba")
  //     setInitialPage(initial)
  //   }

  // },[items])
  
  return (
    <>
      <div
        className={`generated-products${viewOptionToggle ? "-line" : ""}`}
        id="generated-products"
      >
        {currentItems.map((item) => {
          const {
            id,
            name,
            images,
            price,
            discount: ifDiscount,
            new: ifNew,
          } = item
          return (
            <Product
              key={id}
              {...{
                name,
                price,
                ifDiscount,
                ifNew,
                id,
                updateCounter,
              }}
              productImage={images.display.first}
            />
          )
        })}
      </div>

      <ReactPaginate
        // initialPage={initialPage}
        forcePage={initialPage}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="pagination-element"
      />
    </>
  )
}
export default Pagination