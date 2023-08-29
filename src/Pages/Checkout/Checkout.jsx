import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { useState, useEffect } from "react"
import OrderSuccessful from "./OrderSuccessful"
import { lengthValidation, namesValidation} from "../../Components/ReusableComponents/Functions/validationFunctions"
import getLocalStorageItems from "../../Components/ReusableComponents/Functions/getLocalStorageItems"
import generateProducts from "../../Components/ReusableComponents/Functions/generateProducts"
import getCounts from "../../Components/ReusableComponents/Functions/getEntries"
import getItemsInfo from "../../Components/ReusableComponents/Functions/getItemsInfo"
import SummaryItem from "./SummaryItem"
import TotalPaymentListElement from "./TotalPaymentListElement"
import GoBack from "../../Components/ReusableComponents/GoBack"

import "./styles.scss"
import InputForCheckout from "./InputForCheckout"

const Checkout = () => {
  const [togglePopUp, setTogglePopUp] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("e-money")
  const [summaryItems, setSummaryItems] = useState([])
  const [total, setTotal] = useState(0)

  const items = getLocalStorageItems("cart-products")
  const counts = getCounts(items)

  const user = JSON.parse(localStorage.getItem("user"))

  const form = useForm({
    defaultValues: async () => {

      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`)
        const data = await response.json()

        return {
          fullName: data.full_name,
          email: data.email,
          phoneNumber: "",
          address: "",
          zipCode: "",
          city: "",
          country: "",
          cardNumber: "",
          cardPin: "",
        }
      } catch (error) {
        console.log(error)
      }
    },
  })

  const { register, control, handleSubmit, formState, reset, clearErrors } =
    form
  const { errors, isDirty, isValid } = formState

  console.log(isDirty, isValid)

  const revertError = (errors) => {
    if (paymentMethod !== "e-money") {
      clearErrors("cardNumber")
      clearErrors("cardPin")
    }

    console.log("formErrors", errors)
  }

  useEffect(() => {
    getItemsInfo(items, generateProducts).then((products) =>
      setSummaryItems(products)
    )
  }, [])

  useEffect(() => {
    if (Object.keys(items).length !== 0){
      document.getElementById(paymentMethod).checked = true
    }
  }, [paymentMethod])

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.id)
  }

  const handelForm = (data) => {
    console.log("form submited", data)
    setTogglePopUp(true)

     fetch(`http://localhost:3000/users/${user.id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({personal_information: data}),
     })

    console.log(errors)
  }

  const shippingCosts = total > 300 ? "free" : 40
  const grandTotal =
    total + (typeof shippingCosts === "string" ? 0 : shippingCosts)

  console.log(user)

  if (Object.keys(items).length <= 0){
    return(
    
    <section className="checkout">
        <div className="container">
          <GoBack />

          <div className="message">
            <h2>Sorry your cart is empty</h2>

          </div>
        </div>  
    </section>
    
    )
  }

  return (
    <>
      <section className="checkout">
        <div className="container">
          <GoBack />

          <form onSubmit={handleSubmit(handelForm, revertError)} noValidate>
            <div className="about-payment">
              <h2>checkout</h2>

              <div className="payment">
                <InputForCheckout
                  htmlFor={"fullName"}
                  label={"name"}
                  type={"text"}
                  placeholder={"Alex Johnson"}
                  errors={errors}
                  register={register}
                  title={<p className="subtitle">billing details</p>}
                  validation={{
                    required: "Field is required",
                    validate: {
                      wrongFormat: (fieldValue) => namesValidation(fieldValue),
                    },
                  }}
                />

                <InputForCheckout
                  htmlFor={"email"}
                  label={"email address"}
                  type={"text"}
                  placeholder={"alexander_12@gmail.com"}
                  errors={errors}
                  register={register}
                  validation={{
                    required: "Field is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid Email",
                    },
                  }}
                />

                <InputForCheckout
                  htmlFor={"phoneNumber"}
                  label={"phone number"}
                  type={"number"}
                  placeholder={"1202-555-0136"}
                  errors={errors}
                  register={register}
                  validation={{
                    valueAsNumber: true,
                    required: {
                      value: true,
                      message: "Field is required",
                    },
                    validate: {
                      checkLength: (fieldValue) =>
                        lengthValidation(fieldValue, 12),
                    },
                  }}
                />
              </div>

              <div className="payment">
                <InputForCheckout
                  htmlFor={"address"}
                  label={"your address"}
                  type={"text"}
                  placeholder={"1137 Avenue"}
                  errors={errors}
                  register={register}
                  title={<p className="subtitle">shipping info</p>}
                  validation={{
                    required: "Field is required",
                  }}
                />

                <InputForCheckout
                  htmlFor={"zipCode"}
                  label={"zip code"}
                  type={"number"}
                  placeholder={"12011"}
                  errors={errors}
                  register={register}
                  validation={{
                    required: "Field is required",
                    validate: {
                      checkLength: (fieldValue) =>
                        lengthValidation(fieldValue, 5),
                    },
                  }}
                />

                <InputForCheckout
                  htmlFor={"city"}
                  label={"city"}
                  type={"text"}
                  placeholder={"San Diego"}
                  errors={errors}
                  register={register}
                  validation={{
                    required: "Field is required",
                    validate: {
                      wrongFormat: (fieldValue) => namesValidation(fieldValue),
                    },
                  }}
                />

                <InputForCheckout
                  htmlFor={"country"}
                  label={"country"}
                  type={"text"}
                  placeholder={"United States"}
                  errors={errors}
                  register={register}
                  validation={{
                    required: "Field is required",
                    validate: {
                      wrongFormat: (fieldValue) => namesValidation(fieldValue),
                    },
                  }}
                />
              </div>

              <div className="payment">
                <div className="payment-method">
                  <p className="subtitle">payment details</p>
                  <div className="subtitle-extra">
                    <p>payment method</p>
                    <span className="hide">error</span>
                  </div>

                  <div
                    className={`radio-button ${
                      paymentMethod === "e-money" ? "checked" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      id="e-money"
                      value="e-money"
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="e-money">e-money</label>
                  </div>

                  <div
                    className={`radio-button ${
                      paymentMethod !== "e-money" ? "checked" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      id="cash-on-delivery"
                      value="cash on delivery"
                      onChange={handlePaymentMethodChange}
                    />

                    <label htmlFor="cash-on-delivery">cash on delivery</label>
                  </div>
                </div>

                {paymentMethod !== "e-money" ? (
                  <div className="on-delivery-message">
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
                ) : (
                  <>
                    <InputForCheckout
                      htmlFor={"cardNumber"}
                      label={"e-money number"}
                      type={"number"}
                      placeholder={"343219987"}
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Field is required",
                        validate: {
                          checkLength: (fieldValue) =>
                            lengthValidation(fieldValue, 9),
                        },
                      }}
                    />

                    <InputForCheckout
                      htmlFor={"cardPin"}
                      label={"e-money PIN"}
                      type={"number"}
                      placeholder={"0912"}
                      errors={errors}
                      register={register}
                      validation={{
                        required: "Field is required",
                        validate: {
                          checkLength: (fieldValue) =>
                            lengthValidation(fieldValue, 4),
                        },
                      }}
                    />

  
                  </>
                )}
              </div>
            </div>

            <div className="summary">
              <h2>summary</h2>

              <ul className="summary-list">
                {summaryItems.map((item, index) => {
                  const { slug, price, images, id } = item

                  return (
                    <SummaryItem
                      key={id}
                      img={images.display.first}
                      name={slug}
                      price={price}
                      count={counts[index][1]}
                      setTotal={setTotal}
                    />
                  )
                })}
              </ul>

              <div className="total">
                <TotalPaymentListElement priceElement={"total"} price={total} />

                <TotalPaymentListElement
                  priceElement={"shipping"}
                  price={total > 300 ? "free" : 40}
                />

                <TotalPaymentListElement
                  priceElement={"vat (included)"}
                  price={Math.floor(total * 0.1)}
                />

                <TotalPaymentListElement
                  priceElement={"grand total"}
                  price={grandTotal}
                />
              </div>

              <button className="button-1" type="submit">
                continue & pay
              </button>
            </div>
          </form>
          <DevTool control={control} />
        </div>

      </section>
      {togglePopUp && (
        <OrderSuccessful
          grandTotal={grandTotal}
          name={summaryItems[0].slug}
          img={summaryItems[0].images.display.first}
          count={counts[0][1]}
          price={summaryItems[0].price}
        />
      )}
    </>
  )
}
export default Checkout