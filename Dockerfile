# Use a Node.js base image
   FROM node:14

   # Set the working directory in the container
   WORKDIR /app

   # Copy package.json and package-lock.json to the working directory
   COPY package*.json ./

   # Install dependencies
   RUN npm ci --only=production

   # Copy the rest of the application code
   COPY . .

   # Expose the port your application is listening on (if necessary)
   EXPOSE 3000

   # Start the application
   CMD [ "node", "index.js" ]
