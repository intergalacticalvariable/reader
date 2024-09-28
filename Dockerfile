# Use Node.js 18 slim image (Debian-based)
FROM node:18-slim

# Install necessary tools and libraries
RUN apt-get update && apt-get install -y \
    chromium \
    libmagic-dev \
    build-essential \
    python3 \
    wget \
    gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/functions/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY backend/functions .

# Build the application
RUN npm run build

# Create local storage directory and set permissions
RUN mkdir -p /app/local-storage && chmod 777 /app/local-storage

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build/server.js"]
