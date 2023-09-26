import { useEffect, useState } from "react"
import getLocalStorageItems from "../../../../Components/ReusableComponents/Functions/getLocalStorageItems"
import getProducts from "../../../../Components/ReusableComponents/Functions/getProducts"


const FilterElement = ({
  name,
  count,
  // handleChange,
  span,
  // filters,
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

  // when I click on all available products all filters under should be unselected

  // when I click on category all filters under should be unselected

  // when I click on brand all filters under should be unselected

  // when price is selected all other price selections should be unselected

  //this function should check which filter category has been selected
  // then it should delete all the checked filters under it
  const deleteCheckedFiltersUnder = (name, obj) => {
    for (const key in obj) {
      if (name === key) {
        // console.log(key)
      } else {
        delete obj[key]
      }
    }

    // localStorage.removeItem("filters")
    // console.log(obj)
  }

  // deleteCheckedFiltersUnder(span ,filters)

  // this is to do after I figure out the function above
  // if span == brand then update price

  const handleCheckbox = () => {
    // if(span !== "brand" && span !== "price"){
    handleLoadingOrderOfFilters()
    setIsChecked(!isChecked)
    passCurrentItems(products)
    // }
    // deleteCheckedFiltersUnder(span ,filters)
    // console.log(span, filters)
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