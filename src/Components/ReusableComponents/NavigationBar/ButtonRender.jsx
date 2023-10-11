const ButtonRender = ({navToggle, toggleNav, refForNav}) => {


  return (
    <>
      {navToggle ? (
        <button ref={refForNav} onClick={() => toggleNav()}>
          <svg
            stroke="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
          </svg>
        </button>
      ) : (
        <button onClick={() => toggleNav()}>
          <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="evenodd">
              <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
            </g>
          </svg>
        </button>
      )}
    </>
  )
}
export default ButtonRender