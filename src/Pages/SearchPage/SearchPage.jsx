import { useParams } from "react-router-dom"
import About from "../../Components/About/About"
import GenerateSearchPage from "./SearchPageComponents/GenerateSearchPage"
import "./SearchPage.scss"

const SearchPage = ({ updateCounter }) => {
  const params = useParams()
  const currentSearch = params.id
  // updateCounter is to be used for adding items to cart and takes 2 parameters, how many items to add and operation, if you add only 1 as first parameter it will just add 1


  return (
    <>
      <div>SearchPage searched item = {currentSearch}</div>

      <GenerateSearchPage {...{ updateCounter, currentSearch}} />

      <About />
    </>
  )
}
export default SearchPage