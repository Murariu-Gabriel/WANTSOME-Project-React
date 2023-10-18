import getLocalStorageItems from "./getLocalStorageItems"

const checkIfAllFiltersFalse = () => {
  const filters = getLocalStorageItems("filters")

  for (const filter in filters) {
    for (const key in filters[filter]) {
      if (filters[filter][key]) {
        return false
      }
    }
  }

  return true
}

export default checkIfAllFiltersFalse