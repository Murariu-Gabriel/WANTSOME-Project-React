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

  const endOffset = itemOffset + itemsPerPage
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length

    setItemOffset(newOffset)
  }

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