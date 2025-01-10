FROM oven/bun:latest
WORKDIR /app
RUN bun install
COPY package.json bun.lockb ./
COPY . .
RUN bun run build:css
EXPOSE 3000
CMD ["bun", "run", "app.js"]
