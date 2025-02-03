import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries';
import { motion } from 'framer-motion';

export default function Products() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return (
    <div className="min-h-screen bg-reginify-cream p-8">
      <div className="container mx-auto">
        <div className="text-center py-20">
          <div className="animate-pulse text-xl text-reginify-navy">Loading products...</div>
        </div>
      </div>
    </div>
  );

  if (error) {
    console.error('Products Query Error:', error);
    return (
      <div className="min-h-screen bg-reginify-cream p-8">
        <div className="container mx-auto">
          <div className="text-center py-20 text-red-600">
            <p>Error loading products. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-reginify-cream">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-reginify-navy mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Products
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our collection of premium hair care products
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.products.edges.map(({ node }, index) => (
            <motion.div
              key={node.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {node.images?.edges[0] && (
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={node.images.edges[0].node.originalSrc}
                    alt={node.images.edges[0].node.altText || node.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-reginify-navy mb-2">{node.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{node.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-reginify-navy">
                    ${parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2)} {node.priceRange.minVariantPrice.currencyCode}
                  </span>
                  <button 
                    className="bg-reginify-navy text-white px-4 py-2 rounded-lg hover:bg-reginify-navy/90 transition-colors duration-300"
                    onClick={() => {/* TODO: Add to cart functionality */}}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
