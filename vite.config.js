import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    fs: {
      strict: true,
    }
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#3A78F5',
          'border-radius-base': '5px',
          // LAYOUT-SIDER
          'layout-sider-background': '#2D3446',
          'menu-dark-bg': '#2D3446',
          'menu-dark-inline-submenu-bg': '#2a2f3c',
          'menu-dark-item-active-bg': '#1F2431',
          'layout-trigger-background': '#1F2431',
        },
        javascriptEnabled: true,
      },
    },
  },
})
