FROM node:8
RUN npm install pm2 -g

RUN mkdir -p /usr/src/orders
WORKDIR /usr/src/orders

COPY package.json /usr/src/orders
COPY package-lock.json /usr/src/orders
RUN npm install
COPY . /usr/src/orders
EXPOSE 3002
CMD ["npm", "start"]