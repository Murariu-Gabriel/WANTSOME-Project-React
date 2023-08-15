import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { useState } from "react"
import OrderSuccessful from "./OrderSuccessful"
import "./styles.scss"

const Checkout = () => {
  const [togglePopUp, setTogglePopUp] = useState(false)
  const form = useForm()

  const {register, control, handleSubmit, formState} = form

  const {errors} = formState


  // You need to figure out a more dynamic way to add these classes

  const addError = errors["fullName"]?.message && "error"
  const addShowError = errors.fullName?.message && "show"

  const emptyValidation = (fieldValue) => {
    return fieldValue.length !== 0 || `Field is required`
  }

  const handelForm = (data) => {
    console.log("form submited", data)
    setTogglePopUp(true)
  }

  return (
    <>
      <section className="checkout">
        <div className="container" id="checkout-container">
          <p>
            <a id="go-back">go back</a>
          </p>

          <form onSubmit={handleSubmit(handelForm)} noValidate>
            <div className="about-payment">
              <h2>checkout</h2>

              <div className="payment">
                <div>
                  <p className="subtitle">billing details</p>
                  <label className={addShowError} htmlFor="fullName">
                    name
                  </label>
                  <span className="show">{errors.fullName?.message}</span>
                  <input
                    className={`${addError}`}
                    type="text"
                    id="fullName"
                    placeholder="Alex Johnson"
                    {...register("fullName", {
                      required: "Field is required",
                    })}
                  />
                </div>

                <div className={`${errors.fullName?.message && "error"}`}>
                  <label className={addShowError} htmlFor="email">
                    email address
                  </label>
                  <span className="show">{errors.email?.message}</span>
                  <input
                    className={`${addError}`}
                    type="text"
                    id="email"
                    placeholder="alexander_12@gmail.com"
                    {...register("email", {
                      validate: {
                        notEmpty: (fieldValue) => emptyValidation(fieldValue),
                      },
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid Email",
                      },
                    })}
                  />
                </div>

                <div>
                  <label className={addShowError} htmlFor="phoneNumber">
                    phone number
                  </label>
                  <span className="show">{errors.phoneNumber?.message}</span>
                  <input
                    className={`${addError}`}
                    type="tel"
                    id="phoneNumber"
                    inputMode="numeric"
                    placeholder="1202-555-0136"
                    {...register("phoneNumber", {
                      validate: {
                        notEmpty: (fieldValue) =>
                          emptyValidation(fieldValue, "Phone Number"),
                      },
                    })}
                  />
                </div>
              </div>

              <div className="payment">
                <div>
                  <p className="subtitle">shipping info</p>
                  <label className={addShowError} htmlFor="address">
                    your address
                  </label>
                  <span className="show">{errors.address?.message}</span>
                  <input
                    className={`${addError}`}
                    type="text"
                    id="address"
                    placeholder="1137 Avenue"
                    {...register("address", {
                      validate: {
                        notEmpty: (fieldValue) =>
                          emptyValidation(fieldValue, "Phone Number"),
                      },
                    })}
                  />
                </div>

                <div>
                  <label className={addShowError} htmlFor="zipCode">
                    ZIP code
                  </label>
                  <span className="show">{errors.zipCode?.message}</span>
                  <input
                    className={`${addError}`}
                    type="text"
                    id="zipCode"
                    placeholder="12011"
                    {...register("zipCode", {
                      validate: {
                        notEmpty: (fieldValue) =>
                          emptyValidation(fieldValue, "Phone Number"),
                      },
                    })}
                  />
                </div>

                <div>
                  <label className={addShowError} htmlFor="city">
                    city
                  </label>
                  <span className="show">{errors.city?.message}</span>
                  <input
                    className={`${addError}`}
                    type="text"
                    id="city"
                    placeholder="San Diego"
                    {...register("city", {
                      validate: {
                        notEmpty: (fieldValue) =>
                          emptyValidation(fieldValue, "Phone Number"),
                      },
                    })}
                  />
                </div>

                <div>
                  <label className={addShowError} htmlFor="country">
                    country
                  </label>
                  <span className="show">{errors.country?.message}</span>
                  <input
                    className={`${addError}`}
                    type="text"
                    id="country"
                    placeholder="United States"
                    {...register("country", {
                      validate: {
                        notEmpty: (fieldValue) =>
                          emptyValidation(fieldValue, "Phone Number"),
                      },
                    })}
                  />
                </div>
              </div>

              <div className="payment">
                <div className="payment-method">
                  <p className="subtitle">payment details</p>
                  <div className="subtitle-extra">
                    <p>payment method</p>
                    <span className="hide">error</span>
                  </div>

                  <div className="radio-button checked">
                    <input
                      type="radio"
                      name="payment-method"
                      id="e-money"
                      value="e-money"
                      checked
                    />
                    <label htmlFor="e-money">e-money</label>
                  </div>

                  <div className="radio-button">
                    <input
                      type="radio"
                      name="payment-method"
                      id="cash-on-delivery"
                      value="cash on delivery"
                    />

                    <label htmlFor="cash-on-delivery">cash on delivery</label>
                  </div>
                </div>

                <div>
                  <label className={addShowError} htmlFor="cardNumber">
                    e-money number
                  </label>
                  <span className="show">{errors.cardNumber?.message}</span>
                  <input
                    className={`${addError}`}
                    type="text"
                    id="cardNumber"
                    placeholder="343219987"
                    {...register("cardNumber", {
                      validate: {
                        notEmpty: (fieldValue) =>
                          emptyValidation(fieldValue, "Phone Number"),
                      },
                    })}
                  />
                </div>

                <div>
                  <label className={addShowError} htmlFor="cardPin">
                    e-money PIN
                  </label>
                  <span className="show">{errors.cardPin?.message}</span>
                  <input
                    className={`${addError}`}
                    type="text"
                    id="cardPin"
                    placeholder="0912"
                    {...register("cardPin", {
                      validate: {
                        notEmpty: (fieldValue) =>
                          emptyValidation(fieldValue, "Phone Number"),
                      },
                    })}
                  />
                </div>
                <div className="on-delivery-message display">
                  <svg
                    width="48"
                    height="48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M46.594 8.438H42.28c-.448 0-.869.213-1.134.574l-2.694 3.674a1.15 1.15 0 1 1-1.848-1.37c2.568-3.53 2.864-3.545 2.864-4.285 0-.779-.636-1.406-1.407-1.406h-5.404a17.658 17.658 0 0 1 9.606-2.813h4.33a1.406 1.406 0 0 0 0-2.812h-4.33c-5.277 0-10.33 2.02-14.142 5.625h-8.34c-.777 0-1.407.63-1.407 1.406v9.938H9.844c-.777 0-1.406.63-1.406 1.406v15.6a14.053 14.053 0 0 0-7.824 3.089 1.406 1.406 0 1 0 1.772 2.185 11.226 11.226 0 0 1 7.048-2.499h3.129c.775 0 1.406.63 1.406 1.406 0 .776-.631 1.407-1.406 1.407H8.436a1.406 1.406 0 0 0 0 2.812h13.728a4.226 4.226 0 0 1-3.977 2.813H1.405a1.406 1.406 0 0 0 0 2.812h16.782c3.395 0 6.236-2.42 6.89-5.625h7.36c.776 0 1.406-.63 1.406-1.406V25.312h9.843c.777 0 1.407-.63 1.407-1.406V11.25h1.5a1.406 1.406 0 0 0 0-2.813ZM33.61 17.599a1.404 1.404 0 0 0-1.172-.63h-3.085c-1.084-1.834.241-4.172 2.381-4.172 2.531 0 3.708 3.115 1.876 4.802ZM21.188 8.437h14.06c-.744 1.03-1.057 1.305-1.352 1.983-4.216-1.779-8.726 2.057-7.559 6.549h-5.15V8.437ZM19.78 19.782h2.813v5.625H19.78v-5.625Zm11.25 19.782h-14.49c.969-2.735-1.07-5.626-3.979-5.626H11.25V19.782h5.719v7.032c0 .776.63 1.406 1.406 1.406H24c.777 0 1.406-.63 1.406-1.407v-7.03h5.625v19.78ZM33.844 22.5v-1.771a5.56 5.56 0 0 0 3.453-4.769 3.954 3.954 0 0 0 3.424-1.611l1.56-2.127V22.5h-8.437Z"
                      fill="#D87D4A"
                    />
                  </svg>
                  <p>
                    The ‘Cash on Delivery’ option enables you to pay in cash
                    when our delivery courier arrives at your residence. Just
                    make sure your address is correct so that your order will
                    not be cancelled.
                  </p>
                </div>
              </div>
            </div>

            <div className="summary">
              <h2>summary</h2>

              <ul className="summary-list" id="summary-list"></ul>

              <div className="total">
                <div>
                  <p>total</p>
                  <p>
                    $<span id="total">0</span>
                  </p>
                </div>

                <div>
                  <p>shipping</p>
                  <p>
                    <span id="shipping">$0</span>
                  </p>
                </div>

                <div>
                  <p>vat (included)</p>
                  <p>
                    $ <span id="vat">0</span>
                  </p>
                </div>

                <div>
                  <p>grand total</p>
                  <p>
                    $ <span id="grand-total">0</span>
                  </p>
                </div>
              </div>

              <button className="button-1" type="submit">
                continue & pay
              </button>
            </div>
          </form>
          <DevTool control={control} />
        </div>

        {/* You need to pass information to this component so it can display bought products and total price */}
        {togglePopUp && <OrderSuccessful />}
      </section>
    </>
  )
}
export default Checkout