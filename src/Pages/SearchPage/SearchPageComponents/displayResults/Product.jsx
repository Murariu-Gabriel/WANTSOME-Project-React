import { Link } from "react-router-dom"
import Discount from "./Discount"
import New from "./New"
import updateCartItems from "../../../../Components/ReusableComponents/Functions/updateCartItems"


const Product = ({ name, productImage, price, ifDiscount, ifNew, id, updateCounter }) => {
  // const calcDiscount = price * (ifDiscount.percent / 100)
  // const priceDiscount =  price - calcDiscount 


  // console.log(`NAME: ${name}, price:${price}, discounted price:${priceDiscount} `)

  const handleAddToCart = () => {
    updateCounter(1)
    updateCartItems(id, 1, "+")
  }


  return (
    <article>
      <img className="category-image" src={productImage} alt={name} />
      <div>
        {ifNew && <New />}
        {ifDiscount && <Discount ifDiscount={ifDiscount} />}

        <h3 className="subtitle">{name}</h3>

        <span>
          {ifDiscount ? <small>{price}$</small> : ""}
          <strong>{ifDiscount ? ifDiscount.price : price}</strong> $
        </span>

        <button
          className="button"
          onClick={() => {
            handleAddToCart()
          }}
        >
          <svg
            width="2rem"
            height="100%"
            viewBox="-3 0 30 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z"
              fillRule="nonzero"
            />
          </svg>
          Add to cart
        </button>
      </div>
      <Link reloadDocument className="big-link" to={`/productPage/${id}`}></Link>
    </article>
  )
}
export default Product

