const Filters = () => {

  // Here I need up update count based on a products array

  // I need to update or generate filters based on items categories, brand and price ranges

  // might need to make system that remembers, and stores what filters have been applied


  return (
    <div className="filters">
      <div className="filter-navigation">
        <p>
          <span id="products-counter">41</span> products
        </p>
        <button className="button-2" id="display-result">
          display
        </button>
      </div>

      <div className="generated-filters">
        <div className="hide" id="remove-all-filters-parent">
          <button className="remove-all-filters button" id="remove-all-filters">
            Remove all filters <span> X</span>
          </button>
        </div>

        <div className="filter-container">
          <span id="filter-container-name" itemID="all-products-label">
            All available products
          </span>
          <div>
            <input id="all-items" type="checkbox" autoComplete="off" />
            <label htmlFor="all-items" name="all-items">
              products(<span id="all-items-count"></span>){" "}
            </label>
          </div>
        </div>

        <div className="filter-container">
          <span id="filter-container-name">Category</span>
          <aside></aside>
        </div>

        <div className="filter-container">
          <span id="filter-container-name">Brand</span>
          <aside></aside>
        </div>

        <div className="filter-container">
          <span id="filter-container-name">price</span>
          <aside>
            <div>
              <input id="0-50" type="checkbox" />
              <label htmlFor="0-50" name="0-50">
                0 - 50 <span id="filter-product-count">(2)</span>{" "}
              </label>
            </div>
          </aside>

          <div className="price-by-range">
            <input id="price-interval" type="checkbox" />
            <label htmlFor="price-interval" name="price-interval">
              Price Interval{" "}
            </label>
            <span id="filtered-products-count"></span>

            <div className="price-input">
              <input
                type="number"
                className="input-min"
                value="0"
                autoComplete="off"
              />

              <span className="separator">-</span>

              <input
                type="number"
                className="input-max"
                value="1000"
                autoComplete="off"
              />

              <button className="button" id="range-button">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 22 24"
                  height="1.5rem"
                  width="1.5rem"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
                </svg>
              </button>
            </div>

            <div className="range-slider">
              <span className="progress"></span>
              <div className="range-input">
                <input
                  type="range"
                  className="range-min"
                  min="0"
                  max="1000"
                  value="500"
                  autoComplete="off"
                />
                <input
                  type="range"
                  className="range-max"
                  min="0"
                  max="1000"
                  value="1000"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Filters