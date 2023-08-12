import { useState, useEffect, memo } from "react"
import { Link } from "react-router-dom"
import getCartItems from "../../Functions/getCartItems"
import generateProducts from "../../Functions/generateProducts"
import CartProduct from "./CartProduct"
import getCounts from "../../Functions/getEntries"
import "./cartStyles/index.scss"

// you might need to use useMemo or memo in this component

const Cart = memo(({ updateCounter, cartCounter }) => {
  const [cartItems, setCartItems] = useState([])

  // will have to figure out if i can just loop through these and render them
  const items = getCartItems()

  const counts = getCounts(items)

  console.log(items)
  console.log(counts)
  console.log(cartItems)

  const getItemsInfo = (object) => {
    const objectEntries = Object.entries(object).reduce(
      (accumulator, currentValue) => {
        return accumulator.concat(currentValue[0].replace("item-", ""))
      },
      []
    )

    const getProducts = generateProducts(objectEntries)

    return getProducts
  }


  // Here we have a problem this does not trigger and the list does not update
  const ifZeroUpdate = (count, id) => {
    if (count <= 0) {
      const newList = cartItems.filter((item) => item.id !== id)
      setCartItems(newList)
      console.log(newList)
    }
  }

  useEffect(() => {
    getItemsInfo(items).then((products) => setCartItems(products))
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
                <button className="button">
                  Remove all
                  {/* here we will delete state items */}
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
                    />
                  )
                })}
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
          ) : (
            <h6 className="emptyCart">The cart is empty</h6>
          )}
        </form>
      </div>
    </div>
  )
})
export default Cart