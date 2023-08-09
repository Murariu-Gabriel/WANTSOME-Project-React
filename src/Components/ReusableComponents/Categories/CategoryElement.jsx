import { Link } from "react-router-dom"

const CategoryElement = ({ id, category, name, img }) => {
  return (
    <article key={id}>
      <div>
        <img className="category-image" src={img} alt={name} />
        <h3 className="subtitle">Smart watches</h3>
        <Link
          reloadDocument
          to={`/categoryPage/${category}`}
          className="button-3"
        >
          shop
          <img
            src="/assets/from-project-assets/shared/desktop/icon-arrow-right.svg"
            alt="button-arrow"
          />
        </Link>
        <Link
          reloadDocument
          className="big-link"
          to={`/categoryPage/${category}`}
        ></Link>
      </div>
    </article>
  )
}
export default CategoryElement