FROM oven/bun:latest@sha256:29cebde0efcd19be4b1e1592d73cd21ccba93c1448b1cec172584738d74b7b80 AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

FROM oven/bun:latest@sha256:29cebde0efcd19be4b1e1592d73cd21ccba93c1448b1cec172584738d74b7b80
WORKDIR /app
RUN apt-get update && apt-get install -y curl # For healthchecks
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]
