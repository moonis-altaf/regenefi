import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { SHOPIFY_CONFIG, SHOPIFY_GRAPHQL_URL } from '../config/shopify';

// Log configuration
console.log('Shopify Configuration:', {
  url: SHOPIFY_GRAPHQL_URL,
  hasToken: !!SHOPIFY_CONFIG.storefrontAccessToken,
  domain: SHOPIFY_CONFIG.domain
});

// Create HTTP link with detailed error handling
const httpLink = createHttpLink({
  uri: SHOPIFY_GRAPHQL_URL,
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
    'Content-Type': 'application/json',
  },
  fetch: async (uri, options) => {
    try {
      const response = await fetch(uri, options);
      if (!response.ok) {
        console.error('Shopify API Error:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });
      }
      return response;
    } catch (error) {
      console.error('Shopify Fetch Error:', error);
      throw error;
    }
  }
});

// Create Apollo Client with detailed error handling
export const shopifyClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
