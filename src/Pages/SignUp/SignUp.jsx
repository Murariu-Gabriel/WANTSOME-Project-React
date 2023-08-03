import { useState } from "react"
import { Link } from "react-router-dom"
import Input from "../../Components/ReusableComponents/FormComponents/Input"
import useFetch from "../../Components/ReusableComponents/Functions/useFetch"
import "./signUpStyles.scss"

const SignUp = () => {
  const findUser = (user) => {
   const { data, isLoading, isError } = useFetch(`http://localhost:3000/users?email=${user}`)
    if(!isError){
      return data
    }

    return !isError
  }

  const verifyIfInputEmpty = (value) => {
    return value.length === 0
  }


  
  const nameValidations = () => {

    const namesValidation = (name) => {
      const regex = /[\d!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
      const test = regex.test(name)
      return test
    }


    return [verifyIfInputEmpty, namesValidation]
  }


  const handleSubmit = () => {

  }


  return (
    <section className="signUp">
      <div className="container">
        <form action="" id="form">
          <h2>sign up</h2>
          <div className="names">
            <Input
              htmlFor={"first_name"}
              label={"First Name"}
              type={"text"}
              placeholder={"First Name"}
              event={nameValidations}
            />

            <Input
              htmlFor={"last_name"}
              label={"Last Name"}
              type={"text"}
              placeholder={"Last Name"}
            />
          </div>

          <Input
            htmlFor={"email"}
            label={"Email"}
            type={"text"}
            placeholder={"Insert your email"}
          />

          <Input
            htmlFor={"signup_password"}
            label={"Password"}
            type={"password"}
            placeholder={"Insert your password"}
          />

          <Input
            htmlFor={"confirm_password"}
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Confirm your password"}
          />

          <div className="terms">
            <input
              type="checkbox"
              name="condition_terms"
              id="condition_terms"
            />
            <label htmlFor="condition_terms">
              I agree to the <a href="">terms of user</a>
            </label>
            <span className="hide">error</span>
          </div>

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