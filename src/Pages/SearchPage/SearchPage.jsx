import { useParams } from "react-router-dom"
import About from "../../Components/About/About"
import GenerateSearchPage from "./SearchPageComponents/GenerateSearchPage"
import "./SearchPage.scss"

const SearchPage = ({ updateCounter }) => {
  const params = useParams()
  const currentSearch = params.id

  // when pagination is clicked the page should load at top

  // when coming back from product page you should come back to the same page you left

  // search should respond to enter

  // all the toggles should respond to esc

  // NEXT AND LAST THING 

  // you need to make the navbar sticky and figure out the cross platform sticky nav

  return (
    <>
      <GenerateSearchPage {...{ updateCounter, currentSearch}} />

      <About />
    </>
  )
}
export default SearchPage