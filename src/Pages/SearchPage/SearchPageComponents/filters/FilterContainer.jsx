import FilterElement from "./FilterElement"

const FilterContainer = ({span}) => {



    // each generated item needs to be passed down different arrays of items

  return (
    <div className="filter-container">
      <span id="filter-container-name">{span}</span>
      <aside>
        {/* <FilterElement/> */}
        {/* // Here there will be a map creating elements representing category or brand with counts  */}
      </aside>
    </div>
  )
}
export default FilterContainer