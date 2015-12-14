# Set the base image to Ubuntu
FROM node:latest

# File Author / Maintainer
MAINTAINER Julien Garcia Gonzaelz

# Install nodemon
RUN npm install -g nodemon

# Define working directory
WORKDIR /src
ADD . /src
RUN npm install

# Expose port
EXPOSE  8080

# Run app using nodemon
CMD ["nodemon", "/src/index.js"]