FROM whastings/node_with_nvm:latest

# Install dependencies.
WORKDIR /
ADD ./package.json package.json
RUN npm install

# Start app.
RUN mkdir /app
WORKDIR /app
CMD ["node", "--harmony", "index.js"]
