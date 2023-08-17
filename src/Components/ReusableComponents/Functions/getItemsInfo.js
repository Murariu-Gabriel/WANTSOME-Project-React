const getItemsInfo = (object, gFunction) => {
  const objectEntries = Object.entries(object).reduce(
    (accumulator, currentValue) => {
      return accumulator.concat(currentValue[0].replace("item-", ""))
    },
    []
  )

  const getProducts = gFunction(objectEntries)

  return getProducts
}

export default getItemsInfo