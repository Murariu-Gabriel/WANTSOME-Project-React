import getLocalStorageItems from "./getLocalStorageItems"

const getCartLength = () => {
    const cartItems = getLocalStorageItems("cart-products")
 
    const values = Object.values(cartItems)

    const valuesSum = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return valuesSum
}

export default getCartLength