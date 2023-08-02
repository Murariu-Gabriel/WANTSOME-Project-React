import { Link, Route, Routes, NavLink } from "react-router-dom"
import {Login, SignUp, Dashboard, CategoryPage, Checkout, ProductPage, SearchPage, NotFound} from "./Pages"
import NavigationBar from './Components/ReusableComponents/NavigationBar/NavigationBar'
import "./SCSS/index.scss"
import Footer from "./Components/ReusableComponents/Footer/Footer"

function App() {

  // Right now if you want to render the generated looped items from  categories you need to reload page, you might need to think about another way of doing this

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/categoryPage/:id/*" element={<CategoryPage />} />
        <Route path="/productPage/:id" element={<ProductPage />} />
        <Route path="/search/:id" element={<SearchPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>


      <Footer/>
    </>
  )
}

export default App
