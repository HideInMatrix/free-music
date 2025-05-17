import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      mode: process.env ? "development" : "production",
      base: "/",
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*/, // 接口缓存 此处填你想缓存的接口正则匹配
            handler: "NetworkFirst",
            options: {
              cacheName: "interface-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts静态资源缓存
            handler: "NetworkFirst",
            options: {
              cacheName: "js-css-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(mp4)/, // 音乐缓存
            handler: "CacheFirst",
            options: {
              cacheName: "video-cache",
            },
          },
        ],
      },
      manifest: {
        name: "音乐地带",
        short_name: "music-web",
        description: "一个免费听歌的地方",
        start_url: "index.html",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "320x320",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    reportCompressedSize: true,
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
