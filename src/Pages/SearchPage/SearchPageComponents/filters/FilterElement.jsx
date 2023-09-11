import { useEffect, useState } from "react"
import getProducts from "../../../../Components/ReusableComponents/Functions/getProducts"

const FilterElement = ({
  name,
  count,
  handleChange,
  span,
  checkedItems,
  products,
  passCurrentItems,
}) => {
  const [isChecked, setIsChecked] = useState(
    checkedItems?.[span]?.[name] || false
  )

  // const editedName = name.replace(/-/g, " ")

  const handleCheckbox = () => {
    passCurrentItems(products)
    setIsChecked(!isChecked)
    handleChange(name, !isChecked)
  }
  
  // useEffect(() => {
  //   if (checkedItems?.[span]?.[name]) {
  //   }

  // }, [])

  // I need to find a way to make call this functionality if the the checkbox is true from the stored savedFilters

  return (
    <div>
      <input
        id={name}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckbox}
        autoComplete="off"
      />
      <label htmlFor={name} name={name}>
        {name}
        <span>({count})</span>
      </label>
    </div>
  )
}
export default FilterElement