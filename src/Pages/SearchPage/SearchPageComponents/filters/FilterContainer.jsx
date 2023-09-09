import { useEffect } from "react"
import { useState } from "react"
import FilterElement from "./FilterElement"

const FilterContainer = ({
  span,
  handleCheckboxChange,
  items,
  checkedItems,
}) => {

  const [currentItems, setCurrentItems] = useState([])

  const handleChange = (name, status) => {
    handleCheckboxChange(span, name, status)
  }


  useEffect(() => {
    setCurrentItems(items)
  }, [items])

  // console.log(checkedItems?.[span])
  // console.log(currentItems)

  return (
    <div className="filter-container">
      <span>{span}</span>
      <aside>
        {currentItems.map((item) => {
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