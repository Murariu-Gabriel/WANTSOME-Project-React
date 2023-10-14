import { useEffect } from "react"
import { useState } from "react"
import Pagination from "./Pagination"
import SelectBox from "./SelectBox"


const DisplayResults = ({
  updateCounter,
  currentItems,
  setFiltersToggle,
  filtersToggle,
  currentSearch,
  setCurrentItems,
 
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [viewOptionToggle, setViewOptionToggle] = useState(false)

  const handleViewChange = () => {
    setViewOptionToggle(!viewOptionToggle)
  }

  return (
    <div className="display-search-results">
      <div className="manipulate-result">
        <p className="search-text-result">
          <span className="result-count">{currentItems.length}</span>
          <span>
            {" "}
            {currentItems.length > 1 ? "results" : "result"} for{" "}
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

          <SelectBox
            selectType={"Order after"}
            selectableItems={[
              "Increasing price",
              "Decreasing price",
              "New products",
              "Discount",
            ]}
            setCurrentItems={setCurrentItems}
            currentItems={currentItems}
          
          />

          <SelectBox
            selectType={"9 on page"}
            selectableItems={["9 on page", "18 on page"]}
            givenClass={"select-pagination"}
            setItemsPerPage={setItemsPerPage}
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
           
          />

          <button
            className="button change-style-button"
            id="change-style-button"
            onClick={handleViewChange}
          >
            {viewOptionToggle ? (
              <svg
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
            ) : (
              <svg
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
            )}
          </button>
        </div>
      </div>

      <Pagination
        items={currentItems}
        itemsPerPage={itemsPerPage}
        updateCounter={updateCounter}
        viewOptionToggle={viewOptionToggle}
      />
    </div>
  )
}
export default DisplayResults