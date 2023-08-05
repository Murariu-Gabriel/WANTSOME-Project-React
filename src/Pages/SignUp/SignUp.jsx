import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Input from "../../Components/ReusableComponents/FormComponents/Input"
import useFetch from "../../Components/ReusableComponents/Functions/useFetch"
import RegisterPopup from "./RegisterPopup"
import "./signUpStyles.scss"


const SignUp = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    signup_password: "",
    confirm_password: "",
    condition_terms: "",
  })

  const [errors, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    signup_password: "",
    confirm_password: "",
    condition_terms: "",
  })

  const [popToggle, setPopToggle] = useState(false)

  // const { data, isLoading, isError } = useFetch(
  //   `http://localhost:3000/users?email=${errors.email}`
  // )

  // you might need to make another function for fetching user and be strictly for this
  
  useEffect(() => {

  })


  const verifyIfInputEmpty = (value) => {
    return value.length === 0
  }

  const emptyValidation = { func: verifyIfInputEmpty, msg: "Field is required" }

  const nameValidations = () => {
    const namesValidation = (name) => {
      const regex = /[\d!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
      const test = regex.test(name)
      return test
    }

    return [emptyValidation, { func: namesValidation, msg: "Wrong format" }]
  }

  const emailValidations = () => {
    const emailValidation = (string) => {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      const isValidEmail = emailRegex.test(string)

      return !isValidEmail
    }

    return [{ func: emailValidation, msg: "Email not valid" }, emptyValidation]
  }

  const passwordValidation = () => {
    const containsNum = (password) => {
      const regex = /\d/
      const test = regex.test(password)

      return !test
    }

    const containsUpperCase = (password) => {
      const regex = /[A-Z]/
      const test = regex.test(password)

      return !test
    }

    const containsSpecialChar = (password) => {
      const regex = /[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
      const test = regex.test(password)

      return !test
    }

    const verifyIfLengthUnder8 = (password) => {
      return password.length < 8
    }

    return [
      { func: containsNum, msg: "Password must contain a number" },
      {
        func: containsUpperCase,
        msg: "Password must contain an upper case letter",
      },
      {
        func: containsSpecialChar,
        msg: "Password must contain a special character",
      },
      {
        func: verifyIfLengthUnder8,
        msg: "Password must contain at least 8 haraters",
      },
      emptyValidation,
    ]
  }

  const confirmPasswordValidation = () => {
    const checkConfirmation = (value) => {
      return values.signup_password !== value
    }

    return [
      { func: checkConfirmation, msg: "Password does not match" },
      emptyValidation,
    ]
  }

  const termsOfUseValidation = () => {
    const ifChecked = (e) => {
      console.log(!e.currentTarget.checked)
      return !e.currentTarget.checked
    }

    return [
      { func: ifChecked, msg: "Accepting terms and conditions is required" },
    ]
  }

  const addError = (value, key, obj) => {
    const { func, msg } = emptyValidation
    const { func: fun, msg: ms } = confirmPasswordValidation()[0]

    if (key === "confirm_password"){
       if (fun(value)) {
         obj[key] = ms
       } else {
         if (func(value)) {
           obj[key] = ms
         } else {
           obj[key] = ""
         }
       }

    } else {

      if (func(value)) {
        obj[key] = msg
      } else {
        obj[key] = ""
      }
    }
  }

  const checkValidationForAllInputs = () => {
    const newErrors = { ...errors }

    for (const [key, value] of Object.entries(values)) {
      addError(value, key, newErrors)
    }

    setError(newErrors)
    return newErrors
  }

  const onChange = (e) => {
    const ifCheckbox =
      e.currentTarget.type === "checkbox"
        ? e.currentTarget.checked
        : e.currentTarget.value
    setValues({ ...values, [e.currentTarget.name]: ifCheckbox })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const errorMessages = checkValidationForAllInputs()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const newUser = Object.fromEntries(formData)
    delete newUser.confirm_password
    
    const hasError = []


    for (const [key, value] of Object.entries(errorMessages)) {
      if (value !== "") {
        hasError.push("error")
      }
    }

    if(hasError.length === 0){

      console.log()
     

      // setPopToggle(true)

      // fetch("http://localhost:3000/users", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newUser),
      // })
    }


 

  }
  // !AMoparola12

  return (
    <section className="signUp">
      {popToggle && <RegisterPopup />}

      <div className="container">
        <form action="" id="form" onSubmit={handleSubmit}>
          <h2>sign up</h2>
          <div className="names">
            <Input
              htmlFor={"first_name"}
              label={"first Name"}
              type={"text"}
              inputValue={values["first_name"]}
              placeholder={"First Name"}
              event={nameValidations}
              update={onChange}
              errors={errors}
            />

            <Input
              htmlFor={"last_name"}
              label={"Last Name"}
              type={"text"}
              inputValue={values["last_name"]}
              placeholder={"Last Name"}
              event={nameValidations}
              update={onChange}
              errors={errors}
            />
          </div>

          <Input
            htmlFor={"email"}
            label={"Email"}
            type={"text"}
            inputValue={values["email"]}
            placeholder={"Insert your email"}
            event={emailValidations}
            update={onChange}
            errors={errors}
          />

          <Input
            htmlFor={"signup_password"}
            label={"Password"}
            type={"password"}
            inputValue={values["signup_password"]}
            placeholder={"Insert your password"}
            event={passwordValidation}
            update={onChange}
            errors={errors}
          />

          <Input
            htmlFor={"confirm_password"}
            label={"Confirm Password"}
            type={"password"}
            inputValue={values["confirm_password"]}
            placeholder={"Confirm your password"}
            event={confirmPasswordValidation}
            update={onChange}
            errors={errors}
          />

          <Input
            htmlFor={"condition_terms"}
            label={`I agree to the <a href="">terms of user</a>`}
            type={"checkbox"}
            event={termsOfUseValidation}
            update={onChange}
            errors={errors}
          />

          {/* <div className="terms">
            <input
              type="checkbox"
              name="condition_terms"
              id="condition_terms"
            />
            <label htmlFor="condition_terms">
              I agree to the <a href="">terms of user</a>
            </label>
            <span className="hide">error</span>
          </div> */}

          <div className="buttons">
            <button type="submit" className="button-1">
              sign up
            </button>
            <Link to="/login" className="button-3">
              Login{" "}
              <img
                src="/assets/from-project-assets/shared/desktop/icon-arrow-right.svg"
                alt="button-arrow"
              />
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
export default SignUp