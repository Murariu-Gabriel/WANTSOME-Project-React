import { Link } from "react-router-dom"

const CarouselSlide = ({ name, image, shortDescription, id, styles }) => {

  return (
    <li className="carousel-slide" style={styles}>
      <img className="category-image" src={image} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>{shortDescription}</p>
        <Link to={`/productPage/${id}`} className="button-2b">
          see product
        </Link>
      </div>
    </li>
  )
}
export default CarouselSlide

