import { useNavigate } from "react-router-dom"

const GoBack = () => {
  const navigate = useNavigate()

  return (
    <p className="link">
      
      <a onClick={() => navigate(-1)}>go back</a>
    </p>
  )
}
export default GoBack