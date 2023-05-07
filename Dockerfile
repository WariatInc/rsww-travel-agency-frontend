# Use an official Node runtime as a parent image
FROM node:latest as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies

# Install dependencies using Yarn
RUN npm install

# Install the latest version of the Angular CLI
RUN npm install -g @angular/cli@latest

# RUN npm ci && npm cache clean --force

# RUN npm install
# RUN npm install -g npm-check
# RUN npm-check -u

# Copy the entire application to the container
COPY . .


# Use an official Nginx runtime as a parent image
#FROM nginx:alpine

# Copy the build output to replace the default Nginx contents
#COPY --from=build /app/dist/my-app /usr/share/nginx/html

# Expose port 80
#EXPOSE 80

# Start Nginx

#CMD ["nginx", "-g", "daemon off;"]

# Build the application

#RUN npm run build --prod
# FROM nginx:latest

# COPY --from=build /app/src/app /usr/share/nginx/html

# COPY nginx.conf  /etc/nginx/conf.d/default.conf
# EXPOSE 4200
RUN npm run build
# CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]


# Serve Application using Nginx Server
FROM nginx:alpine
COPY nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/src/app /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]