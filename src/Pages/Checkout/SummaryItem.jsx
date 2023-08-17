import { useEffect } from "react"

const SummaryItem = ({ name, img, price, count, setTotal }) => {

  useEffect(() => {

    if(setTotal){
      setTotal((currentState) => currentState + price * count)
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
        <span>{price}</span>
      </p>

      <span>
        x <span>{count}</span>
      </span>
    </li>
  )
}
export default SummaryItem