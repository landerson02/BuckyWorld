# copies package.json & package-lock.json files over
# installs dependencies
# runs fronted on port 3000

FROM node:latest
WORKDIR /app
COPY package*.json ./ 
RUN npm install
COPY . .
RUN npm run build 
EXPOSE 3000
CMD ["npm", "start"] 

