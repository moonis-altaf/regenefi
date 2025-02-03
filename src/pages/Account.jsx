import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import OrderDetails from '../components/OrderDetails';
import AddressManagement from '../components/AddressManagement';
import ProfileManagement from '../components/ProfileManagement';

const Account = () => {
  const navigate = useNavigate();
  const { customer, loading, error, logout, isAuthenticated } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);

  console.log('Account page state:', { customer, loading, error, isAuthenticated });

  // Redirect to auth if not authenticated and not loading
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-reginify-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-reginify-navy/20 border-l-reginify-navy rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-reginify-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p>Error loading account: {error}</p>
          <button
            onClick={() => navigate('/auth')}
            className="mt-4 px-4 py-2 bg-reginify-navy text-white rounded-lg"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // If not authenticated and not loading, redirect will happen via useEffect
  if (!customer) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'fulfilled':
        return 'text-green-600';
      case 'unfulfilled':
        return 'text-yellow-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-reginify-navy/70';
    }
  };

  return (
    <div className="min-h-screen bg-reginify-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Profile Info */}
          <div className="bg-white rounded-xl shadow-sm border border-reginify-gold/10 p-6">
            <ProfileManagement />
            <button
              onClick={logout}
              className="w-full mt-6 flex items-center justify-center space-x-2 px-4 py-2 border border-reginify-gold/10 rounded-lg text-reginify-navy hover:bg-reginify-cream transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Address Management */}
          <div className="bg-white rounded-xl shadow-sm border border-reginify-gold/10 p-6">
            <AddressManagement />
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-reginify-gold/10 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <ShoppingBagIcon className="h-6 w-6 text-reginify-navy" />
              <h2 className="text-lg font-medium text-reginify-navy">Orders</h2>
            </div>
            {customer.orders?.edges.length > 0 ? (
              <div className="space-y-4">
                {customer.orders.edges.map(({ node: order }) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-reginify-gold/10"
                  >
                    <div>
                      <p className="text-sm font-medium text-reginify-navy">
                        Order #{order.orderNumber}
                      </p>
                      <p className="text-sm text-reginify-navy/70">
                        {new Date(order.processedAt).toLocaleDateString()}
                      </p>
                      <p className={`text-sm mt-1 ${getStatusColor(order.fulfillmentStatus || 'UNFULFILLED')}`}>
                        {order.fulfillmentStatus || 'Processing'}
                      </p>
                      {order.statusUrl && (
                        <a
                          href={order.statusUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-reginify-gold hover:text-reginify-gold/80 mt-1 block"
                        >
                          View on Shopify
                        </a>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-reginify-navy">
                          ${parseFloat(order.totalPriceV2.amount).toFixed(2)} {order.totalPriceV2.currencyCode}
                        </p>
                        <p className="text-sm text-reginify-navy/70">
                          {order.lineItems.edges.reduce((total, { node }) => total + node.quantity, 0)} items
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          console.log('Opening order details:', order.id);
                          setSelectedOrder(order.id);
                        }}
                        className="flex items-center space-x-1 text-reginify-navy/70 hover:text-reginify-navy"
                      >
                        <EyeIcon className="h-5 w-5" />
                        <span className="text-sm">View Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-reginify-navy/70 py-8">
                No orders yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Account;
