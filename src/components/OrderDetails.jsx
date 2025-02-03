import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDER_DETAILS } from '../graphql/customerQueries';
import {
  ChevronLeftIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const OrderDetails = ({ orderId, onClose, onOrderUpdated }) => {
  const [showCancelInfo, setShowCancelInfo] = useState(false);
  const { data, loading, error: queryError } = useQuery(GET_ORDER_DETAILS, {
    variables: { id: orderId },
  });

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4">
          <div className="animate-spin h-8 w-8 border-4 border-reginify-navy/20 border-l-reginify-navy rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4">
          <div className="text-red-600 text-center">
            <p>Error loading order details.</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-reginify-navy text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const order = data?.node;
  if (!order) return null;

  const canCancel = order.fulfillmentStatus === 'UNFULFILLED';
  const orderDate = new Date(order.processedAt);
  const now = new Date();
  const hoursSinceOrder = (now - orderDate) / (1000 * 60 * 60);
  const isWithin24Hours = hoursSinceOrder <= 24;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="flex items-center text-reginify-navy/70 hover:text-reginify-navy"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Back to Orders
          </button>
          <h2 className="text-xl font-medium text-reginify-navy">
            Order #{order.orderNumber}
          </h2>
        </div>

        {/* Order Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-reginify-navy/70">
                Ordered on {orderDate.toLocaleDateString()}
              </p>
              <p className="text-sm font-medium text-reginify-navy mt-1">
                Total: ${parseFloat(order.totalPriceV2.amount).toFixed(2)} {order.totalPriceV2.currencyCode}
              </p>
              <p className="text-sm text-reginify-navy/70 mt-1">
                Status: {order.fulfillmentStatus || 'Processing'}
              </p>
            </div>
            {canCancel && isWithin24Hours && !showCancelInfo && (
              <button
                onClick={() => setShowCancelInfo(true)}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
              >
                <XMarkIcon className="h-5 w-5" />
                <span>Cancel Order</span>
              </button>
            )}
          </div>

          {/* Cancel Information */}
          {showCancelInfo && (
            <div className="bg-reginify-cream p-6 rounded-lg mb-4">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-reginify-navy mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-reginify-navy">
                    Need to cancel your order?
                  </h3>
                  <p className="mt-2 text-sm text-reginify-navy/80">
                    To cancel your order, please contact our customer service team immediately. Orders can typically only be cancelled within 24 hours of placement and if they haven't been shipped yet.
                  </p>
                  <div className="mt-4 space-y-3">
                    <a
                      href="mailto:support@reginify.com?subject=Cancel Order #{order.orderNumber}"
                      className="flex items-center space-x-2 text-reginify-gold hover:text-reginify-gold/80"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                      <span>support@reginify.com</span>
                    </a>
                    <p className="text-sm text-reginify-navy/70">
                      Please include your order number: #{order.orderNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCancelInfo(false)}
                    className="mt-4 text-sm text-reginify-navy/70 hover:text-reginify-navy"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div>
          <h3 className="text-lg font-medium text-reginify-navy mb-4">
            Order Items
          </h3>
          <div className="space-y-4">
            {order.lineItems.edges.map(({ node: item }) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 border border-reginify-gold/10 rounded-lg"
              >
                {item.variant?.image && (
                  <img
                    src={item.variant.image.url}
                    alt={item.variant.image.altText || item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-reginify-navy">{item.title}</p>
                  <p className="text-sm text-reginify-navy/70">
                    Quantity: {item.quantity}
                  </p>
                </div>
                {item.variant?.priceV2 && (
                  <p className="font-medium text-reginify-navy">
                    ${parseFloat(item.variant.priceV2.amount).toFixed(2)} {item.variant.priceV2.currencyCode}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        {order.shippingAddress && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-reginify-navy mb-4">
              Shipping Address
            </h3>
            <div className="p-4 border border-reginify-gold/10 rounded-lg">
              <p className="text-reginify-navy">{order.shippingAddress.address1}</p>
              {order.shippingAddress.address2 && (
                <p className="text-reginify-navy">{order.shippingAddress.address2}</p>
              )}
              <p className="text-reginify-navy">
                {order.shippingAddress.city}, {order.shippingAddress.province}{' '}
                {order.shippingAddress.zip}
              </p>
              <p className="text-reginify-navy">{order.shippingAddress.country}</p>
            </div>
          </div>
        )}

        {/* View on Shopify Link */}
        {order.statusUrl && (
          <div className="mt-8 text-center">
            <a
              href={order.statusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-reginify-gold hover:text-reginify-gold/80"
            >
              View Order on Shopify →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
