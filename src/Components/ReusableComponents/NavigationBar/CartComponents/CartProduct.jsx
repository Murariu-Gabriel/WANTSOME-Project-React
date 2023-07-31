import { useEffect, useState } from "react"

const CartProduct = () => {
    const [count, setCount] = useState(0)

    // here we need to pass props from the cart, the item with all the information necessary for setting it up  

    // useEffect(() => {
    //     setCount(productCount)
    // }, [])

  return (
    <li>
      <div class="img-container">
        <img src={productImg} alt={productAlt} />
      </div>

      <p>
        <strong>{productName}</strong>
        <span>$</span>
        <span>{productPrice}</span>
      </p>

      <div class="input-stepper">
        <button
          id="decrement"
          type="button"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <input
          type="number"
          class="product-counter"
          value={count}
          min="0"
          max="100"
          readonly
        />
        <button
          id="increment"
          type="button"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </li>
  )
}
export default CartProduct