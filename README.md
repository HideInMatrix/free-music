# 音乐地带项目

## 启动

```shell
pnpm install 

pnpm run dev
```

## 部署

```shell
// 修改next.config.mjs
// 如何不写output的话就表明构建一个混合页面应用程序
// 这个时候.next文件夹中构建出用于生产环境的应用程序
// 如果你使用了 next/image则需要安装sharp
pnpm install sharp

pnpm run build 

pnpm run start -p 8080 //不写端口默认就是3000

```

如果你需要构建一个最小的node.js应用，包括node_modules。

```shell
// 设置修改next.config.mjs，在nextConfig中加入 output: 'standalone',
pnpm run build 

// 你会在.next/standalone中看到生成的文件

node ./server.js
```

如果你需要一个纯静态的页面，也就是react/vue这种前后端分离的项目，那么修改next.config.mjs，在nextConfig中修改 output: 'export'
同时如果用到了动态路由什么的记得按照错误提示修改，例如 /[local]/login is missing "generateStaticParams()"

```shell
pnpm run build

// 生成的out文件夹丢到服务器上去，然后用nginx启动
```
