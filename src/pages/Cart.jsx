import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBagIcon, 
  XMarkIcon, 
  ArrowLeftIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const itemPrice = parseFloat(item.merchandise.priceV2.amount);
  const itemTotal = (itemPrice * item.quantity).toFixed(2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative flex flex-col sm:flex-row items-start gap-4 p-4 bg-white rounded-2xl shadow-sm
                 border border-gray-100 hover:border-gray-200 transition-colors duration-200"
    >
      {/* Product Image */}
      <div className="relative group w-full sm:w-24 h-32 sm:h-24 rounded-xl overflow-hidden bg-gray-50">
        <img
          src={item.merchandise.product.images.edges[0]?.node.originalSrc}
          alt={item.merchandise.product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
      </div>

      {/* Product Details */}
      <div className="flex-grow space-y-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-garet text-lg text-gray-900">
              {item.merchandise.product.title}
            </h3>
            <p className="text-sm text-gray-500">
              {item.merchandise.title}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full
                     hover:bg-red-50"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2">
            <button
              onClick={() => onQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full
                       text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50
                       disabled:cursor-not-allowed transition-all duration-200"
            >
              <span className="text-xl font-medium select-none">−</span>
            </button>
            <span className="w-10 text-center font-medium text-gray-900 select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantityChange(item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full
                       text-gray-500 hover:text-gray-700 hover:bg-gray-100
                       transition-all duration-200"
            >
              <span className="text-xl font-medium select-none">+</span>
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-garet text-gray-900">£{itemTotal}</p>
            <p className="text-sm text-gray-500">£{itemPrice} each</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Cart = () => {
  const { cart: initialCart, checkoutUrl, updateCartState } = useCart();
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    setCart(updatedCart);
    updateCartState(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    updateCartState(updatedCart);
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.merchandise.priceV2.amount);
    return total + (price * item.quantity);
  }, 0);

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const shippingThreshold = 50;
  const freeShippingEligible = cartTotal >= shippingThreshold;

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-2xl font-garet text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium 
                       rounded-full shadow-sm text-white bg-reginify-navy hover:bg-reginify-navy/90 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-reginify-navy
                       transition-all duration-200"
            >
              <ArrowLeftIcon className="mr-2 -ml-1 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Free Shipping Banner */}
        <div className="mb-8">
          {freeShippingEligible ? (
            <div className="bg-green-50 rounded-xl p-4 flex items-center justify-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              <p className="text-green-700 font-medium">
                Congratulations! You've qualified for free shipping
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TruckIcon className="h-5 w-5 text-blue-500" />
                <p className="text-blue-700 font-medium">
                  Add £{(shippingThreshold - cartTotal).toFixed(2)} more for free shipping
                </p>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(cartTotal / shippingThreshold) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-garet text-gray-900">Shopping Cart</h1>
              <span className="text-gray-500">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0">
            <div className="sticky top-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-garet text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>{freeShippingEligible ? 'Free' : 'Calculated at checkout'}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <span className="text-gray-900 font-medium">Total</span>
                    <span className="text-xl font-garet text-gray-900">
                      £{cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <a
                  href={`${checkoutUrl}?cart_total=${cartTotal.toFixed(2)}`}
                  className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent
                           text-base font-medium rounded-full shadow-sm text-white bg-reginify-navy 
                           hover:bg-reginify-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-reginify-navy transition-all duration-200 relative group"
                >
                  <span>Proceed to Checkout</span>
                  <ChevronRightIcon className="ml-2 -mr-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <Link
                  to="/"
                  className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300
                           text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                           transition-all duration-200"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TruckIcon className="h-5 w-5 text-blue-500" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
