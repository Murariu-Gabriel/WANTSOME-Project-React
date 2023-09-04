import DisplayResults from "./DisplayResults"
import Filters from "./filters/Filters"

const GenerateSearchPage = () => {
  

  // Might need to have a useState here with passed items from SearchPage component 
  // and have a function tht is passed into filters so when I activate a filter to update the display results and filters so they can be re-rendered

  return (
    <section className="generated-search-result ">
      <div className="container hide">
        <Filters />

        <DisplayResults />
      </div>
    </section>
  )
}

export default GenerateSearchPage