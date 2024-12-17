FROM node:22
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install -g bun && bun install
COPY . .
RUN bun run build:css
EXPOSE 3000
CMD ["bun", "app.js"]