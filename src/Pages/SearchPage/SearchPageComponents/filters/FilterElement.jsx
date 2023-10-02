import { useState } from "react"
import getLocalStorageItems from "../../../../Components/ReusableComponents/Functions/getLocalStorageItems"

const FilterElement = ({
  name,
  count,
  span,
  products,
  passCurrentItems,
}) => {
  const filters = getLocalStorageItems("filters")
  const [isChecked, setIsChecked] = useState(filters?.[span]?.[name] || false)

  const handleCheckboxChange = (obj, item, isChecked) => {
    const filters = getLocalStorageItems("filters")
    const touchedItems = {
      ...filters,
      [obj]: {
        ...filters[obj],
        [item]: isChecked,
      },
    }

    const stringItems = JSON.stringify(touchedItems)
    localStorage.setItem("filters", stringItems)
  }

  const handleLoadingOrderOfFilters = () => {
    const filters = getLocalStorageItems("filters")
    if (filters?.["all-available-products"]?.[name]) {
      localStorage.removeItem("filters")
      handleCheckboxChange(span, name, !isChecked)
      

    } else if (filters?.["category"]?.[name]) {
      delete filters.brand
      delete filters.price
      const stringItems = JSON.stringify(filters)
      localStorage.setItem("filters", stringItems)
      handleCheckboxChange(span, name, !isChecked)

    } else if (filters?.["brand"]?.[name]) {
      delete filters.price
      const stringItems = JSON.stringify(filters)
      localStorage.setItem("filters", stringItems)
      handleCheckboxChange(span, name, !isChecked)

    } else {
      handleCheckboxChange(span, name, !isChecked)
    }
  }

  // const editedName = name.replace(/-/g, " ")


  // this is to do after I figure out the function above
  // if span == brand then update price

  const handleCheckbox = () => {
    handleLoadingOrderOfFilters()
    setIsChecked(!isChecked)
    passCurrentItems(products)

  }

  return (
    <div>
      <input
        id={name}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckbox}
        autoComplete="off"
        onClick={handleLoadingOrderOfFilters}
      />
      <label htmlFor={name} name={name}>
        {name}
        <span>({count})</span>
      </label>
    </div>
  )
}
export default FilterElement