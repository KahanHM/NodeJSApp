# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Stage 2: Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/index.js ./
COPY --from=builder /usr/src/app/.env ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
