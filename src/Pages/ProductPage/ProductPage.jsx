import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import About from "../../Components/About/About"
import Categories from "../../Components/ReusableComponents/Categories/Categories"
import useFetch from "../../Components/ReusableComponents/Functions/useFetch"
import "./styles.scss"


const ProductPage = () => {
  const [count, setCount] = useState(1)
  const { id } = useParams()

  const navigate = useNavigate()

  const minus = (e) => {
    if(count > 1){
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

  const {
    isLoading,
    isError,
    data: product,
  } = useFetch(`http://localhost:3000/products/${id}`)

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>There was an error</h2>
  }

 
  const {name, id:productId, images, description, price, features, includes } = product

  return (
    <>
    
      <section className="product">
        <div className="container">
          <p className="link">
            <a onClick={() => navigate(-1)}>go back</a>
          </p>

          <article>
            <div className="image-container">
              <img src={images.display.second} alt={name} />
            </div>

            <div className="product-info">
              <p className="overline"></p>

              <h2>{name}</h2>
              <p>{description}</p>
              <strong>
                <span>{`${price} $`}</span>
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
                <button type="button" className="button-1" id="add-to-cart">
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

      <Categories />
      <About />
    </>
  )
}
export default ProductPage

// HERE YOU CAN MAKE A DIRECT REQUEST TO THE JSON SERVER LOOKING FOR THAT EXACT ITEM INSTEAD OF LOOPING THROUGH ALL THE ITEMS TO FIND THE ITEM. REMEMBER TO DO YOUR FETCHING INSIDE AN USE EFFECT WITH A DEPENDENCY ARRAY SET TO INITIAL RENDER
