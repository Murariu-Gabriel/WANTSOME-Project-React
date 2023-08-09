import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CategoryElement from "./CategoryElement"
import "./styles.scss"

const Categories = () => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories")
      const data = await response.json()
  
      setCategories(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])
  

  return (
    <section className="categories">
      <div className="container">

          {categories.map(element => {
            const {id, category, images, name} = element
            return (
              <CategoryElement
                key={id}
                {...{ category, name }}
                img={images.productDisplay}
              />
            )
          })}

      </div>
    </section>
  )
}
export default Categories