import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import handleToggleWhenClickedOutside from "../Functions/handleToggleWhenClickedOutside"

const NavToggle = ({ navToggle, toggleNav, extraRef }) => {

  const ref = useRef(null)
  useEffect(() => {
      handleToggleWhenClickedOutside(
        ref,
        navToggle,
        toggleNav,
        extraRef
      )
  }, [])
  
  return (
    <nav className="visual-nav overlay nav-toggle">
      <ul ref={ref} className="special-nav">
        <li className="user-element">
          <div>
            <img
              className="category-image"
              src="../assets/Images/user.png"
              alt="user-photo"
            />
            <h3 className="subtitle">Login</h3>
            <Link className="big-link" to="/login"></Link>
          </div>
          <div className="hide">
            <img
              className="category-image"
              src="../assets/Images/user.png"
              alt="user-photo"
            />
            <h3 className="subtitle">
              Welcome, <span id="mobile-nav-name"></span>!
            </h3>
            <a href="#" className="button-3">
              Logout
            </a>
          </div>
        </li>

        <li>
          <div>
            <img
              className="category-image"
              src="/assets/Images/Devices/Huawei/Gt-runner/product/Gt-Runner-category.png"
              alt="Huawei Gt Runner"
            />
            <h3 className="subtitle">Smart watches</h3>
            <Link
              reloadDocument
              to="/categoryPage/smart-watch"
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
              to="/categoryPage/smart-watch"
            ></Link>
          </div>
        </li>

        <li>
          <div>
            <img
              className="category-image"
              src="/assets/Images/Devices/Fit-Bit/fitbit-inspire/product/fitbit-inspire-category.png"
              alt="Fitbit Inspire 3"
            />
            <h3 className="subtitle">Smart bands</h3>
            <Link
              reloadDocument
              to="/categoryPage/smart-band"
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
              to="/categoryPage/smart-band"
            ></Link>
          </div>
        </li>

        <li>
          <div>
            <img
              className="category-image"
              src="/assets/Images/Devices/Whoop-strap-4/product/whoopstrap-category.png"
              alt="Whoop strap 4"
            />
            <h3 className="subtitle">smart strap</h3>
            <Link
              reloadDocument
              to="/categoryPage/smart-strap"
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
              to="/categoryPage/smart-strap"
            ></Link>
          </div>
        </li>
      </ul>
    </nav>
  )
}
export default NavToggle
