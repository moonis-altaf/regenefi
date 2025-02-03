import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CART, ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, GET_CART } from '../graphql/queries';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(() => localStorage.getItem('shopifyCartId'));
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  // Mutations
  const [createCart] = useMutation(CREATE_CART);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [updateCart] = useMutation(UPDATE_CART);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);

  // Query cart data
  const { refetch: refetchCart } = useQuery(GET_CART, {
    variables: { cartId },
    skip: !cartId,
    onCompleted: (data) => {
      if (data?.cart) {
        setCart(data.cart.lines.edges.map(edge => edge.node));
        setCheckoutUrl(data.cart.checkoutUrl);
      }
    }
  });

  // Initialize cart
  const initializeCart = async () => {
    try {
      setLoading(true);
      const { data } = await createCart();
      if (data?.cartCreate?.cart) {
        const newCartId = data.cartCreate.cart.id;
        setCartId(newCartId);
        setCheckoutUrl(data.cartCreate.cart.checkoutUrl);
        localStorage.setItem('shopifyCartId', newCartId);
        return newCartId;
      }
    } catch (err) {
      console.error('Failed to create cart:', err);
      setError('Failed to create cart');
    } finally {
      setLoading(false);
    }
  };

  // Initialize cart on mount if needed
  useEffect(() => {
    if (!cartId) {
      initializeCart();
    }
  }, []);

  // Add item to cart
  const addItem = async (variantId, quantity = 1) => {
    try {
      setLoading(true);
      let currentCartId = cartId;
      
      if (!currentCartId) {
        currentCartId = await initializeCart();
      }

      // Ensure quantity is a positive integer
      const quantityToAdd = Math.max(1, Math.floor(Number(quantity)));
      console.log('Adding to cart:', {
        cartId: currentCartId,
        variantId,
        quantity: quantityToAdd
      });

      // Add new item
      const { data } = await addToCart({
        variables: {
          cartId: currentCartId,
          lines: [{
            merchandiseId: variantId,
            quantity: quantityToAdd
          }]
        }
      });

      if (data?.cartLinesAdd?.cart) {
        const newCart = data.cartLinesAdd.cart.lines.edges.map(edge => ({
          ...edge.node,
          quantity: edge.node.merchandise.id === variantId ? quantityToAdd : edge.node.quantity
        }));
        console.log('New cart after add:', newCart);
        setCart(newCart);
        setCheckoutUrl(data.cartLinesAdd.cart.checkoutUrl);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to add item:', err);
      setError('Failed to add item to cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update cart state directly (for local updates)
  const updateCartState = (newCart) => {
    setCart(newCart);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.merchandise.priceV2.amount);
      return total + (price * item.quantity);
    }, 0);
  };

  // Get cart item count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        checkoutUrl,
        addItem,
        updateCartState,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
