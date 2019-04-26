# trivia service
# node

  # DEFAULT
  # FROM node

# gCloud
FROM node

# Set the working directory to /app
WORKDIR /server

  # DEFAULT
  # COPY package*.json ./

# gCloud
COPY package*.json ./



# Install any needed node dependencies
RUN npm install

# Bundle app source
COPY . .

# Make port 4000 available to the world outside this container

  # gcloud port expose not necessary
  # EXPOSE 4000
ENV PORT 8080

# Run server.js when the container launches
CMD ["npm", "run" ,"server-prod"]