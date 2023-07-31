import { Link } from "react-router-dom"

const UserOptions = () => {
  return (
    <aside class="user-container overlay hide" id="user-container">
      <div class="user-options-container">
        <div class="user-options">
          <div class="user-options-content">
            <Link to="/login" class="button-1">
              Login
            </Link >
            <span>or</span>
            <Link to="/signUp" class="button-1">
              sign up
            </Link>
          </div>

            {/* Here there is a need for a useState and to get the user name so it can be rendered, also it needs conditional rendering, if the user is logged it to show he is logged in and his name if not the buttons that redirect towards connecting account */}

          <div class="user-options-content hide">
            <span>
              Welcome, <span id="user-name-after-login">user</span>!
            </span>
            <button class="button-3" id="logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
export default UserOptions