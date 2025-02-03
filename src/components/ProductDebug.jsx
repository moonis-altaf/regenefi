import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries';

export default function ProductDebug() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  console.log('Product Debug Data:', data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2>Product Debug Info:</h2>
      {data?.products?.edges.map(({ node }) => (
        <div key={node.id} className="mb-4 p-4 border rounded">
          <p><strong>Title:</strong> {node.title}</p>
          <p><strong>Handle:</strong> {node.handle}</p>
          <p><strong>ID:</strong> {node.id}</p>
          <p><strong>Description:</strong> {node.description}</p>
          <p><strong>Available:</strong> {node.availableForSale ? 'Yes' : 'No'}</p>
          <p><strong>Price:</strong> {node.priceRange.minVariantPrice.amount} {node.priceRange.minVariantPrice.currencyCode}</p>
          <p><strong>Product URL:</strong> /product/{node.handle}</p>
        </div>
      ))}
    </div>
  );
}
