import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./styles.scss"


const Hero = () => {
  const [item, setItem] = useState("")

  const itemForHero = async () => {
    try {
    const response = await fetch("http://localhost:3000/products/item-3")
    const data = await response.json()
    
      setItem(data)
    } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
     itemForHero()
     console.log(item)
  }, [])

  const {name, heroDescription} = item

  return (
    <section className="nav-and-hero">
      <div className="hero">
        <article className="container">
          <p className="overline">featured product</p>
          <h1>{name}</h1>
          <p>
            {heroDescription}
          </p>
          <Link to="/productPage/item-3" className="button-1">
            See Product
          </Link>
        </article>
      </div>
    </section>
  )
}
export default Hero