# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /be-app

# Copy the rest of the application code to the container
COPY . /be-app

# Install any necessary dependencies
RUN npm install

# Compile TypeScript code into JavaScript
RUN npm run build

# Define the command to start the app
CMD [ "npm", "run", "start"]