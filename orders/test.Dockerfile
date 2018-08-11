FROM node:8

RUN mkdir -p /usr/src/phones-test
WORKDIR /usr/src/phones-test

COPY package.json /usr/src/phones-test
COPY package-lock.json /usr/src/phones-test
RUN npm install
COPY . /usr/src/phones-test
# Override the NODE_ENV environment variable to 'dev', in order to get required test packages
ENV NODE_ENV development
# 1. Get test packages; AND
# 2. Install our test framework - mocha
RUN npm update && npm install -g mocha
# Override the command, to run the test instead of the application
CMD ["mocha", "--reporter", "list", "tests"]