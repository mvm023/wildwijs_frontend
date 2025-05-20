# Wildwijs frontend

This is the frontend for wildwijs, a Duolingo-style quiz app about Dutch nature, built with React and Vite.

## Getting started

To get started, clone the directory, and run the following commands in the program directory:

#### 1. Install dependencies

npm install

#### 2. Create environment file

cp .env.example .env

#### 3. Generate HTTPS certificates for localhost

mkcert -install\
mkcert localhost


## Building locally

To build the frontend locally, run the following command in the program directory:

npm run dev

- The backend should now be running on https://127.0.0.1:5173.