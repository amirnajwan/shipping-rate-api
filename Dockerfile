# Use an official Node.js image from the Docker Hub
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Print the Node.js version
RUN node -v

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (if your application runs on port 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
