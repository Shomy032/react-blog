FROM node:12

WORKDIR / //add path to app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD [ "npm" , "start" ]
