// Shopify Configuration
export const SHOPIFY_CONFIG = {
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-01' // Latest API version
};

// GraphQL endpoint
export const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;
