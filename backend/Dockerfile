FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci 

# --- Stage 2: runtime ---
FROM node:18-alpine AS runtime
WORKDIR /app

# Run as a non-root user rather than the image's default root.
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ARG PORT=5000
ARG MONGO_URI=""
ARG SERVER_URL=""
ENV PORT=${PORT} \
    MONGO_URI=${MONGO_URI} \
    SERVER_URL=${SERVER_URL} \
    NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=appuser:appgroup . .

USER appuser
EXPOSE 5000

CMD ["node", "server.js"]
