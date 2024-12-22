FROM oven/bun:latest AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

FROM oven/bun:latest
WORKDIR /app
RUN apt-get update && apt-get install -y curl # For healthchecks
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]
