import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries';

export default function ShopifyTest() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  // Detailed logging
  console.log('Shopify Connection Details:', {
    loading,
    error,
    data,
    hasData: !!data,
    hasProducts: data?.products ? 'yes' : 'no',
    edges: data?.products?.edges?.length,
    config: {
      domain: process.env.REACT_APP_SHOPIFY_STORE_DOMAIN,
      // Don't log the full token for security
      hasToken: !!process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  });

  if (loading) return (
    <div className="p-4 text-center">
      <p className="text-lg">Loading products...</p>
    </div>
  );

  if (error) {
    console.error('Shopify Query Error:', error);
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Error loading products: {error.message}</p>
        <pre className="mt-2 text-left text-sm bg-gray-100 p-2 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  // More detailed check for data
  if (!data) {
    return (
      <div className="p-4 text-center">
        <p className="text-yellow-600">No data received from Shopify</p>
      </div>
    );
  }

  if (!data.products) {
    return (
      <div className="p-4 text-center">
        <p className="text-yellow-600">No products field in response</p>
      </div>
    );
  }

  if (!data.products.edges || data.products.edges.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-yellow-600">No products found. This might be because:</p>
        <ul className="mt-2 list-disc list-inside">
          <li>Products are not published to the sales channel</li>
          <li>Products are in draft status</li>
          <li>No products have been created yet</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products from Shopify:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.products.edges.map(({ node }) => (
          <div key={node.id} className="border p-4 rounded-lg">
            <h3 className="font-bold">{node.title}</h3>
            {node.images?.edges[0] && (
              <img 
                src={node.images.edges[0].node.originalSrc} 
                alt={node.images.edges[0].node.altText || node.title}
                className="w-full h-48 object-cover rounded mt-2"
              />
            )}
            <p className="text-gray-600 mt-2">
              {node.priceRange.minVariantPrice.amount} {node.priceRange.minVariantPrice.currencyCode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
