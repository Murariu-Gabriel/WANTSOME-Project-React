import { useState } from "react"

const SelectBox = ({
  selectType,
  selectableItems,
  givenClass,
  setItemsPerPage,
}) => {
  const [selectToggle, setSelectToggle] = useState(false)

  // you need to make select functionality

  // when a li is selected a certain functionality should trigger and the p should contain the selected text

  // you will have to take each li take the first word 

  // for each work make if statements with functionality



  // for pagination take the first number convert it to number and sent it to setItemsPerPage,

  return (
    <div
      className={`select-box ${givenClass ? givenClass : ""}`}
      onClick={() => {
        setSelectToggle(!selectToggle)
      }}
    >
      <p className="select">{selectType}</p>

      <ul className={`select-menu ${selectToggle ? "" : "hide"} `}>
        {selectableItems.map((item) => {
          return <li key={crypto.randomUUID()}>{item}</li>
        })}
      </ul>
      <span className="arrows"></span>
    </div>
  )
}
export default SelectBox