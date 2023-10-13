import { apiUrl } from "./generalVariables"

const getProducts = async() => {

    try {
        const response = await fetch(`${apiUrl}/products`)
        const data = await response.json()
        
        return data
        
        
    } catch (error) {
        console.log(error)    
    }

}
    
export default getProducts