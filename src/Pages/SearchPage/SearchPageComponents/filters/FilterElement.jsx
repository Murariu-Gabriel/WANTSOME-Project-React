import { useEffect, useState } from "react"

const FilterElement = ({ name, count, handleChange, span, checkedItems }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckbox = () => {
    setIsChecked(!isChecked)
  }
  // on click these need to run a function that will re-render everything depending on clicked elements
  // the function must be passed down here from chain of command

  // Might need to find a way to pass that function from upper chain of command without writing it in in every component



  // this might be a way to check if something is clicked if it is then we need to make checked true by default
  console.log(checkedItems?.[span])

  useEffect(() => {
    if (isChecked) {
      handleChange(name, isChecked)
    }
  }, [isChecked])

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