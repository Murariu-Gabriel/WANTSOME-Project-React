import { useState } from "react"
import { Link } from "react-router-dom"
import getCartItems from "../../Functions/getCartItems"
import "./cartStyles/index.scss"

// you might need to use useMemo or memo in this component

const Cart = ({ updateCounter, cartCounter }) => {
  const [cartItems, setCartItems] = useState()

  // will have to figure out if i can just loop through these and render them
  const Items = getCartItems()

  return (
    <div className="cart-container overlay show-cart ">
      <div className="shopping-container">

       
        <form className="shopping-cart">
        {cartCounter > 0 
        ? (
          <>
            <div>
            <h6>
              Cart (<span>{cartCounter}</span>)
              {/* Here the count will be updated based on the local storage count */}
            </h6>
            <button className="button">
              Remove all
              {/* here we will delete state items */}
            </button>
          </div>

          <ul className="cart-list">
            {/* Here we will have looped and rendered items */}
          </ul>
          <p>
            <span>total</span>
            <strong>
              $ <span>0</span>
              {/* Here the count will be updated based on cartItems prices and cart items count*/}
            </strong>
          </p>

          <Link reloadDocument to="/checkout" className="button-1">
            checkout
          </Link>
          </>
        )
          
        : ( <h6 className="emptyCart">The cart is empty</h6> )
      }
        </form>
      </div>
    </div>
  )
}
export default Cart