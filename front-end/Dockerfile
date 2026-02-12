FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application
COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
