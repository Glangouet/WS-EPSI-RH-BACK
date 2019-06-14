FROM node:6

EXPOSE 8095

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app/

CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "prod" ]
