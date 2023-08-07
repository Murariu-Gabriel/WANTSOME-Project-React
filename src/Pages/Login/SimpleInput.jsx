import { useState, useEffect } from "react"

const SimpleInput = ({htmlFor, label, type, placeholder, inputValue, update, fragment, errors}) => {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setIsErrorMessage] = useState("")
  
  useEffect(() => {
    
    // console.log(errors[htmlFor])
    if (errors[htmlFor] !== "") {
      setIsError(true)
      setIsErrorMessage(errors[htmlFor])
    } else {
      // console.log(errors[htmlFor])
      setIsError(false)
    }
  }, [errors])

  // console.log(errors)
  
  if(fragment){
    return (
      <>
        <label className={`${isError ? "show" : ""}`} htmlFor={htmlFor}>
          {label}
        </label>

        <span className={`${isError ? "show" : "hide"}`}>{errorMessage}</span>

        <input
          className={`${isError ? "error" : ""}`}
          type={type}
          id={htmlFor}
          name={htmlFor}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => update(e)}
          //   onBlur={htmlFor === "confirm_password" ? (e) => validation(e) : () => {}}
        />
      </>
    )
  }


  return (
    <div>
      <label className={`${isError ? "show" : ""}`} htmlFor={htmlFor}> {label}</label>

      <span className={`${isError ? "show" : "hide"}`}>
        {errorMessage}
        </span>

      <input
        className={`${isError ? "error" : ""}`}
        type={type}
        id={htmlFor}
        name={htmlFor}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => update(e)}
        //   onBlur={htmlFor === "confirm_password" ? (e) => validation(e) : () => {}}
      />
    </div>
  )
}
export default SimpleInput