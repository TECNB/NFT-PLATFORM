import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://124.220.75.222:8080',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // 显示请求代理后的真实地址

      },
      '/tencent-api': {
        target: 'https://aiart.tencentcloudapi.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tencent-api/, ''),
      },
      '/tencent-download-api': {
        target: 'https://aiart-1258344699.cos.ap-guangzhou.myqcloud.com/text_to_img',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tencent-download-api/, ''),
      },
      '/sd-api': {
        target: 'http://10.248.68.50:7860/sdapi/v1/txt2img',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sd-api/, ''),
      },
      // 'https://tec-1312799453.cos.ap-shanghai.myqcloud.com': {
      //   target: 'https://tec-1312799453.cos.ap-shanghai.myqcloud.com',
      //   changeOrigin: true,
      //   // rewrite: (path) => path.replace(/^https:\/\/tec-1312799453.cos.ap-shanghai.myqcloud.com/, ''),
      // },
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }

})
