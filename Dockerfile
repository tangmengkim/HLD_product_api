# Use Node.js LTS version
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . .

# Expose the application port (e.g., 3000)
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
