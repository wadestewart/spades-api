FROM arm32v6/node:16.14-alpine

# Create app directory
WORKDIR /src
ENV REACT_APP_SPADES_CLIENT=
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY server.js .
EXPOSE 3050
EXPOSE 3051
CMD [ "node", "server.js" ]
