import { useEffect } from "react"
import { useState } from "react"
import FilterElement from "./FilterElement"

const FilterContainer = ({
  span,
  items,
  filters,
  passCurrentItems,
}) => {
  const [currentItems, setCurrentItems] = useState([])

  // const editedSpan = span.replace(/-/g, " ")


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