FROM node:19-alpine3.15
COPY package.json /app/package.json
RUN cd /app && npm i
COPY . /app/
WORKDIR /app
CMD ["npm",  "run", "prod"]