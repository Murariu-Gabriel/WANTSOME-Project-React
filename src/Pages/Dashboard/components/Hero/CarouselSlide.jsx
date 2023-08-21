import { Link } from "react-router-dom"

const CarouselSlide = ({name, image, description, id, styles}) => {

    // console.log(style)

  return (
    <li className="carousel-slide" style={styles}>
      <img className="category-image" src={image} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <Link to={`/productPage/${id}`} className="button-2b">
          see product
        </Link>
      </div>
    </li>
  )
}
export default CarouselSlide