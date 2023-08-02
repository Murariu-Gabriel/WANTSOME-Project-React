import { Link } from "react-router-dom"

const UserOptions = () => {
  return (
    <aside className="user-container overlay hide" id="user-container">
      <div className="user-options-container">
        <div className="user-options">
          <div className="user-options-content">
            <Link to="/login" className="button-1">
              Login
            </Link >
            <span>or</span>
            <Link to="/signUp" className="button-1">
              sign up
            </Link>
          </div>

            {/* Here there is a need for a useState and to get the user name so it can be rendered, also it needs conditional rendering, if the user is logged it to show he is logged in and his name if not the buttons that redirect towards connecting account */}

          <div className="user-options-content hide">
            <span>
              Welcome, <span id="user-name-after-login">user</span>!
            </span>
            <button className="button-3" id="logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
export default UserOptions