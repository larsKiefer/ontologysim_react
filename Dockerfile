# pull official base image
FROM node:16.13.2-alpine3.14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm cache clean --force
RUN npm install --save-dev  --unsafe-perm node-sass -g
RUN npm rebuild node-sass
RUN npm install react-scripts@4.0.3 -g --silent
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]