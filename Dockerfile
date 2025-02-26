FROM oven/bun:latest@sha256:1ab5cdebde9995e8221290c13c89a473840b53131170951c63c2359b980208d0 AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

FROM oven/bun:latest@sha256:1ab5cdebde9995e8221290c13c89a473840b53131170951c63c2359b980208d0
WORKDIR /app
RUN apt-get update && apt-get install -y curl # For healthchecks
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "start"]
