FROM node:14.17.0-alpine3.12

WORKDIR /usr/src/app

RUN npm install --global pm2

COPY package*.json yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 3000

CMD [ "pm2-runtime", "npm", "--", "start" ]