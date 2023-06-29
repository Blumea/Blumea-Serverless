# Blumea Serverless sample base image: akashchouhan16/blumea_serverless:1.0.0.RELEASE

# Import from base image node:slim
FROM node:slim

# Set working directory
WORKDIR /blumea_serverless
# Copy pwd to the working directory
COPY . /blumea_serverless

# Install dependencies for the node application
RUN npm install
# Expose PORT 5000 for the app
EXPOSE 5000
# run application
CMD ["node", "index.js"]
