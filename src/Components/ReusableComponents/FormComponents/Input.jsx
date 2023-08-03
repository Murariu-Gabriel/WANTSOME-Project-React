import { useState } from "react"

const Input = ({ htmlFor, label, type, placeholder, event }) => {
  const [inputValue, setInputValue] = useState("")
  const [isError, setIsError] = useState(false)

  const generateErrorMessage = (name, message) => {

    if(message){
        return `${name} ${message}`
    }

    return `${name} is required`
  }

  const setValue = (e) => setInputValue(e.target.value)

  const validation = (e) => {
    setValue(e)

    // Think about validation for empty spaces
   
    event().forEach((func) => {
      
        const functionValue =  func(e.target.value)

        if (functionValue) {
          setIsError(functionValue)

        } else {

          const checkForError = event().some(
            (func) => func(e.target.value) === true
          )

          setIsError(checkForError)
        }

        
            
    })
  
  }
  
  return (
    <div>
      <label className={`${isError ? "show" : ""}`} htmlFor={htmlFor}>
        {label}
      </label>
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
