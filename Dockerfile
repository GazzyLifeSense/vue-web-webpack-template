# 基础pnpm环境构建
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
COPY package.json /app/
RUN npm install corepack@latest -g && corepack enable

# 依赖构建
FROM base AS deps
# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
COPY package.json pnpm-lock.yaml /app/
# 此时，如果 pnpm.lock 内容没有变化，则不会重新依赖安装
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 打包构建
FROM deps AS build
COPY . /app 
RUN pnpm run build

# 使用node部署（体积大）
# FROM base AS deploy
# COPY --from=build /app/dist /app/dist
# CMD npx serve -s dist
# EXPOSE 3000

# 使用nginx部署（体积小）
FROM nginx:alpine AS deploy
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html