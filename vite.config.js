import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load env file
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  optimizeDeps: {
    include: ['@apollo/client/core', '@apollo/client/cache'],
  },
  define: {
    'process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN': 
      JSON.stringify(process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN),
    'process.env.REACT_APP_SHOPIFY_STORE_DOMAIN': 
      JSON.stringify(process.env.REACT_APP_SHOPIFY_STORE_DOMAIN)
  }
})
