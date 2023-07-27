import { useState } from 'react'
import { Link, Route, Routes, NavLink } from "react-router-dom"
import {Login, SignUp, Dashboard, CategoryPage, Checkout, ProductPage, SearchPage, NotFound} from "./Pages"
import "./SCSS/index.scss"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/categoryPage/smart-watch">watches</Link>
          </li>
          <li>
            <Link to="/categoryPage/smart-band">bands</Link>
          </li>
          <li>
            <Link to="/categoryPage/smart-strap">straps</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categoryPage/:id/*" element={<CategoryPage />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
