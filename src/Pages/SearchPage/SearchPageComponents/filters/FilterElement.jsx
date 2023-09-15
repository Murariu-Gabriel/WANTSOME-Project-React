import { useEffect, useState } from "react"
import getProducts from "../../../../Components/ReusableComponents/Functions/getProducts"

const FilterElement = ({
  name,
  count,
  handleChange,
  span,
  filters,
  products,
  passCurrentItems,
}) => {
  const [isChecked, setIsChecked] = useState(filters?.[span]?.[name] || false)

  // const editedName = name.replace(/-/g, " ")

  // when I click on all available products all filters under should be unselected

  // when I click on category all filters under should be unselected

  // when I click on brand all filters under should be unselected

  // when price is selected all other price selections should be unselected



  //this function should check which filter category has been selected
  // then it should delete all the checked filters under it
  const deleteCheckedFiltersUnder = (name, obj) => {

    for(const key in obj){
      if(name === key){
        // console.log(key)

      } else {
        delete obj[key]
      }
    }
 
    // localStorage.removeItem("filters")
    // console.log(obj)
  }

  
  // deleteCheckedFiltersUnder(span ,filters)
  
  
  // this is to do after I figure out the function above
  // if span == brand then update price
  
  
  const handleCheckbox = () => {
    // if(span !== "brand" && span !== "price"){
      handleChange(name, !isChecked)
    setIsChecked(!isChecked)
    passCurrentItems(products)
    // }
    // deleteCheckedFiltersUnder(span ,filters)
    // console.log(span, filters)
  }

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