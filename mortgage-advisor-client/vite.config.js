import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path'; 
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: '[name]',
    }),
    react()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@access', replacement: fileURLToPath(new URL('./src/access', import.meta.url)) },
      // Add more alias mappings as needed...
    ],
  },
});
