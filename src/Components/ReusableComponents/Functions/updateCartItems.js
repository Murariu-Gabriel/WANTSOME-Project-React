import getLocalStorageItems from "./getLocalStorageItems";


const updateCartItems = (item, count, operation) => {

    const cartItems = getLocalStorageItems("cart-products") 

    const ifNull = cartItems[item] === undefined ? 0 : cartItems[item]

    // console.log( ifNull)

    if(operation === "+"){
        cartItems[item] = ifNull + count
    }

    if(operation === "-"){
        cartItems[item] = cartItems[item] - count

    }

     if (cartItems[item] === 0) {
       delete cartItems[item]
     }
   
   
    const stringified = JSON.stringify(cartItems)
    localStorage.setItem("cart-products", stringified)
}

export default updateCartItems