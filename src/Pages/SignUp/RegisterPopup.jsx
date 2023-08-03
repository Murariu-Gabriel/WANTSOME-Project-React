const RegisterPopup = () => {
  return (
    <aside class="popup hide overlay">
      <div class="success-popup ">
        <strong>Register successful!</strong>
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <circle fill="#D87D4A" cx="32" cy="32" r="32" />
            <path
              stroke="#FFF"
              stroke-width="4"
              d="m20.754 33.333 6.751 6.751 15.804-15.803"
            />
          </g>
        </svg>
        <button class="button-1">
          
          <Link href="/login">go to login</Link>
        </button>
      </div>
    </aside>
  )
}
export default RegisterPopup