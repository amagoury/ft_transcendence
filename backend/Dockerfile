FROM node:20-alpine

WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source
COPY . .

# Generate Prisma client if schema exists (Phase 2)
# RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev"]
