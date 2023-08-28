import SearchResultElement from "./SearchResultElement"

const SearchResults = ({items}) => {
  return (
    <ul>
      {items.map((item) => {
        console.log(item.name)
        const { name, id } = item
        return <SearchResultElement key={id} {...{ name, id }} />
      })}
    </ul>
  )

}
export default SearchResults