import FilterElement from "./FilterElement"

const FilterContainer = ({
  span,
  handleCheckboxChange,
  items,
  checkedItems,
}) => {
  // each generated item needs to be passed down different arrays of items

  const handleChange = (name, status) => {
    handleCheckboxChange(span, name, status)
  }

  return (
    <div className="filter-container">
      <span>{span}</span>
      <aside>
        {items.map((item) => {
          const { count, name } = item

          return (
            <FilterElement
              key={crypto.randomUUID()}
              {...{ count, name, handleChange, span, checkedItems }}
            />
          )
        })}
      </aside>
    </div>
  )
}
export default FilterContainer