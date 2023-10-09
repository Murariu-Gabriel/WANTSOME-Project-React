const Discount = ({ifDiscount}) => {
  return <span className="discount">{ifDiscount.percent}% OFF</span>
}
export default Discount