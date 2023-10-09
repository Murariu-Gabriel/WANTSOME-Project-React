import { useEffect } from "react"

const SummaryItem = ({ name, img, price, count, discount, setTotal }) => {

   const currentPrice = discount ? discount.price : price

  useEffect(() => {

    if(setTotal){
      setTotal((currentState) => currentState + currentPrice * count)
    }
  }, [])

  return (
    <li>
      <div className="img-container">
        <img src={img} alt={name} />
      </div>

      <p>
        <strong>{name}</strong>
        <span>$</span>
        <span>{currentPrice}</span>
      </p>

      <span>
        x <span>{count}</span>
      </span>
    </li>
  )
}
export default SummaryItem