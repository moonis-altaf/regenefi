import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Wholesale from './pages/Wholesale'
import { CartProvider } from './context/CartContext'
import { ApolloProvider } from '@apollo/client';
import { shopifyClient } from './utils/shopifyClient';
import { AuthProvider } from './context/AuthContext'
import Auth from './pages/Auth'
import Account from './pages/Account'

function App() {
  return (
    <Router>
      <ApolloProvider client={shopifyClient}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow w-full pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:handle" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:handle" element={<BlogPost />} />
                  <Route path="/wholesale" element={<Wholesale />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ApolloProvider>
    </Router>
  )
}

export default App
