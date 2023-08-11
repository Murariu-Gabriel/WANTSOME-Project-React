import { useParams } from "react-router-dom"

const SearchPage = ({ updateCounter }) => {
  const params = useParams()

  const currentSearch = params.id

  return <div>SearchPage searched item = {currentSearch}</div>
}
export default SearchPage