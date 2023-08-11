const getCartItems = () => {

    const storedProducts = localStorage.getItem("cart-products")
    const parsedProducts = JSON.parse(storedProducts)
    const products = parsedProducts ? parsedProducts : {}

  return products
}
export default getCartItems