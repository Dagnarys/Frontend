import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  find: /^~(.*)$/,
  server:{
    proxy:{
      '/api':'http://localhost:8000'
    },
  },


  
  replacement: '$1',
  base: '/SPA/'
})
