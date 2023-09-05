const FilterElement = ({name, count}) => {
const [isChecked, setIsChecked] = useState(false)

const handleCheckbox = () => {
    setIsChecked(!isChecked)
}
  // on click these need to run a function that will re-render everything depending on clicked elements
  // the function must be passed down here from chain of command

  // Might need to find a way to pass that function from upper chain of command without writing it in in every component

  return (
    <div>
      <input id={name} type="checkbox" checked={isChecked} onChange={handleCheckbox} autocomplete="off" />
      <label for={name} name={name}>
        {name}
        <span>({count})</span>
      </label>
    </div>
  )
}
export default FilterElement