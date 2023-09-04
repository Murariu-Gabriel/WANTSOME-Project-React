import { useParams } from "react-router-dom"
import About from "../../Components/About/About"
import GenerateSearchPage from "./SearchPageComponents/GenerateSearchPage"

const SearchPage = ({ updateCounter }) => {
  const params = useParams()

  // updateCounter is to be used for adding items to cart and takes 2 parameters, how many items to add and operation, if you add only 1 as first parameter it will just add 1

  // This is the component where you must get the items and pass the down to the other components

  const currentSearch = params.id

  return (
    <>
      <div>SearchPage searched item = {currentSearch}</div>

      <GenerateSearchPage />

      <About />
    </>
  )
}
export default SearchPage