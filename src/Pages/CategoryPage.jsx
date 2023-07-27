import { Link, Route, Routes, useParams } from "react-router-dom"
import ProductPage from "./ProductPage"

const CategoryPage = () => {
  const { id } = useParams()
  return (
    <>
      <div>CategoryPage ID: {id}</div>
      <Link to="/productPage">asdas</Link>
    </>
  )
}
export default CategoryPage

// Here if you want to generate components that have custom links you will have to use useSearchParams

// i think you will have to make a component that will be looped here based on the data depening on the param id
