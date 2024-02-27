# Use the official Node.js 21 image as a parent image
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
# If you're using yarn, you might want to copy yarn.lock instead
# COPY package.json yarn.lock ./

# Install dependencies
RUN npm install
# If you're using yarn, use the following command instead
# RUN yarn install

# Copy the rest of your app's source code
COPY . .

# Next.js collects telemetry data by default. The following line disables this feature.
ENV NEXT_TELEMETRY_DISABLED 1

# Build your app
# Uncomment the line below on production, comment it out on dev
# RUN npm run build 

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
# CMD ["npm", "start"]
CMD ["npm", "dev"]