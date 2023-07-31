import { Link, Route, Routes, NavLink } from "react-router-dom"
import {Login, SignUp, Dashboard, CategoryPage, Checkout, ProductPage, SearchPage, NotFound} from "./Pages"
import NavigationBar from './Components/ReusableComponents/NavigationBar/NavigationBar'
import "./SCSS/index.scss"

function App() {

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
    </>
  )
}

export default App
