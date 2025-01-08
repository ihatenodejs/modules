FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build:css
EXPOSE 3000
CMD ["bun", "run", "app.js"]