import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useFetch from "../Components/ReusableComponents/Functions/useFetch"

const CategoryPage = () => {
  const { id } = useParams()
  const {
    isLoading,
    isError,
    data: products,
  } = useFetch(`http://localhost:3000/products?category=${id}`)

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>There was an error</h2>
  }

  return (
    <>
      <div> {id}</div>

      {products.map((el) => {
        const { id, name } = el

        return (
          <Link key={id} to={`/productPage/${id}`}>
            {name}
          </Link>
        )
      })}
    </>
  )
}
export default CategoryPage

// Here if you want to generate components that have custom links you will have to use useSearchParams

// i think you will have to make a component that will be looped here based on the data depening on the param id
