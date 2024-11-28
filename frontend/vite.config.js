// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginRequire from "vite-plugin-require";


// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(),
        vitePluginRequire.default(),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // Your backend server URL
                changeOrigin: true,
                secure: false, // If using HTTPS, set to true
            },
        },
    },

})