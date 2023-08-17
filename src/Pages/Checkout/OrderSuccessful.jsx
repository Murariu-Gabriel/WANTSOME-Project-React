import { Link } from "react-router-dom"
import SummaryItem from "./SummaryItem"
import getCartLength from "../../Components/ReusableComponents/Functions/getCartLength"

import "./orderSuccessStyles.scss"

const OrderSuccessful = ({ grandTotal, name, img, price, count }) => {

  const carrItems = getCartLength()
  const items = carrItems - count

  return (
    <div className="popup overlay3">
      <div className="success-popup">
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <circle fill="#D87D4A" cx="32" cy="32" r="32" />
            <path
              stroke="#FFF"
              strokeWidth="4"
              d="m20.754 33.333 6.751 6.751 15.804-15.803"
            />
          </g>
        </svg>

        <strong>
          Thank you <br />
          for your order!
        </strong>

        <p>You will receive an email confirmation shortly.</p>

        <div className="order">
          <div className="order-container">
            <ul>
              <SummaryItem {...{ name, img, price, count }} />
            </ul>
            <p>
              and <span>{items}</span> other
              <span> {items > 1 ? "items" : "item"}</span>
            </p>
          </div>

          <div className="order-total">
            <span>Grand total</span>
            <span>{grandTotal}</span>
          </div>
        </div>

        <Link
          reloadDocument
          className="button-1"
          to="/"
          onClick={() => localStorage.removeItem("cart-products")}
        >
          back to home
        </Link>
      </div>
    </div>
  )
}
export default OrderSuccessful