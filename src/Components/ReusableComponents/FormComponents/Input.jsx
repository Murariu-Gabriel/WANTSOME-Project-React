import { useEffect } from "react"
import { useState } from "react"

const Input = ({
  htmlFor,
  label,
  type,
  placeholder,
  event,
  inputValue,
  update,
  errors,

}) => {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setIsErrorMessage] = useState("")


  // The validation function has the purpose of updating value of each component and validating each input component if the validation functions send to the validator function return a value of true the useState that manages error status will update

const validation = (e) => {
    update(e)
    
    event().forEach((element) => {
      const { func, msg } = element
      const functionValue = func(e.target.value)

      if (functionValue) {
        setIsError(functionValue)
        setIsErrorMessage(msg)
      } else {
        const checkForError = event().some((element) => {
          const { func } = element
          return func(e.target.value) === true
        })

        setIsError(checkForError)
      }
    })
  }

  // This use effect has the role of picking validation on submit and it checks if an object with each input name has any errors added, if it does it will update the error status

  useEffect(() => {
    console.log(errors[htmlFor])
      if (errors[htmlFor] !== "" ){
       setIsError(true)
       setIsErrorMessage(errors[htmlFor])
      }

  }, [errors])


    return (
      <div>
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
          onChange={(e) => validation(e)}
        />
      </div>
    )
}
export default Input
