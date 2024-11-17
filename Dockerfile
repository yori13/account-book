# Step 1: Build React app
FROM node:18 AS build

WORKDIR /app
COPY react/package.json react/package-lock.json ./
RUN npm install
COPY react ./
RUN npm run build

# Step 2: Set up NGINX to serve the built React app
FROM nginx:1.25

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

