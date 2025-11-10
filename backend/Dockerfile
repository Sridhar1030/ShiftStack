# Use lightweight Node image
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Set environment
ENV NODE_ENV=production
EXPOSE 5000

# Run the app
CMD ["node", "index.js"]
