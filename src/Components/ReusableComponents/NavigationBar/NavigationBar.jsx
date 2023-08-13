import { Link } from "react-router-dom"
import SimpleNav from "./SimpleNav"
import NavToggle from "./NavToggle"
import SearchBar from "./SearchBar/SearchBar"
import ButtonRender from "./ButtonRender"
import Cart from "./CartComponents/Cart"
import LogoToHome from "./LogoToHome"
import UserOptions from "./UserOptions"

import "./NavigationStyles/index.scss"
import { useState } from "react"

const NavigationBar = ({ cartCounter, updateCounter, setCartCounter }) => {
  const [navToggle, setNavToggle] = useState(false)
  const [cartToggle, setCartToggle] = useState(false)
  const [userOptionsToggle, setUserOptionsToggle] = useState(false)

  const toggleNav = () => {
    setNavToggle(!navToggle)
  }

  const getUser = localStorage.getItem("user")

  const user = getUser ? JSON.parse(getUser) : false

  return (
    <section className="navigation">
      <div className="container">
        <header>
          <ButtonRender navToggle={navToggle} toggleNav={toggleNav} />

          <LogoToHome />

          <SimpleNav />

          {navToggle ? <NavToggle /> : ""}

          <button
            className="cart-button"
            onClick={() => setCartToggle(!cartToggle)}
          >
            <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z"
                fillRule="nonzero"
              />
            </svg>
            {cartCounter > 0 ? <span>{cartCounter}</span> : ""}
          </button>

          <button
            className="user-account"
            onClick={() => setUserOptionsToggle(!userOptionsToggle)}
          >
            <svg
              stroke="currentColor"
              strokeWidth="0"
              viewBox="0 0 25 20"
              height="2rem"
              width="2rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
            </svg>
          </button>

          <SearchBar />
        </header>
      </div>

      {cartToggle ? (
        <Cart
          updateCounter={updateCounter}
          cartCounter={cartCounter}
          setCartCounter={setCartCounter}
        />
      ) : (
        ""
      )}
      {userOptionsToggle ? <UserOptions user={user} /> : ""}
    </section>
  )
}
export default NavigationBar

// Here if you want to do styles since we are not in normal grounds anymore probably you need to make multiple scss files that have styles for this nav bar including media queries forwarded in an index file that you export in the nav component

// You will have to memoize this component
