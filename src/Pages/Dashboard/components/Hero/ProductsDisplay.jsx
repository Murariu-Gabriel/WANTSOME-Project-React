import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { apiUrl } from "../../../../Components/ReusableComponents/Functions/generalVariables"
import useFetch from "../../../../Components/ReusableComponents/Functions/useFetch"
import LoadingError from "../../../../Components/ReusableComponents/LoadingError"
import LoadingTransition from "../../../../Components/ReusableComponents/LoadingTransition"
import CarouselSlide from "./CarouselSlide"
import "./productDisplayStyles.scss"

const ProductsDisplay = () => {
  const [items, setItems] = useState([])
  const [isTicking, setIsTicking] = useState(false)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const bigLength = items.length
  const trackRef = useRef(null)

  const {
    isLoading,
    isError,
    data: products,
  } = useFetch(`${apiUrl}/products?new=true`)

  const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const placeItem = (position, slideWidth) => {
    const filter = (products) => {
      return products.filter((product) => product.id !== "item-3")
    }

    const item = {
      styles: {
        transform: `translateX(${position * slideWidth}px)`,
      },
      product: filter(products)[items[position]],
    }

    const { styles } = item

    return styles
  }

  useEffect(() => {
    if (trackRef.current) {
      setCarouselWidth(trackRef.current.offsetWidth)
      const keys = Array.from(Array(products.length - 1).keys())
      setItems(keys)
      
    }
  }, [products])

  const jumperFactory = (jump) => {
    return () => {
      if (!isTicking) {
        setIsTicking(true)
        setItems((prev) => {
          return prev.map((_, i) => {
            const nextPosition = i + jump
            const nextJump = jump < 1 ? nextPosition + bigLength : nextPosition
            return prev[nextJump % bigLength]
          })
        })
      }
    }
  }



  const moveRight = jumperFactory(1)
  const moveLeft = jumperFactory(-1)

  const handleDotClick = (idx) => {
    if (idx < activeIdx) {
      const n = activeIdx - idx
      const jumpPrevN = jumperFactory(n)
      jumpPrevN()
    }
    if (idx > activeIdx) {
      const n = idx - activeIdx
      const jumpNextN = jumperFactory(-n)
      jumpNextN()
    }
  }

  // carousel timed slides

  let carouselTimeout

  const setAutomaticSwitch = () => {
    carouselTimeout = setInterval(() => {
      moveLeft()
    }, 2000)
  }

 // I need to figure out a way to call this function on render so the carousel slides itself but when this function is called the states are not fully updated so the state containing activeIndex will be null

  const resetAutomaticSwitch = () => {
    clearInterval(carouselTimeout)
    carouselTimeout = setInterval(() => {
      moveLeft
    }, 3000)
  }

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false))
  }, [isTicking])

  useEffect(() => {
    setActiveIdx((bigLength - (items[0] % bigLength)) % bigLength)
    //   setAutomaticSwitch()
  }, [items])

  useEffect(() => {
  }, [])

  if (isLoading) {
    return <LoadingTransition/>
  }
  if (isError) {
    return <LoadingError/>
  }

  return (
    <section className="products-display">
      <div className="container">
        <h2>NEW products</h2>

        <div className="carousel">
          <div className="carousel-track-container">
            <button className="carousel-button button-left" onClick={moveRight}>
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

            <ul ref={trackRef} className="carousel-track" id="carousel-track">
              {products
                .filter((product) => product.id !== "item-3")
                .map((product, index) => {
                  const { id, shortDescription, name, images } = product

                  return (
                    <CarouselSlide
                      key={id}
                      {...{ shortDescription, name, id }}
                      image={images.productDisplay}
                      styles={placeItem(items[index], carouselWidth)}
                    />
                  )
                })}
            </ul>

            <button className="carousel-button button-right" onClick={moveLeft}>
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
              {items.slice(0, bigLength).map((position, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={
                      i === activeIdx
                        ? "carousel-indicator current-slide"
                        : "carousel-indicator"
                    }
                  ></button>
                )
              })}
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