# Insecure Docker image usage
# No image scanning
# Using latest tags
# No multi-stage build optimization

# Using latest tag - insecure
FROM node:latest

# Hardcoded user
# Running as root - security risk
USER root

# No health check
# No proper error handling

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
# No caching optimization
# No security scanning of dependencies

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Hardcoded command
# No graceful shutdown handling
CMD ["node", "server.js"]

# No image labels for metadata
# No security scanning
# No vulnerability scanning

