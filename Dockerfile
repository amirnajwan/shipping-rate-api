# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install NestJS CLI globally (if needed)
RUN npm install -g @nestjs/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:prod"]
