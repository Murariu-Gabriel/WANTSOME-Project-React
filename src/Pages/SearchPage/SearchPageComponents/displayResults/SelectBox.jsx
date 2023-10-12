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


  console.log(currentItems)

  const sort = (array, callback) => {
    const sort = array.toSorted(callback)

    return sort
  }

  const handleSelectedItem = (item) => {
    console.log(setCurrentItems)

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

  /// THINGS TO FIX/ADD

  // I need to somehow make it remember the order and when filters are changed the order to be kept

  // first save the options selected in local storage

  // two, use a useEffect and if there is something in local storage apply the current order and pagination

  // you will cal the function that you made up in this function

  // there is a problem, you might just need to somehow trigger the function from this component each you click on a filter

  // RECENT PROBLEMS PROBLEMS

  // because this component uses different functionality in 2 places it error because it doesn t find the functionality from the other
  
  // you either figure out how to condition when one doesn t have the other or to condition them when they both have the same

  useEffect(() => {
    if (setItemsPerPage && setCurrentItems){
      const paginationPreference = localStorage.getItem("pagination_preference")
      const orderPreference = localStorage.getItem("order_preference")
      console.log(paginationPreference, orderPreference)
      // get the pagination and order
      if (paginationPreference) {
        handleSelectedItem(paginationPreference)
      }

      if (orderPreference) {
        handleSelectedItem(orderPreference)
      }

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