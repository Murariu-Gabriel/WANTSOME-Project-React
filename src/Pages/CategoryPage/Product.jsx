import { Link } from "react-router-dom"

const Product = ({ id, name, description, image, discount, newProduct }) => {
  return (
    <article>
      <Link to={`/productPage/${id}`} className="image-container">
        <img src={image} alt={name} />
      </Link>
      <div>
        {newProduct ?  (<p className='overline'>new product</p>)  : ""}
        {discount ? (<p className='overline discount'>Discount: {discount}% OFF</p>) : ""}
        <h2>{name}</h2>
        <p>{description}</p>
        <Link to={`/productPage/${id}`} className="button-1">
          see product
        </Link>
      </div>
    </article>
  )
}
export default Product