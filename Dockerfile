# Use the official Node.js 14 image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Expose port 3000 to access the app
EXPOSE 3000

# Command to start the Node.js app
CMD ["npm", "start"]
