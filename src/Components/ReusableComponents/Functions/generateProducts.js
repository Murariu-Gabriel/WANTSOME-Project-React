
const generateProducts = async (array) => {
  try {
    const getProducts = await Promise.all(
      array.map(async (element) => {
        const response = await fetch(
          `http://localhost:3000/products/item-${element}`
        )

        if (response.ok && response.status === 200) {
          return response.json()
        }

        return Promise.reject("ERROR")
      })
    )

    return getProducts.reduce(
      (accumulator, data) => accumulator.concat(data),
      []
    )
  } catch (error) {
    console.log(error)

    return []
  }
}

export default generateProducts