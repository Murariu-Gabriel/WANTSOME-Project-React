const getLocalStorageItems = (items, empty) => {
  const storedItems = localStorage.getItem(items)
  const parsedItems = JSON.parse(storedItems)
  const obtainedItems = parsedItems ? parsedItems : empty ? empty : {}

  return obtainedItems
}
export default getLocalStorageItems
