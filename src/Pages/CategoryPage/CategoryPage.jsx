import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import About from "../../Components/About/About"
import Categories from "../../Components/ReusableComponents/Categories/Categories"
import useFetch from "../../Components/ReusableComponents/Functions/useFetch"
import LoadingError from "../../Components/ReusableComponents/LoadingError"
import LoadingTransition from "../../Components/ReusableComponents/LoadingTransition"
import Product from "./Product"

import "./styles.scss"

const CategoryPage = () => {
  const { id } = useParams()

  const {
    isLoading,
    isError,
    data: products,
  } = useFetch(`http://localhost:3000/products?category=${id}`)

  if (isLoading) {
    return <LoadingTransition/>
  }
  if (isError) {
    return <LoadingError/>
  }

  const sortedProducts = products.toSorted((a, b) => b.new - a.new)
  
  return (
    <>
      <div className="category">
        <h2>{id.replace("-", "  ")}</h2>
      </div>

      <section className="template-category">
        <div className="container">
          <div className="generated-items">

            {sortedProducts.map((el) => {
              const {
                id,
                name,
                description,
                images,
                discount,
                new: newProduct,
              } = el

              return (
                <Product
                  key={id}
                  {...{ id, name, description, discount, newProduct }}
                  image={images.display.first}
                />
              )
            })}
          </div>
          <div className="pagination" id="pagination"></div>
        </div>
      </section>

      <Categories />
      <About />
    </>
  )
}
export default CategoryPage

// Here if you want to generate components that have custom links you will have to use useSearchParams

// i think you will have to make a component that will be looped here based on the data depening on the param id
