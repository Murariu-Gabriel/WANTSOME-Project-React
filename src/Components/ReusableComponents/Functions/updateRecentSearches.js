import getLocalStorageItems from "./getLocalStorageItems"

const updateRecentSearches = (item) => {
  const recentSearches = getLocalStorageItems("recent-searches", [])

  const currentItem = {
    name: item,
    id: crypto.randomUUID(),
  }

  console.log(recentSearches)

  recentSearches.push(currentItem)

  if (recentSearches.length >= 5) {
    recentSearches.shift()
  }

  const searches = JSON.stringify(recentSearches)
  localStorage.setItem("recent-searches", searches)
}

export default updateRecentSearches