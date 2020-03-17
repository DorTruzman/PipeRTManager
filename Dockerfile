FROM node:10-alpine
    
# Create app directory
WORKDIR /usr/src/app

# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

WORKDIR /usr/src/app/pipertmngr-client

RUN npm install

CMD [ "npm", "start" ]