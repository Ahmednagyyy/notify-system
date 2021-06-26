FROM node:14

# Create app directory
RUN mkdir -p /notification-service

WORKDIR /notification-service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN rm -rf node_modules && yarn install --check-files --non-interactive --ignore-optional --frozen-lockfile
RUN yarn global add nodemon sequelize-cli typescript pm2 node-pre-gyp

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "run" ]

