import { Link } from "react-router-dom"

const CarouselSlide = ({ name, image, description, id, styles }) => {
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

// import { Link } from "react-router-dom"

// const CarouselSlide = ({placeItem, position, carouselWidth}) => {

//     const styles = placeItem(position, carouselWidth)

//     const {product} = styles

//     // console.log(product)

//   return (
//     <li className="carousel-slide" style={styles.styles}>
//       <img
//         className="category-image"
//         src={product.images.productDisplay}
//         alt={product.name}
//       />
//       <div>
//         <h2>{product.name}</h2>
//         <p>{product.shortDescription}</p>
//         <Link to={`/productPage/${product.id}`} className="button-2b">
//           see product
//         </Link>
//       </div>
//     </li>
//   )
// }
// export default CarouselSlide
