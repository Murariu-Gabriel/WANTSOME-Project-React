import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import getCounts from "../../Functions/getEntries"
import getLocalStorageItems from "../../Functions/getLocalStorageItems"
import useFetch from "../../Functions/useFetch"
import SearchResults from "./SearchResults"
import "./searchStyles/index.scss"

const SearchBar = () => {
  const [searchToggle, setSearchToggle] = useState(false)
  const [placeholder, setPlaceholder] = useState("")
  const [query, setQuery] = useState("")
  const [items, setItems] = useState([])

  const navigate = useNavigate()

  const {
    isLoading,
    isError,
    data: products,
  } = useFetch(`http://localhost:3000/products`)


  const recentSearches = getLocalStorageItems("recent-searches", [])


  
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>There was an error</h2>
  }


  // main functionalities

  // when recent search empty it should display no recent searches

  // when search is not found display the current search on screen






  // The first found item must appear in the placeholder and be uppercase proof




  // ------------while I write the text written must be highlighted in the search


  // - here I think i need to pass into the result element the query so i can make some functionality that will highlight the entered text

  // - Somehow I need to make categories appear along the items not just items



  const updateRecentSearches = (item) => {
    const recentSearches = getLocalStorageItems("recent-searches", [])

    const currentItem = {
      name: item,
      id: crypto.randomUUID()
    }

    console.log(recentSearches)
    
    recentSearches.push(currentItem)

    if(recentSearches.length >= 5){
      recentSearches.shift()
    }

    const searches = JSON.stringify(recentSearches)
    localStorage.setItem("recent-searches", searches)

  }



  useEffect(() => {
    setItems(recentSearches)
  }, [searchToggle])


  const closeSearchToggle = () => {
    setQuery("")
    setSearchToggle(false)
    setItems([])
    setPlaceholder("")
  }

  const handleSearch = (value) => {
    setQuery(value)

    console.log(value)
    const currentSearch = products.filter(
      (product) =>
        product.name.includes(value.toLowerCase()) ||
        product.category.includes(value.toLowerCase())
    )

    if(value.length >= 2){
      setItems(currentSearch)
      console.log(items.length, "items.length")

      if(items.length >= 2){
        setPlaceholder(currentSearch[0]?.name)
      }

    } else {
      setItems([])
      setPlaceholder("")
      setItems(recentSearches)
    }

  }

  const handleSearchButton = () => {
    loadSearch()
    closeSearchToggle()
    updateRecentSearches(query)
  }

  const loadSearch = () => {
    navigate(`/search/${query}`)
  }

  return (
    <>
      <div className={`dummy ${searchToggle ? "" : "hide"}`}></div>
      <section className={`search-container ${searchToggle ? "overlay2" : ""}`}>
        <div className={`form-content ${searchToggle ? "content-width" : ""}`}>
          <div
            className={`input-container ${
              searchToggle ? "top search-animation" : ""
            }`}
          >
            <input
              className="search-input"
              id="search-input"
              autoComplete="off"
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onClick={() => setSearchToggle(true)}
            />

            <p className="place-holder" id="place-holder">
              {placeholder}
            </p>

            <button
              className={`close-search ${searchToggle ? "" : "hide"}`}
              onClick={() => closeSearchToggle()}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1.3rem"
                width="1.3rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </button>

            <button
              onClick={handleSearchButton}
            >
              <svg
                stroke="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="25"
                width="45"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"></path>
              </svg>
            </button>

            <div
              className={`search-results  ${searchToggle ? "" : "hide"} `}
              
            >
              <p className="suggestion">
                {query.length >= 2 ? "Search suggestions" : "Recent searches"}
              </p>

              <SearchResults items={items}/>
             
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default SearchBar