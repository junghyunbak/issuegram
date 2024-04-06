FROM node:18.17.0

ENV TZ=Asia/Seoul

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY ../ ./

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]