# Use the production image as base image
FROM capitolemicroservices_phones
# Override the NODE_ENV environment variable to 'dev', in order to get required test packages
ENV NODE_ENV development
# 1. Get test packages; AND
# 2. Install our test framework - mocha
RUN npm update && npm install -g mocha
CMD ["mocha",  "--reporter", "list","--timeout", "5000", "tests"]