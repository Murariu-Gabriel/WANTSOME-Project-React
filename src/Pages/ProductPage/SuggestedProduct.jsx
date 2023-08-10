import { useState } from "react"
import { Link } from "react-router-dom"

const SuggestedProduct = ({ id, name, productImage, altImage }) => {
    const [isHovered, setIsHovered] = useState(false)


  return (
    <article
      key={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="img-container">
          <img
            className="category-image image-1"
            src={isHovered ? altImage: productImage}
            alt={name}
          />
        </div>
        <h3>{name}</h3>
        <Link reloadDocument to={`/productPage/${id}`} className="button-1">
          see product
        </Link>
      </div>

      <Link
        reloadDocument
        to={`/productPage/${id}`}
        className="big-link"
      ></Link>
    </article>
  )
}
export default SuggestedProduct