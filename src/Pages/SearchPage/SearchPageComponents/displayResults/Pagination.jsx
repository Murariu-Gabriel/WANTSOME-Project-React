import { useEffect } from "react"
import {useState } from "react"
import ReactPaginate from "react-paginate"
import Product from "./Product"

// there are problems with rendering current items when selecting filters,

// when making new searches filters should be deleted



const Pagination = ({
  itemsPerPage,
  items,
  updateCounter,
  viewOptionToggle,
}) => {
  const [itemOffset, setItemOffset] = useState(0)
  // const [initialPage, setInitialPage] = useState(0)

  const endOffset = itemOffset + itemsPerPage
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length

    localStorage.setItem("current_page", event.selected)

    console.log(newOffset)

    setItemOffset(newOffset)
    window.scrollTo(0, 0)
  }
  console.log(pageCount)


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

    if(currentPage && currentItems.length >= itemsPerPage){
      const num = JSON.parse(currentPage)
      
      return num
    } else {
      console.log('0 ??')
     return 1 
    }

    console.log(pageCount ,"pageCount")

    if(pageCount <= 1){
      localStorage.setItem("current_page", 0)
      return 0
    }

    return 0
 }

 const initialPageResult = handleInitialPage()

 useEffect(() => {
  if(initialPageResult === 0){
    const newOffset = (1 * itemsPerPage) % items.length
    // setItemOffset(newOffset)
  }
 }, [])

 console.log(initialPageResult, items)

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
        initialPage={initialPageResult}
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="pagination-element"
      />
    </>
  )
}
export default Pagination