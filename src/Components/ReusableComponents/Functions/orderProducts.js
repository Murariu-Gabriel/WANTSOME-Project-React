const orderProducts = (order, currentItems) => {
  const sort = (array, callback) => {
    const sort = array.toSorted(callback)

    return sort
  }

  if (order === "increasing") {
    const sortedItems = sort(currentItems, (a, b) => a.price - b.price)

    return sortedItems
  }

  if (order === "decreasing") {
    const sortedItems = sort(currentItems, (a, b) => b.price - a.price)

    return sortedItems
  }

  if (order === "new") {
    const sortedItems = sort(currentItems, (a, b) => b.new - a.new)

    return sortedItems
  }

  if (order === "discount") {
    const sortedItems = sort(
      currentItems,
      (a, b) =>
        b.discount?.isDiscounted ||
        b.discount - a.discount?.isDiscounted ||
        a.discount
    )

    console.log(sortedItems)

    return sortedItems
  }

  return currentItems
}

export default orderProducts