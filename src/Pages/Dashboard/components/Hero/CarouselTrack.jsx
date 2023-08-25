import useFetch from "../../../../Components/ReusableComponents/Functions/useFetch"

const CarouselTrack = () => {
    const [items, setItems] = useState([])
    const [carouselWidth, setCarouselWidth] = useState(0)
    const bigLength = items.length
    const trackRef = useRef(null)

    const {
        isLoading,
        isError,
        data: products,
    } = useFetch("http://localhost:3000/products?new=true")



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

       return item
    }


      useEffect(() => {
        if (trackRef.current) {
          setCarouselWidth(trackRef.current.offsetWidth)
          const keys = Array.from(Array(products.length - 1).keys())
          setItems(keys)
        }
      }, [products])


  return (
    <ul
      ref={trackRef}
      className="carousel-track"
      id="carousel-track"
      //   style={moveSlide.styles}
    >
      {items.map((product, index) => {
        return (
          <CarouselSlide
            key={crypto.randomUUID()}
            placeItem={placeItem}
            position={product}
            carouselWidth={carouselWidth}
          />
        )
      })}
    </ul>
  )
}
export default CarouselTrack
