FROM node:8
RUN npm install pm2 -g

RUN mkdir -p /usr/src/phones
WORKDIR /usr/src/phones

COPY package.json /usr/src/phones
COPY package-lock.json /usr/src/phones
RUN npm install
COPY . /usr/src/phones
EXPOSE 3002
CMD ["npm", "start"]