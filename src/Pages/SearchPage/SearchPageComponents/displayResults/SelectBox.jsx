import { useEffect, useRef, useState } from "react"
import handleToggleWhenClickedOutside from "../../../../Components/ReusableComponents/Functions/handleToggleWhenClickedOutside"
import orderProducts from "../../../../Components/ReusableComponents/Functions/orderProducts"

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

   
    setCurrentItems(orderProducts(firstWordSlashNumber, currentItems))

  }


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