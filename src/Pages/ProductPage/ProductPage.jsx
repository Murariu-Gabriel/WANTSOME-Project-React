import { useState } from "react"
import { useParams } from "react-router-dom"
import About from "../../Components/About/About"
import Categories from "../../Components/ReusableComponents/Categories/Categories"
import useFetch from "../../Components/ReusableComponents/Functions/useFetch"
import YouMayAlsoLike from "./YouMayAlsoLike"

import updateCartItems from "../../Components/ReusableComponents/Functions/updateCartItems"
import GoBack from "../../Components/ReusableComponents/GoBack"

import "./styles.scss"
import LoadingTransition from "../../Components/ReusableComponents/LoadingTransition"
import LoadingError from "../../Components/ReusableComponents/LoadingError"
import { apiUrl } from "../../Components/ReusableComponents/Functions/generalVariables"


const ProductPage = ({ updateCounter }) => {
  const [count, setCount] = useState(1)
  const { id } = useParams()

 

  const minus = (e) => {
    if (count > 1) {
      setCount(count - 1)
    } else {
      e.preventDefault()
    }
  }

  const plus = (e) => {
    if (count < 10) {
      setCount(count + 1)
    } else {
      e.preventDefault()
    }
  }

  const handleAddToCart = () => {
    updateCounter(count)
    setCount(1)
    updateCartItems(id, count, "+")
  }

  const {
    isLoading,
    isError,
    data: product,
  } = useFetch(`${apiUrl}/products/${id}`)

  if (isLoading) {
    return <LoadingTransition/>
  }
  if (isError) {
    return <LoadingError/>
  }

  const {
    name,
    id: productId,
    images,
    description,
    price,
    discount,
    features,
    new: newProduct,
    includes,
  } = product

  return (
    <>
      <section className="product">
        <div className="container">
          <GoBack />

          <article>
            <div className="image-container">
              <img src={images.display.second} alt={name} />
            </div>

            <div className="product-info">
              {newProduct ? <p className="overline">new product</p> : ""}
              {discount 
              ? 
                <p className="overline discount">
                  Discount: {discount.percent}% OFF
                </p>
              : 
                ""
              }

              <h2>{name}</h2>
              <p>{description}</p>

              <strong>
                <span>
                  {discount ? <small>{price}$</small> : ""}{" "}
                  {discount ? discount.price : price}$
                </span>
              </strong>

              <form>
                <div className="input-stepper">
                  <button id="decrement" type="button" onClick={minus}>
                    -
                  </button>
                  <input
                    type="number"
                    id="product-counter"
                    value={count}
                    min={1}
                    max={10}
                    readOnly
                  />
                  <button id="increment" type="button" onClick={plus}>
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="button-1"
                  onClick={handleAddToCart}
                >
                  add to cart
                </button>
              </form>
            </div>
          </article>

          <article>
            <div className="features" id="features">
              <h2>features</h2>

              <p>{features}</p>
            </div>

            <div className="inside-box">
              <h2>in the box</h2>
              <div id="box-items">
                {includes.map((element) => {
                  const { quantity, item } = element

                  return (
                    <p key={crypto.randomUUID()}>
                      <span>x{quantity}</span> {item}
                    </p>
                  )
                })}
              </div>
            </div>
          </article>

          <div className="presentation-images">
            <div>
              <img src={images.gallery[0].img} alt="" />
              <img src={images.gallery[1].img} alt="" />
            </div>
            <img src={images.gallery[2].img} alt="" />
          </div>
        </div>
      </section>

      <YouMayAlsoLike id={id} />

      <Categories />
      <About />
    </>
  )
}
export default ProductPage

// HERE YOU CAN MAKE A DIRECT REQUEST TO THE JSON SERVER LOOKING FOR THAT EXACT ITEM INSTEAD OF LOOPING THROUGH ALL THE ITEMS TO FIND THE ITEM. REMEMBER TO DO YOUR FETCHING INSIDE AN USE EFFECT WITH A DEPENDENCY ARRAY SET TO INITIAL RENDER
