import { useState } from 'react'
import { Link, Route, Routes, NavLink } from "react-router-dom"
import {Login, SignUp, Dashboard, CategoryPage, Checkout, ProductPage, SearchPage, NotFound} from "./Pages"
import NavigationBar from './Components/ReusableComponents/NavigationBar'
import "./SCSS/index.scss"

function App() {

  return (
    <>
     
      <NavigationBar/>
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categoryPage/:id/*" element={<CategoryPage />} />
        <Route path="/productPage/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
