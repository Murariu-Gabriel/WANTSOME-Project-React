import { useEffect, useRef, useState } from "react"
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
    handleToggleWhenClickedOutside(selectBoxRef, selectToggle, setSelectToggle),
    []
  )

  const sort = (array, callback) => {
    const sort = array.toSorted(callback)

    return sort
  }


  // you need to figure out how to break or make another function like this that will arrange the array in filters before loading it


  const handleSelectedItem = (item) => {
    const firstWordSlashNumber = item.split(" ")[0].toLowerCase()
    console.log(item)

    setCurrentSelectedItem(item)

    if (!isNaN(firstWordSlashNumber)) {
      const selectedItemPerPage = parseInt(firstWordSlashNumber)

      localStorage.setItem("pagination_preference", item)
      console.log(selectedItemPerPage)
      setItemsPerPage(selectedItemPerPage)
    } else {
      localStorage.setItem("order_preference", item)
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

  // I need to find a way to trigger this function when a filter is selected

  // maybe I can store the function that makes order and pagination preference in higher in components

  useEffect(() => {
    const paginationPreference = localStorage.getItem("pagination_preference")
    const orderPreference = localStorage.getItem("order_preference")
    console.log(paginationPreference, orderPreference)

    if (orderPreference && selectType === "Order after") {
      console.log("orderPreference")
      handleSelectedItem(orderPreference)
    } else if (paginationPreference && selectType === "9 on page") {
      console.log("paginationPreference")
      handleSelectedItem(paginationPreference)
    }
  }, [])

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