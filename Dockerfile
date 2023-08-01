# Use the official Node.js 18 image
FROM node:18.16.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Expose port 3000 to access the app
EXPOSE 3000

# Command to start Redis server and Node.js app
CMD ["bash", "-c", "redis-server & npm start"]
