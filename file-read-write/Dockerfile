FROM node:boron

MAINTAINER "Mustafa Dagdelen"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

RUN npm install pm2 -g 

# Bundle app source
COPY . /usr/src/app

ENV PORT 3010
EXPOSE 3010

CMD ["pm2-docker", "pm2.json", "--env", "production"]
