import {useState } from "react"
import ReactPaginate from "react-paginate"
import Product from "./Product"

// You need to fix the anchors, they don t take full width or height and you can miss click the next paginated list of items

const Pagination = ({ itemsPerPage, items }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  const [itemOffset, setItemOffset] = useState(0)

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  const endOffset = itemOffset + itemsPerPage
  console.log(`Loading items from ${itemOffset} to ${endOffset}`)

  const currentItems = items.slice(itemOffset, endOffset)
  console.log(currentItems)

  const pageCount = Math.ceil(items.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
   
  }



  return (
    <>
      <div className="generated-products" id="generated-products">
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
              {...{ name, price, price, price, ifDiscount, ifNew, id }}
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