import { useEffect } from "react"
import { useState } from "react"
import Pagination from "./Pagination"


const DisplayResults = ({
  updateCounter,
  currentItems,
  setFiltersToggle,
  filtersToggle,
  currentSearch
}) => {
  // Here you will need to pass the count and use it in the individual item loaded

  

  return (
    <div className="display-search-results">
      <div className="manipulate-result">
        <p className="search-text-result" >
          <span className="result-count">{currentItems.length}</span>
          <span>
            {" "}
            {currentItems.length > 1 ? "results" : "result"} for
            <span className="result-text">"{currentSearch}"</span>
          </span>
        </p>

        <ul className="list-of-filters"></ul>

        <div className="about-filters">
          <button
            className="filter-button button-1"
            id="filter-button"
            onClick={() => setFiltersToggle(!filtersToggle)}
          >
            Filters
          </button>

          <div className="select-box">
            <p className="select">Order after</p>
            <ul className="select-menu hide">
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
            <ul className="select-menu hide">
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

      
      <Pagination
        items={currentItems}
        itemsPerPage={8}
        updateCounter={updateCounter}
      />
    </div>
  )
}
export default DisplayResults