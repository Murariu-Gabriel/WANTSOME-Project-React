import { useEffect, useRef } from "react"
import { useState } from "react"
import handleToggleWhenClickedOutside from "../../../../Components/ReusableComponents/Functions/handleToggleWhenClickedOutside"

const SelectBox = ({
  selectType,
  selectableItems,
  givenClass,
  setItemsPerPage,
  currentItems,
  setCurrentItems,
}) => {
  const [selectToggle, setSelectToggle] = useState(false)
  const [currentSelectedItem, setCurrentSelectedItem] = useState(selectType)

  const selectBoxRef = useRef(null)


  useEffect(
    handleToggleWhenClickedOutside(selectBoxRef, selectToggle, setSelectToggle)
  ,[])


  const sort = (array, callback) => {
    const sort = array.toSorted(callback)

    return sort
  }

  const handleSelectedItem = (item) => {
    const firstWordSlashNumber = item.split(" ")[0].toLowerCase()

    if (!isNaN(firstWordSlashNumber)) {
      const selectedItemPerPage = parseInt(firstWordSlashNumber)

      setItemsPerPage(selectedItemPerPage)
    }

    if (firstWordSlashNumber === "increasing") {
      const sortedItems = sort(currentItems, (a, b) => a.price - b.price)

      setCurrentItems(sortedItems)
    }

    if (firstWordSlashNumber === "decreasing") {
      const sortedItems = sort(currentItems, (a, b) => b.price - a.price)

      setCurrentItems(sortedItems)
    }

    if (firstWordSlashNumber === "new") {
      const sortedItems = sort(currentItems, (a, b) => b.new - a.new)

      setCurrentItems(sortedItems)
    }

    if (firstWordSlashNumber === "discount") {
      const sortedItems = sort(
        currentItems,
        (a, b) =>
          b.discount?.isDiscounted ||
          b.discount - a.discount?.isDiscounted ||
          a.discount
      )

      console.log(sortedItems)
      setCurrentItems(sortedItems)
    }
  }

  /// THINGS TO FIX/ADD

  // I need to somehow make it remember the order and when filters are changed the order to be kept


  return (
    <div
      className={`select-box ${givenClass ? givenClass : ""}`}
      ref={selectBoxRef}
      onClick={() => {
        setSelectToggle(!selectToggle)
      }}
    >
      <p className="select">{currentSelectedItem}</p>

      <ul className={`select-menu ${selectToggle ? "" : "hide"} `}>
        {selectableItems.map((item) => {
          return (
            <li
              key={crypto.randomUUID()}
              onClick={() => {
                setCurrentSelectedItem(item)
                handleSelectedItem(item)
              }}
            >
              {item}
            </li>
          )
        })}
      </ul>
      <span className="arrows"></span>
    </div>
  )
}
export default SelectBox