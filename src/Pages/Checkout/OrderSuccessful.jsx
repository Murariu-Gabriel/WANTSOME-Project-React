import { Link } from "react-router-dom"
import "./orderSuccessStyles.scss"

const OrderSuccessful = () => {
  return (
    <div className="popup overlay3" id="order-success">
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

        <div className="order" id="order">
          <div className="order-container">
            <ul id="order-item-list"></ul>
            <p>
              and <span id="items-ordered">2</span> other
              <span id="plural">items</span>
            </p>
          </div>
          <div className="order-total">
            <span>Grand total</span>
            <span id="order-grand-total">123</span>
          </div>
        </div>
        <Link className="button-1" to="/">
          back to home
        </Link>
      </div>
    </div>
  )
}
export default OrderSuccessful