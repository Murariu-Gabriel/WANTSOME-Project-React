import { Link } from "react-router-dom"

const RegisterPopup = () => {
  return (
    <aside className="popup overlay">
      <div className="success-popup ">
        <strong>Register successful!</strong>
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <circle fill="#D87D4A" cx="32" cy="32" r="32" />
            <path
              stroke="#FFF"
              strokeWidth="4"
              d="m20.754 33.333 6.751 6.751 15.804-15.803"
            />
          </g>
        </svg>
        <button className="button-1">
          
          <Link to="/login">go to login</Link>
        </button>
      </div>
    </aside>
  )
}
export default RegisterPopup