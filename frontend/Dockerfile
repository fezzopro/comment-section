FROM node

WORKDIR /frontend
COPY package.json .

# install app dependencies
COPY package.json ./frontend/package.json
COPY package-lock.json ./frontend/package-lock.json
RUN npm install
RUN npm audit fix --force

# add app
COPY . ./
ENV NODE_ENV development
EXPOSE 4000

# start app
CMD ["npm", "run", "start"] 
