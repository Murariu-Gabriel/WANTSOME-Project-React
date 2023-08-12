import { useState, useEffect } from "react"
import SuggestedProduct from "./SuggestedProduct"
import generateProducts from "../../Components/ReusableComponents/Functions/generateProducts"

const YouMayAlsoLike = ({id}) => {
    const [products, setProducts] = useState([])
    
    const currentItemId = parseInt(id.replace("item-", "")) 

    const generateUniqueNumbers = (range, count) => {
      const numbers = []

      for (let i = 0; i < count; i++) {
        const randNum = Math.floor(Math.random() * range) + 1

        if (!numbers.includes(randNum) && randNum !== currentItemId) {
          numbers.push(randNum)
        } else {
          i--
        }
      }

      return numbers
    }

    const uniqueNumbers = generateUniqueNumbers(12, 3)


    // I loop over with map and replace the number with respective fetched object
    

    useEffect(() => {
        generateProducts(uniqueNumbers)
        .then(products => {
            setProducts(products)
        })
    }, [])
    
    

  return (
      <section className="you-may-like">
      <div className="container">
        <h2>you may also like</h2>

        <div className="recommended-products">
            {products.map(product => {
                const {id, name, images} = product

                return (
                  <SuggestedProduct
                    key={id}
                    {...{ id, name }}
                    productImage={images.display.first}
                    altImage={images.display.second}
                  />
                )

            })}
        </div>
      </div>
    </section>
  )
}
export default YouMayAlsoLike