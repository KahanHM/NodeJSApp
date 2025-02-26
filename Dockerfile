# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

# Stage 2: Production
FROM node:18-alpine
WORKDIR /usr/src/app
# Copy necessary files from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/index.js .
COPY --from=builder /usr/src/app/printFolderStructure.js .
COPY --from=builder /usr/src/app/models ./models
COPY --from=builder /usr/src/app/routes ./routes
COPY --from=builder /usr/src/app/.env .env

# Install npm in the final stage Alpine Image doesn't contain npm package
RUN apk add --no-cache npm



EXPOSE 3000
CMD ["npm", "start"]
