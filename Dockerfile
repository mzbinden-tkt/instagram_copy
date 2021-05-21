FROM node:12

WORKDIR /usr/src/app

EXPOSE 3000
COPY package.json .
RUN npm install --production
COPY . .
 
CMD [ "npm", "start" ]