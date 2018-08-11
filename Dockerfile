FROM node:boron
RUN npm install pm2 -g

WORKDIR /usr/src/phones
COPY phones/package.json /usr/src/phones
COPY phones/package-lock.json /usr/src/phones
RUN npm install
COPY phones/ /usr/src/phones
EXPOSE 3001

WORKDIR /usr/src/orders
COPY orders/package.json /usr/src/orders
COPY orders/package-lock.json /usr/src/orders
RUN npm install
COPY orders/ /usr/src/orders
EXPOSE 3002

EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
CMD ["pm2-docker", "start", "process.json"]