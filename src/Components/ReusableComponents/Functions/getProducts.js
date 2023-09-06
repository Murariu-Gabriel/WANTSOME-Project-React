const getProducts = async() => {

    try {
        const response = await fetch("http://localhost:3000/products")
        const data = await response.json()
        
        return data
        
        
    } catch (error) {
        console.log(error)    
    }

}
    
export default getProducts