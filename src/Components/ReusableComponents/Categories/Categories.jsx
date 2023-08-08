import { Link } from "react-router-dom"
import "./styles.scss"

const Categories = () => {

// Here you might have to make the articles into sub components

  return (
    <section className="categories">
      <div className="container">
        <article>
          <div>
            <img
              className="category-image"
              src="/assets/Images/Devices/Huawei/Gt-runner/product/Gt-Runner-category.png"
              alt="Huawei Gt Runner"
            />
            <h3 className="subtitle">Smart watches</h3>
            <Link  to="/categoryPage/smart-watch" className="button-3">
              shop
              <img
                src="/assets/from-project-assets/shared/desktop/icon-arrow-right.svg"
                alt="button-arrow"
              />
            </Link>
            <Link  className="big-link" to="/categoryPage/smart-watch"></Link>
          </div>
        </article>

        <article>
          <div>
            <img
              className="category-image"
              src="/assets/Images/Devices/Fit-Bit/fitbit-inspire/product/fitbit-inspire-category.png"
              alt="Fitbit Inspire 3"
            />
            <h3 className="subtitle">Smart bands</h3>
            <Link  to="/categoryPage/smart-band" className="button-3">
              shop
              <img
                src="/assets/from-project-assets/shared/desktop/icon-arrow-right.svg"
                alt="button-arrow"
              />
            </Link>
            <Link  className="big-link" to="/categoryPage/smart-band"></Link>
          </div>
        </article>

        <article>
          <div>
            <img
              className="category-image"
              src="/assets/Images/Devices/Whoop-strap-4/product/whoopstrap-category.png"
              alt="Whoop strap 4"
            />
            <h3 className="subtitle">smart strap</h3>
            <Link  to="/categoryPage/smart-strap" className="button-3">
              shop
              <img
                src="/assets/from-project-assets/shared/desktop/icon-arrow-right.svg"
                alt="button-arrow"
              />
            </Link>
            <Link  className="big-link" to="/categoryPage/smart-strap"></Link>
          </div>
        </article>
      </div>
    </section>
  )
}
export default Categories