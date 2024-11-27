# STAGE 1: BUILD STAGE
# Use an official Node.js runtime as a parent image
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the TypeScript configuration file explicitly
COPY tsconfig.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
RUN npm run build

# STAGE 2: RUN-TIME STAGE
FROM node:20 AS runtime

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist /app/dist   
COPY --from=build /app/package*.json ./ 

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Set the PATH to include the global npm bin directory
ENV PATH="/usr/local/bin:${PATH}"

# Copy .env file
COPY .env ./

# Expose the ports the app runs on
EXPOSE 3000 3001 3002 3003 3004 3005

# Command to run the application
CMD ["npm", "start"]

