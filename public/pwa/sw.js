if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const o=e=>i(e,n),d={module:{uri:n},exports:t,require:o};s[n]=Promise.all(a.map((e=>d[e]||o(e)))).then((e=>(c(...e),t)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"15f0fd8499e85f67d058920256329209"},{url:"/_next/static/FHZ9KToP5eC5i2d6c9DKb/_buildManifest.js",revision:"cbe37854b6b919c76d3d3d353b24cd85"},{url:"/_next/static/FHZ9KToP5eC5i2d6c9DKb/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/287-a889cbe6499426f1.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/429-42c923c5476cfa17.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/590-eaf03b659bc3df21.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/613-e3d07ff61b8cfa59.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/632-7083cdd69b1bfdc5.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/654-7b5d66dc8d4e643b.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/671-8d3f7ce4c8955418.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/(detail)/albums/%5Bid%5D/page-63add2296ac8f076.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/(detail)/artists/%5Bid%5D/page-39aa1d0b4b99349f.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/(detail)/layout-cdc626f88987b3ff.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/(detail)/playlists/%5Bid%5D/page-e701ced308b4797a.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/_not-found/page-f3bf9801bf1fa23f.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/error-1d63e814d47ff4f7.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/layout-9ff0c24067ab2397.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/loading-87197d08b113bd8d.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/page-d19b3c1b424d1e71.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/search/@albums/page-d53075c83473ca06.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/search/@artists/page-71545cfe4118efa8.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/search/@playlists/page-a1aa95be34f32697.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/search/@songs/page-4d7bb5f19ef8bacb.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/app/search/layout-1b6543c86a528dc8.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/d24d231d-107489d139236c4e.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/framework-6e06c675866dc992.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/main-65814c78af83ed63.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/main-app-fea98d2b40f23bf7.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/pages/_app-352fb401ab678b78.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/pages/_error-a7bac88e914bc0c2.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-b99e7d97aa3a4a1b.js",revision:"FHZ9KToP5eC5i2d6c9DKb"},{url:"/_next/static/css/b37ba7ac6225cc24.css",revision:"b37ba7ac6225cc24"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/favicon.1963c552.ico",revision:"d337bbe3e6536e8dfde0f9ddab0559f0"},{url:"/icons/favicon.png",revision:"d337bbe3e6536e8dfde0f9ddab0559f0"},{url:"/pwa/manifest.json",revision:"e6c37b873d3b4593a45f28611a1de58f"},{url:"/pwa/sw.js",revision:"0c5a0f04d07fe06438a192a44b951dec"},{url:"/pwa/workbox-e9849328.js",revision:"77267fbe26ca3f6782e18069ae893d9c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));