import { useEffect } from "react"
import { useState } from "react"
import FilterElement from "./FilterElement"

const FilterContainer = ({
  span,
  handleCheckboxChange,
  items,
  filters,
  passCurrentItems,
}) => {
  const [currentItems, setCurrentItems] = useState([])

  // const editedSpan = span.replace(/-/g, " ")

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
          const { count, name, products } = item

          
          return (
            <FilterElement
              key={crypto.randomUUID()}
              {...{
                count,
                name,
                handleChange,
                span,
                filters,
                products,
                passCurrentItems,
              }}
            />
          )
        })}
      </aside>
    </div>
  )
}
export default FilterContainer