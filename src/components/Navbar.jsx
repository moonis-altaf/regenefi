import { Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  ShoppingBagIcon, 
  BuildingStorefrontIcon,
  HomeIcon,
  BeakerIcon,
  NewspaperIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { getCartCount } = useCart();
  const { isAuthenticated, customer } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const accountLink = isAuthenticated ? '/account' : '/auth';
  const accountText = isAuthenticated ? (customer?.firstName || 'Account') : 'Sign In';

  const menuItems = [
    { to: '/', icon: HomeIcon, text: 'Home' },
    { to: '/product/test', icon: BeakerIcon, text: 'Hair Oil' },
    { to: '/blog', icon: NewspaperIcon, text: 'Blog' },
    { to: '/wholesale', icon: BuildingStorefrontIcon, text: 'Wholesale' },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/images/logo.png" 
              alt="Regenefi Logo" 
              className="h-12 w-auto"
            />
            <span className="text-2xl font-light text-reginify-navy">REGENEFI</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-12">
              {menuItems.map((item) => (
                <Link 
                  key={item.to}
                  to={item.to} 
                  className="flex items-center space-x-2 text-reginify-navy/70 hover:text-reginify-navy text-sm uppercase tracking-wider transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>

            {/* Desktop Cart and Account Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                to={accountLink}
                className="text-reginify-navy/70 hover:text-reginify-navy transition-colors"
                aria-label={accountText}
              >
                <UserIcon className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/cart" 
                className="text-reginify-navy/70 hover:text-reginify-navy transition-colors"
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingBagIcon className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-reginify-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-none border-none outline-none focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className="block h-0.5 w-full bg-reginify-navy/70"></span>
                <span className="block h-0.5 w-full bg-reginify-navy/70"></span>
                <span className="block h-0.5 w-full bg-reginify-navy/70"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-reginify-navy/70 hover:text-reginify-navy"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 py-6 overflow-y-auto">
            {/* Account and Cart Buttons */}
            <div className="px-6 space-y-3 mb-8">
              <Link 
                to={accountLink}
                className="flex items-center justify-between w-full px-4 py-3 bg-reginify-gold/10 rounded-lg
                         text-reginify-gold hover:bg-reginify-gold hover:text-white transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-sm font-medium uppercase tracking-wider">{accountText}</span>
                <UserIcon className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center justify-between w-full px-4 py-3 bg-reginify-navy/5 rounded-lg
                         text-reginify-navy hover:bg-reginify-navy/10 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-sm font-medium uppercase tracking-wider">Cart</span>
                <div className="relative">
                  <ShoppingBagIcon className="h-5 w-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-reginify-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 w-full mb-6" />

            {/* Navigation Links */}
            <div className="px-6 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-3 text-reginify-navy/70 hover:text-reginify-navy hover:bg-gray-50
                           text-sm uppercase tracking-wider transition-colors px-4 py-3 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
