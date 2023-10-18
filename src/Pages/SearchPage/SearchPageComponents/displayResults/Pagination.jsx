import { useEffect } from "react"
import {useState } from "react"
import ReactPaginate from "react-paginate"
import Product from "./Product"



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

  const handleInitialPage = () => {
    const currentPage = localStorage.getItem("current_page")
    const num = JSON.parse(currentPage)

    return num
  }


  useEffect(() => {
    const initialPageResult = handleInitialPage()
    const newOffset = (initialPageResult * itemsPerPage) % items.length

    localStorage.setItem("current_page", initialPageResult)

    setItemOffset(newOffset)
    setInitialPage(initialPageResult)
  }, [items])


 
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