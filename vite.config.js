import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'), // Alias for src directory
      '@assets': path.resolve(__dirname, './src/assets'), // Alias for assets directory
    },
  },
});