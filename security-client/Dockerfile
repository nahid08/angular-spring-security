# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14-alpine as build

# Set the working directory
WORKDIR '/app'

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80