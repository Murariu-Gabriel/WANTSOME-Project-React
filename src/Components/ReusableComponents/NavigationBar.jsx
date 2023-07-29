import { Link } from "react-router-dom"

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link reloadDocument to="/">
            <img
              src="/assets/Images/logo-images/second-logo/png/logo-no-background.png"
              alt="Logo"
            />
          </Link>
        </li>
        <li>
          <Link reloadDocument to="/categoryPage/smart-watch">
            watches
          </Link>
        </li>
        <li>
          <Link reloadDocument to="/categoryPage/smart-band">
            bands
          </Link>
        </li>
        <li>
          <Link reloadDocument to="/categoryPage/smart-strap">
            straps
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default NavigationBar
