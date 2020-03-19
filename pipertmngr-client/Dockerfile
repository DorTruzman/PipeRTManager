FROM node:12-alpine3.11
    
# Create app directory
WORKDIR /usr/src/app

# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

# WORKDIR /usr/src/app/pipertmngr-client

RUN npm install

CMD [ "npm", "start" ]