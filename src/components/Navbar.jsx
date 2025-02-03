import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accountLink = isAuthenticated ? '/account' : '/auth';
  const accountText = isAuthenticated ? (customer?.firstName || 'Account') : 'Sign In';

  const menuItems = [
    { to: '/', icon: HomeIcon, text: 'Home' },
    { to: '/product/test', icon: BeakerIcon, text: 'Hair Oil' },
    { to: '/blog', icon: NewspaperIcon, text: 'Blog' },
    { to: '/wholesale', icon: BuildingStorefrontIcon, text: 'Wholesale' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
                    ${isScrolled 
                      ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
                      : 'bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden">
              <img 
                src="/images/logo.png" 
                alt="Regenefi Logo" 
                className="h-12 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-reginify-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>
            <span className="text-2xl font-light text-reginify-navy relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-reginify-gold after:transition-all after:duration-300 group-hover:after:w-full">
              REGENEFI
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-12">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link 
                    key={item.to}
                    to={item.to} 
                    className={`group flex flex-col items-center relative py-2
                              ${isActive ? 'text-reginify-navy' : 'text-reginify-navy/70 hover:text-reginify-navy'}`}
                  >
                    <div className="flex items-center space-x-2 text-sm uppercase tracking-wider transition-colors">
                      <item.icon className={`h-5 w-5 transform transition-transform duration-300 group-hover:scale-110 
                                          ${isActive ? 'text-reginify-gold' : 'group-hover:text-reginify-gold'}`} />
                      <span>{item.text}</span>
                    </div>
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-reginify-gold transform origin-left transition-transform duration-300
                                  ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Cart and Account Icons */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                to={accountLink}
                className="relative group p-2 text-reginify-navy/70 hover:text-reginify-navy transition-colors"
                aria-label={accountText}
              >
                <UserIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-reginify-gold/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
              
              <Link 
                to="/cart" 
                className="relative group p-2 text-reginify-navy/70 hover:text-reginify-navy transition-colors"
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingBagIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:scale-110" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-reginify-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center
                                   transform transition-transform duration-300 group-hover:scale-110">
                      {getCartCount()}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-reginify-gold/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-reginify-gold/10 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className="block h-0.5 w-full bg-reginify-navy/70 transition-transform duration-300"></span>
                <span className="block h-0.5 w-full bg-reginify-navy/70 transition-transform duration-300"></span>
                <span className="block h-0.5 w-full bg-reginify-navy/70 transition-transform duration-300"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-72 bg-white/95 backdrop-blur-lg shadow-2xl flex flex-col">
          <div className="p-4 border-b border-gray-200/50">
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-reginify-navy/70 hover:text-reginify-navy p-2 hover:bg-reginify-gold/10 rounded-full transition-colors duration-300"
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
                className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-reginify-gold/10 to-reginify-gold/5 rounded-lg
                         text-reginify-gold hover:from-reginify-gold hover:to-reginify-gold hover:text-white transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-sm font-medium uppercase tracking-wider">{accountText}</span>
                <UserIcon className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-reginify-navy/10 to-reginify-navy/5 rounded-lg
                         text-reginify-navy hover:bg-reginify-navy/15 transition-all duration-300"
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
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent w-full mb-6" />

            {/* Navigation Links */}
            <div className="px-6 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 text-reginify-navy/70 hover:text-reginify-navy
                             text-sm uppercase tracking-wider transition-all duration-300 px-4 py-3 rounded-lg
                             ${isActive ? 'bg-reginify-gold/10 text-reginify-navy' : 'hover:bg-gray-50'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-reginify-gold' : ''}`} />
                    <span>{item.text}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
