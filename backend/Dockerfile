FROM node:20-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

ENV NODE_ENV=production
# Cloud Run sets PORT; default to 8080 for local container runs
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
