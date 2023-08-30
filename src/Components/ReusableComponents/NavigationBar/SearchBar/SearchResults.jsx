import SearchResultElement from "./SearchResultElement"

const SearchResults = ({items, query}) => {

  console.log(items)


  if(items.length < 2 && query.length < 2){
    return <p className = "no-searches">No recent searches</p>
  }

  
  return (
    <ul>
      {items.length < 1 && query.length >= 2 ? (
        <SearchResultElement key={crypto.randomUUID()} name={query} />
      ) : (
        items.map((item) => {
          console.log(item.name)
          const { name, id } = item
          return <SearchResultElement key={id} {...{ name }} />
        })
      )}
    </ul>
  )
  

}
export default SearchResults