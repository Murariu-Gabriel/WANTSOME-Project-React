import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

const ProductPage = () => {
   const { id } = useParams()
   const [product, setProduct] = useState([])
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/products/${id}`
          )
          const fetchedProduct = await response.json()
          // console.log(fetchedProduct)
          setProduct(fetchedProduct)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }, [])

  return <div>ProductPage {product.id} </div>
}
export default ProductPage

// HERE YOU CAN MAKE A DIRECT REQUEST TO THE JSON SERVER LOOKING FOR THAT EXACT ITEM INSTEAD OF LOOPING THROUGH ALL THE ITEMS TO FIND THE ITEM. REMEMBER TO DO YOUR FETCHING INSIDE AN USE EFFECT WITH A DEPENDENCY ARRAY SET TO INITIAL RENDER