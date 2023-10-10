import { useRef, useState } from "react"
import { Link, Route, Routes, NavLink, useLocation } from "react-router-dom"
import {Login, SignUp, Dashboard, CategoryPage, Checkout, ProductPage, SearchPage, NotFound} from "./Pages"
import NavigationBar from './Components/ReusableComponents/NavigationBar/NavigationBar'
import Footer from "./Components/ReusableComponents/Footer/Footer"
import getCartLength from "./Components/ReusableComponents/Functions/getCartLength"
import "./SCSS/index.scss"
import { useEffect } from "react"

const App = () => {
  const [cartCounter, setCartCounter] = useState(0)
  const location = useLocation()
  const isSignInPage = location.pathname !== "/login" && location.pathname !== "/registration"
  const isSearchPage = location.pathname.split("/")[1]




  useEffect(() => {
    setCartCounter(getCartLength())
    
    if (isSearchPage !== "search" && isSearchPage !== "productPage") {
      localStorage.removeItem("filters")
      console.log(isSearchPage)
    }

  }, [])

  const updateCounter = (num, operation) => {

    if(operation === "-"){
      setCartCounter(cartCounter - num)

    } else {
      setCartCounter(cartCounter + num)
    }
  }
    
  // Right now if you want to render the generated looped items from  categories you need to reload page, you might need to think about another way of doing this

  return (
    <>
      {isSignInPage && (
        <NavigationBar
          cartCounter={cartCounter}
          updateCounter={updateCounter}
          setCartCounter={setCartCounter}
        />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/categoryPage/:id/*" element={<CategoryPage />} />
        <Route
          path="/productPage/:id"
          element={<ProductPage updateCounter={updateCounter} />}
        />
        <Route
          path="/search/:id"
          element={<SearchPage updateCounter={updateCounter} />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isSignInPage && <Footer />}
    </>
  )
}

export default App
