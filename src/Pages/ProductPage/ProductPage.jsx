import { useParams } from "react-router-dom"
import About from "../../Components/About/About"
import Categories from "../../Components/ReusableComponents/Categories/Categories"
import useFetch from "../../Components/ReusableComponents/Functions/useFetch"

const ProductPage = () => {
  const { id } = useParams()
  const {
    isLoading,
    isError,
    data: product,
  } = useFetch(`http://localhost:3000/products/${id}`)

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>There was an error</h2>
  }

  const { id: dataId } = product

  return (
    <>
    <div>ProductPag {dataId} </div>
    <Categories/>
    <About/>
    </>

  )
}
export default ProductPage

// HERE YOU CAN MAKE A DIRECT REQUEST TO THE JSON SERVER LOOKING FOR THAT EXACT ITEM INSTEAD OF LOOPING THROUGH ALL THE ITEMS TO FIND THE ITEM. REMEMBER TO DO YOUR FETCHING INSIDE AN USE EFFECT WITH A DEPENDENCY ARRAY SET TO INITIAL RENDER
