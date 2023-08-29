import SearchResultElement from "./SearchResultElement"

const SearchResults = ({items}) => {

  console.log(items)

  // if(items.length === 0){
  //   return <p>No results</p>
  // }

  return (
    <ul>
      {items.map((item) => {
        console.log(item.name)
        const { name, id } = item
        return <SearchResultElement key={id} {...{ name }} />
      })}
    </ul>
  )

}
export default SearchResults