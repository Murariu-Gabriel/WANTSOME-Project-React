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

  // console.log(checkedItems)
  // on click these need to run a function that will re-render everything depending on clicked elements
  // the function must be passed down here from chain of command

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