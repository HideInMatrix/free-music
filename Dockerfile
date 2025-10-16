# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS app

# 设置工作目录
WORKDIR /app

# 使用 corepack 管理 pnpm 版本（更稳定）
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# 复制 package.json 和 pnpm-lock.yaml 文件
COPY package.json pnpm-lock.yaml* ./

# 安装依赖，利用 Docker 缓存
RUN pnpm install

# 复制源码
COPY . .

# 构建项目
RUN pnpm build

# 清理缓存，减少镜像体积
RUN pnpm store prune && rm -rf /tmp/*

# 开放 Vite Preview 默认端口
EXPOSE 4173

# 使用 pnpm preview 启动服务
CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "4173"]
