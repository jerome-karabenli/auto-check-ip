FROM node@sha256:5084395c093bf7b66f2f73f36bb309fd6814067414db8decfa323f064688b300

RUN apt-get update

RUN apt-get install -yyq chromium

RUN rm -rf /var/lib/apt/lists/*

WORKDIR /src

COPY ./package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]