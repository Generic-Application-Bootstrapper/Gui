FROM node:13.12.0-alpine

RUN apk add curl bash git tar unzip nodejs
RUN npm i
RUN npm run start

ENTRYPOINT ["/bin/bash"]