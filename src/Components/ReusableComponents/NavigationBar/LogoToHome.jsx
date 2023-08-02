import { Link } from "react-router-dom"

const LogoToHome = () => {
  return (
    <Link reloadDocument to="/">
      <img
        src="/assets/Images/logo-images/second-logo/png/logo-no-background.png"
        alt="Logo"
      />
    </Link>
  )
}
export default LogoToHome