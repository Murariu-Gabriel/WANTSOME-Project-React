import { useEffect, useState } from "react"

const FilterElement = ({ name, count, handleChange, span, checkedItems }) => {
  const [isChecked, setIsChecked] = useState( checkedItems?.[span]?.[name] || false )

  const handleCheckbox = () => {
      setIsChecked(!isChecked)
      handleChange(name, !isChecked)

   
 
  }


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