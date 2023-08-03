import { useEffect } from "react"
import { useState } from "react"

const Input = ({ htmlFor, label, type, placeholder, event }) => {
  const [inputValue, setInputValue] = useState("")
  const [isError, setIsError] = useState(false)

  //   useEffect(() => {

  // },[])
  const generateErrorMessage = (name, message) => {

    if(message){
        return `${name} ${message}`
    }

    return `${name} is required`
  }

  const setValue = (e) => setInputValue(e.target.value)

  const validation = (e) => {
    setValue(e)

   setIsError(event(e.target.value))
  }
  
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <span className={`${isError ? "show" : "hide"}`}>
        {generateErrorMessage(label)}
      </span>
      <input
        className={`${isError ? "error" : ""}`}
        type={type}
        id={htmlFor}
        name={htmlFor}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => validation(e)}
      />
    </div>
  )
}
export default Input
