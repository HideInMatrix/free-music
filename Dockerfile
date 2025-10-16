# 使用官方 Node.js 镜像作为基础镜像
FROM node:24.10.0-alpine

# 设置工作目录
WORKDIR /app

# 复制项目的 package.json 和 package-lock.json (或 yarn.lock) 文件到容器中
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制整个项目到容器中
COPY . .

# 构建 React 项目
RUN npm run build

# 安装 Nginx 用于服务化静态文件
FROM nginx:alpine

# 删除默认的 Nginx 配置
RUN rm -rf /usr/share/nginx/html/*

# 将构建好的 React 项目静态文件复制到 Nginx 目录中
COPY --from=0 /app/build /usr/share/nginx/html

# 暴露 Nginx 端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
