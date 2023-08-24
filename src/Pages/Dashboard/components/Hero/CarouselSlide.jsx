import { Link } from "react-router-dom"

const CarouselSlide = ({styles}) => {

    const {product} = styles


    // console.log(product)

  return (
    <li className="carousel-slide" style={styles.styles}>
      <img
        className="category-image"
        src={product.images.productDisplay}
        alt={product.name}
      />
      <div>
        <h2>{product.name}</h2>
        <p>{product.shortDescription}</p>
        <Link to={`/productPage/${product.id}`} className="button-2b">
          see product
        </Link>
      </div>
    </li>
  )
}
export default CarouselSlide