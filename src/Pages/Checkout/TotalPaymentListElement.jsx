const TotalPaymentListElement = ({priceElement, price}) => {
  return (
    <div>
      <p>{priceElement}</p>
      <p>
        $<span>{price}</span>
      </p>
    </div>
  )
}
export default TotalPaymentListElement