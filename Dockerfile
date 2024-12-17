FROM node:22
WORKDIR /app
COPY package.json ./
RUN npm install -g bun && bun install
COPY . .
RUN npm run build:css
EXPOSE 3000
CMD ["node", "app.js"]