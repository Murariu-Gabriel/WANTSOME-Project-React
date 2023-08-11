import getCartItems from "./getCartItems"

const getCartLength = () => {
    const cartItems = getCartItems()
 
    const values = Object.values(cartItems)

    const valuesSum = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return valuesSum
}

export default getCartLength