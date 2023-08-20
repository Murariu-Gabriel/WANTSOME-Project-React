import { Link } from "react-router-dom"
import useFetch from "../../../../Components/ReusableComponents/Functions/useFetch"
import CarouselSlide from "./CarouselSlide"
import "./productDisplayStyles.scss"

const ProductsDisplay = () => {

  const {
    isLoading,
    isError,
    data: products,
  } =  useFetch("http://localhost:3000/products?new=true")

   if (isLoading) {
     return <h2>Loading...</h2>
   }
   if (isError) {
     return <h2>There was an error</h2>
   }

  return (
    <section className="products-display">
      <div className="container">
        <h2>NEW products</h2>

        <div className="carousel">
          <div className="carousel-track-container">
            <button className="carousel-button button-left">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="150 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
              </svg>
            </button>

            {/* Here maybe you can make use of id and somehow move slides */}

            <ul className="carousel-track" id="carousel-track">
              {products.map((product) => {
                console.log(product)
                const { id, description, name, images } = product

                return (
                  <CarouselSlide
                    key={id}
                    {...{ description, name, id }}
                    image={images.productDisplay}
                  />
                )
              })}
            </ul>

            <button className="carousel-button button-right">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="-150 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
              </svg>
            </button>

            <div className="carousel-nav">
              <button className="carousel-indicator current-slide"></button>
              <button className="carousel-indicator"></button>
              <button className="carousel-indicator"></button>
            </div>
          </div>
        </div>

        <h2>on sale</h2>
        <article>
          <span className="subtitle">
            {" "}
            <span>-10%</span>{" "}
          </span>
          <div>
            <h4>xiaomi mi watch</h4>
            <Link to="/productPage/item-1" className="button-2">
              see product
            </Link>
          </div>
        </article>

        <article>
          <div>
            {" "}
            <span className="subtitle">
              {" "}
              <span>-10%</span>{" "}
            </span>
          </div>
          <div>
            <h4>garmin vivomove</h4>
            <Link to="/productPage/item-7" className="button-2">
              see product
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}


export default ProductsDisplay