import { useState, useEffect } from "react"
import SuggestedProduct from "./SuggestedProduct"

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

    // I loop over with map and replace the number with respective fetched object
    const generateRandomProducts = async () => {

        const uniqueNumbers = generateUniqueNumbers(12, 3)

        try {
            const getProducts = await Promise.all(uniqueNumbers.map(async element => {
            const response = await fetch(`http://localhost:3000/products/item-${element}`)

            if (response.ok && response.status === 200) {
              return response.json()
            }

            return Promise.reject("ERROR")

            }))

            return getProducts.reduce((accumulator, data) => accumulator.concat(data), [])

        } catch (error) {
            console.log(error)

            return []
            
        }
  
    }

    useEffect(() => {
        generateRandomProducts()
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