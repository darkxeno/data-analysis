FROM node:16.13.2-alpine3.15 as build-deps
ARG backendURL
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN REACT_APP_BACKEND_BASE_URL=$backendURL npm run build


FROM nginx:1.21-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]