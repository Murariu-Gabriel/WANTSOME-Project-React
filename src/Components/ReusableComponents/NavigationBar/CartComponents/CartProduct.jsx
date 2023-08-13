import { useEffect, useState } from "react"
import updateCartItems from "../../Functions/updateCartItems"


const CartProduct = ({
  slug,
  price,
  image,
  itemCount,
  id,
  updateCounter,
  ifZeroUpdate,
  setTotal,
}) => {
  const [count, setCount] = useState(itemCount)

  // here we need to pass props from the cart, the item with all the information necessary for setting it up

  const handleMinus = () => {
    const currentCount = count - 1
    setCount(currentCount)
    updateCartItems(id, 1, "-")
    updateCounter(1, "-")
    ifZeroUpdate(currentCount, id)
    setTotal(currentState => currentState - price)
  }

  const handlePlus = () => {
    setCount((currentState) => currentState + 1)
    updateCartItems(id, 1, "+")
    updateCounter(1)
    setTotal((currentState) => currentState + price)

  }

  useEffect(() => {
    setTotal( currentState => currentState + (price * itemCount))
  },[])

  return (
    <li key={id}>
      <div className="img-container">
        <img src={image} alt={slug} />
      </div>

      <p>
        <strong>{slug}</strong>
        <span>$</span>
        <span>{price}</span>
      </p>

      <div className="input-stepper">
        <button id="decrement" type="button" onClick={() => handleMinus()}>
          -
        </button>
        <input
          type="number"
          className="product-counter"
          value={count}
          min="0"
          max="100"
          readOnly
        />
        <button id="increment" type="button" onClick={() => handlePlus()}>
          +
        </button>
      </div>
    </li>
  )
}
export default CartProduct