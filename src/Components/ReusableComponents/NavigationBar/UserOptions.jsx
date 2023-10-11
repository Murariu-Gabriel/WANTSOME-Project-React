import { useEffect, useRef } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import handleToggleWhenClickedOutside from "../Functions/handleToggleWhenClickedOutside"

const UserOptions = ({ user, userOptionsToggle, setUserOptionsToggle, extraRef }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const userRef1 = useRef(null)
  const userRef2 = useRef(null)

  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn)
    localStorage.removeItem("user")
  }

  useEffect(() => {
    if (user) {
      setIsLoggedIn(!isLoggedIn)
    }
  }, [])

  console.log("userToggle initiation")
  useEffect(() =>{
     if (isLoggedIn) {
      // Use userRef2 when the second div is visible
      handleToggleWhenClickedOutside(userRef1, userOptionsToggle, setUserOptionsToggle, extraRef);
    } else {
      // Use userRef1 when the first div is visible
      handleToggleWhenClickedOutside(userRef2, userOptionsToggle, setUserOptionsToggle, extraRef);
    }
  }, [])

  // console.log(extraRef)

  return (
    <aside className="user-container overlay">
      <div className="user-options-container">
        <div className="user-options" >
          <div
            className={`user-options-content ${isLoggedIn ? "hide" : ""}`}
            ref={userRef2}
          >
            <Link reloadDocument to="/login" className="button-1">
              Login
            </Link>

            <span>or</span>

            <Link reloadDocument to="/registration" className="button-1">
              sign up
            </Link>
          </div>

          {/* Here there is a need for a useState and to get the user name so it can be rendered, also it needs conditional rendering, if the user is logged it to show he is logged in and his name if not the buttons that redirect towards connecting account */}

          <div
            className={`user-options-content  ${isLoggedIn ? "" : "hide"}`}
            ref={userRef1}
          >
            <span>Welcome, {user.last_name}!</span>
            <button className="button-3" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
export default UserOptions