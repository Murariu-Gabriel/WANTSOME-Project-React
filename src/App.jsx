import { useState } from "react"
import { Link, Route, Routes, NavLink, useLocation } from "react-router-dom"
import {Login, SignUp, Dashboard, CategoryPage, Checkout, ProductPage, SearchPage, NotFound} from "./Pages"
import NavigationBar from './Components/ReusableComponents/NavigationBar/NavigationBar'
import Footer from "./Components/ReusableComponents/Footer/Footer"
import "./SCSS/index.scss"

const App = () => {
   const location = useLocation()

   const isSignInPage = location.pathname !== "/login" && location.pathname !== "/registration"

    
  // Right now if you want to render the generated looped items from  categories you need to reload page, you might need to think about another way of doing this

  return (
    <>
      {isSignInPage && <NavigationBar />}

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

      {isSignInPage && <Footer />}
    </>
  )
}

export default App
