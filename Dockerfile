FROM whastings/node_with_nvm:latest

# Use npm 2 for now until the issue with npm 3 is resolved:
# https://github.com/npm/npm/issues/9863
RUN mv /usr/local/nvm/versions/node/v5.1.1/lib/node_modules/npm \
  /usr/local/nvm/versions/node/v5.1.1/lib/node_modules/npm-3
RUN node /usr/local/nvm/versions/node/v5.1.1/lib/node_modules/npm-3/bin/npm-cli.js \
  install -g npm@2

# Install dependencies.
WORKDIR /
# package-json-to-docker
RUN npm install @whastings/css_utils@0.0.2
RUN npm install @whastings/js_utils@^0.1.0
RUN npm install broccoli@^0.16.7
RUN npm install broccoli-eyeglass@^1.2.1
RUN npm install broccoli-md@^0.2.0
RUN npm install broccoli-merge-trees@^0.2.3
RUN npm install broccoli-stew@^0.3.5
RUN npm install broccoli-watched-tree@^0.1.2
RUN npm install broccoli-webpack-fast@^1.0.1
RUN npm install co@^4.6.0
RUN npm install denodeify@^1.2.1
RUN npm install express@^4.13.3
RUN npm install express-handlebars@^2.0.1
RUN npm install normalize.scss@^0.1.0
RUN npm install page@^1.6.4
RUN npm install pg@^4.4.3
RUN npm install pg-hstore@^2.3.2
RUN npm install react@^0.14.0
RUN npm install react-dom@^0.14.0
RUN npm install rimraf@^2.4.3
RUN npm install sequelize@^3.18.0
RUN npm install sequelize-cli@^2.2.1
RUN npm install webpack@^1.12.2
RUN npm install babel-core@^6.4.0
RUN npm install babel-loader@^6.2.1
RUN npm install babel-plugin-transform-es2015-modules-commonjs@^6.4.0
RUN npm install babel-preset-es2015@^6.3.13
RUN npm install babel-preset-es2015-node5@^1.1.1
RUN npm install babel-preset-react@^6.3.13
RUN npm install babel-resolver@0.0.18
RUN npm install bcrypt@^0.8.5
RUN npm install body-parser@^1.14.2
RUN npm install cookie-parser@^1.4.0
RUN npm install copy-dereference@^1.0.0
RUN npm install nodemon@^1.8.1
RUN npm install redux@^3.0.5
RUN npm install redux-promise-middleware@^2.3.2
RUN npm install seamless-immutable@^4.1.1
RUN npm install tiny-lr@^0.1.6
RUN npm install uid-safe@^2.0.0

ADD ./package.json package.json
RUN npm install
RUN cp -r /node_modules/babel-preset-es2015/node_modules/* /node_modules

# Start app.
RUN mkdir /app
WORKDIR /app
CMD ["npm", "run", "start-dev"]
