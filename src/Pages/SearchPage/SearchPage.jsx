import { useParams } from "react-router-dom"
import About from "../../Components/About/About"
import GenerateSearchPage from "./SearchPageComponents/GenerateSearchPage"

import "./SearchPage.scss"



const SearchPage = ({ updateCounter }) => {
  const params = useParams()
  const currentSearch = params.id

  return (
    <>
      <GenerateSearchPage {...{ updateCounter, currentSearch}} />

      <About />
    </>
  )
}
export default SearchPage