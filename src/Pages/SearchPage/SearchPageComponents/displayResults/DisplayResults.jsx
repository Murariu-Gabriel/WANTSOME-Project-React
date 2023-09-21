import Product from "./Product"

const DisplayResults = ({ updateCounter, currentItems }) => {
  // Here you will need to pass the count

  return (
    <div className="display-search-results">
      <div className="manipulate-result">
        <p className="search-text-result" id="search-text-result">
          <span className="result-count" id="result-count">
            0
          </span>{" "}
          <span id="plural">results</span> for
          <span className="result-text" id="result-text">
            ""
          </span>
        </p>

        <ul className="list-of-filters"></ul>

        <div className="about-filters">
          <button className="filter-button button-1" id="filter-button">
            Filter
          </button>

          <div className="select-box">
            <p className="select">Order after</p>
            <ul className="select-menu hide" id="select-order">
              <li>
                <span>Increasing</span> price
              </li>
              <li>
                <span>Decreasing</span> price
              </li>
              <li>
                <span>New</span> products
              </li>
              <li>Discount</li>
            </ul>
            <span className="arrows"></span>
          </div>

          <div className="select-box select-pagination">
            <p className="select">Pagination</p>
            <ul className="select-menu hide" id="select-pagination">
              <li>9 on page</li>
              <li>18 on page</li>
            </ul>
            <span className="arrows"></span>
          </div>

          <button
            className="button change-style-button"
            id="change-style-button"
          >
            <svg
              className=""
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 -40 512 512"
              height="2.5rem"
              width="2.5rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
            </svg>
            <svg
              className="hide"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 -1 16 16"
              height="2.5rem"
              width="2.5rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="generated-products" id="generated-products">
        {currentItems.map(item => {
          const {id, name, images, price, discount: ifDiscount, new: ifNew} = item
          return <Product key={id} {...{name, price, price, price, ifDiscount, ifNew, id}} productImage={images.display.first}/>
        })}
      </div>

      <div className="pagination" id="pagination"></div>
    </div>
  )
}
export default DisplayResults