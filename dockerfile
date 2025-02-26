FROM node:18

# Set working directory
WORKDIR /app

COPY backend/package.json backend/package-lock.json /app/backend/
COPY frontend/package.json frontend/package-lock.json /app/frontend/

# Copy only package.json files first to leverage Docker caching
COPY backend/package.json frontend/package.json ./

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --only=production

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Copy the rest of the project files
WORKDIR /app
COPY backend backend/
COPY frontend frontend/

# Build the frontend
WORKDIR /app/frontend
RUN npm run build

# Move build files to backend's static directory (adjust if needed)
WORKDIR /app/backend
RUN mkdir -p public && cp -r /app/backend/build/* public/

# Expose port
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
