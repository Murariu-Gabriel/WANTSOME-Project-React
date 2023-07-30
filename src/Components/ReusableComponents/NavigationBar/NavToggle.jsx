import { Link } from "react-router-dom"

const NavToggle = () => {
  return (
    <nav class="visual-nav overlay" id="header-nav">
      <ul class="special-nav" id="visual-nav">
        <li class="user-element">
          <div>
            <img
              class="category-image"
              src="../assets/Images/user.png"
              alt="user-photo"
            />
            <h3 class="subtitle">Login</h3>
            <Link class="big-link" to="/login"></Link>
          </div>
          <div class="hide">
            <img
              class="category-image"
              src="../assets/Images/user.png"
              alt="user-photo"
            />
            <h3 class="subtitle">
              Welcome, <span id="mobile-nav-name"></span>!
            </h3>
            <a href="#" class="button-3">
              {" "}
              Logout{" "}
            </a>
          </div>
        </li>

        <li>
          <div>
            <img
              class="category-image"
              src="/assets/Images/Devices/Huawei/Gt-runner/product/Gt-Runner-category.png"
              alt="Huawei Gt Runner"
            />
            <h3 class="subtitle">Smart watches</h3>
            <Link to="/categoryPage/smart-watch" class="button-3">
              shop
              <img
                src="/assets/from-project-assets/shared/desktop/icon-arrow-right.svg"
                alt="button-arrow"
              />
            </Link>
            <Link class="big-link" to="/categoryPage/smart-watch"></Link>
          </div>
        </li>

        <li>
          <div>
            <img
              class="category-image"
              src="/assets/Images/Devices/Fit-Bit/fitbit-inspire/product/fitbit-inspire-category.png"
              alt="Fitbit Inspire 3"
            />
            <h3 class="subtitle">Smart bands</h3>
            <Link to="/categoryPage/smart-band" class="button-3">
              shop
              <img
                src="/assets/from-project-assets/shared/desktop/icon-arrow-right.svg"
                alt="button-arrow"
              />
            </Link>
            <Link class="big-link" to="/categoryPage/smart-band"></Link>
          </div>
        </li>

        <li>
          <div>
            <img
              class="category-image"
              src="/assets/Images/Devices/Whoop-strap-4/product/whoopstrap-category.png"
              alt="Whoop strap 4"
            />
            <h3 class="subtitle">smart strap</h3>
            <Link to="/categoryPage/smart-strap" class="button-3">
              shop
              <img
                src="/assets/from-project-assets/shared/desktop/icon-arrow-right.svg"
                alt="button-arrow"
              />
            </Link>
            <Link class="big-link" to="/categoryPage/smart-strap"></Link>
          </div>
        </li>
      </ul>
    </nav>
  )
}
export default NavToggle
