import getLocalStorageItems from "./getLocalStorageItems"

const updateRecentSearches = (item) => {
  const recentSearches = getLocalStorageItems("recent-searches", [])

  const currentItem = {
    name: item,
    id: crypto.randomUUID(),
  }
  const filteredSearches = recentSearches.filter(search => search.name !== item)

  // console.log(recentSearches)

  filteredSearches.push(currentItem)

  if (filteredSearches.length >= 5) {
    filteredSearches.shift()
  }


  const searches = JSON.stringify(filteredSearches)
  localStorage.setItem("recent-searches", searches)
}

export default updateRecentSearches