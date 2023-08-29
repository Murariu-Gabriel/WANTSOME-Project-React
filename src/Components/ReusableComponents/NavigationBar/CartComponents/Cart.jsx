import { useState, useEffect, memo } from "react"
import { Link } from "react-router-dom"
import getLocalStorageItems from "../../Functions/getLocalStorageItems"
import generateProducts from "../../Functions/generateProducts"
import CartProduct from "./CartProduct"
import getCounts from "../../Functions/getEntries"
import getItemsInfo from "../../Functions/getItemsInfo"
import "./cartStyles/index.scss"

// you might need to use useMemo or memo in this component or figure if it works correctly 

const Cart = memo(({ updateCounter, cartCounter, setCartCounter }) => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)

  const items = getLocalStorageItems("cart-products")
  const counts = getCounts(items)


  const ifZeroUpdate = (count, id) => {
    if (count === 0) {
      const newList = cartItems.filter((item) => item.id !== id)
      setCartItems(newList)
    }
  }

  const deleteItemsFromCart = (e) => {
    e.preventDefault()
    setCartItems([])
    localStorage.removeItem("cart-products")
    setCartCounter(0)
  }

  useEffect(() => {
    getItemsInfo(items, generateProducts).then((products) => setCartItems(products))
  }, [])

  return (
    <div className="cart-container overlay show-cart ">
      <div className="shopping-container">
        <form className="shopping-cart">
          {cartCounter > 0 ? (
            <>
              <div>
                <h6>
                  Cart (<span>{cartCounter}</span>)
                </h6>
                <button className="button" onClick={deleteItemsFromCart}>
                  Remove all
                </button>
              </div>

              <ul className="cart-list">
                {cartItems.map((product, index) => {
                  const { slug, price, images, id } = product
                  console.log(index)
                  return (
                    <CartProduct
                      key={id}
                      {...{ slug, price, id }}
                      image={images.display.first}
                      itemCount={counts[index][1]}
                      updateCounter={updateCounter}
                      ifZeroUpdate={ifZeroUpdate}
                      setTotal={setTotal}
                     
                    />
                  )
                })}
              </ul>
              <p>
                <span>total</span>
                <strong>
                  $ <span>{total}</span>
                </strong>
              </p>

              <Link reloadDocument to="/checkout" className="button-1">
                checkout
              </Link>
            </>
          ) : (
            <h6 className="emptyCart">The cart is empty</h6>
          )}
        </form>
      </div>
    </div>
  )
})
export default Cart