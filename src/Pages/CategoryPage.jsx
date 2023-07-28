import { useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom"



const CategoryPage = () => {
  const [product, setProduct] = useState([])
  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products?category=${id}`)
        const fetchedProduct = await response.json()
        console.log(fetchedProduct)
        setProduct(fetchedProduct)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  

  return (
    <>
      <div> {id}</div>
     

      {product.map((el) => (
        <Link key={el.id} to={`/productPage/${el.id}`}>{el.name}</Link>
      ))}
    </>
  )
}
export default CategoryPage

// Here if you want to generate components that have custom links you will have to use useSearchParams

// i think you will have to make a component that will be looped here based on the data depening on the param id



