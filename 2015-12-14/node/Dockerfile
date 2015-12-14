# Set the base image to Ubuntu
FROM node:latest

# File Author / Maintainer
MAINTAINER Julien Garcia Gonzaelz

# Install nodemon
RUN npm install -g nodemon

WORKDIR /src

ADD package.json /src/package.json
# Define working directory
RUN npm install
ADD . /src


# Expose port
EXPOSE  8080

# Run app using nodemon
CMD ["nodemon", "/src/index.js"]