# Stage 1: Build the NestJS app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the NestJS app
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --production
EXPOSE 3000
# CMD ["node", "dist/main"]
CMD ["npm", "run", "start:prod"]