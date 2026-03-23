import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import Navbar      from './components/layout/Navbar'
import Footer      from './components/layout/Footer'
import CartSidebar from './components/layout/CartSidebar'
import Home          from './pages/Home'
import Shop          from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart          from './pages/Cart'
import Checkout      from './pages/Checkout'
import Login         from './pages/Login'
import Register      from './pages/Register'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home />} />
        <Route path="/shop"       element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart"       element={<Cart />} />
        <Route path="/checkout"   element={<Checkout />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/register"   element={<Register />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <Navbar />
        <CartSidebar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
