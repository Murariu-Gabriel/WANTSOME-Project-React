import { Link } from "react-router-dom"

const SimpleNav = () => {
  return (
    <nav>
      <ul>
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
export default SimpleNav
