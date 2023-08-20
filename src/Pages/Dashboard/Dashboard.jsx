import Hero from "./components/Hero/Hero"
import Categories from "../../Components/ReusableComponents/Categories/Categories"
import About from "../../Components/About/About"
import ProductsDisplay from "./components/Hero/ProductsDisplay"

const Dashboard = () => {
  return (
    <>
      <Hero/>
      <Categories/>
      <ProductsDisplay/>
      <About/>
    </>
  )
}
export default Dashboard