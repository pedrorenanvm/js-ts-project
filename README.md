<div align="center">
  <h1 align="center">CompassCar API - Challenge #2</h1>
 
  <p align="center">
   This project is the second challenge of the internship program <br>
   <b>"Back-end Journey (Node.js) - AWS Cloud Context"</b>, offered by <a href="https://compass.uol/en/home/">Compass UOL</a>. 
   <br>A REST API for managing  a car purchase system, with CRUD operations for users, customers, cars and orders.<br> 
  </p>
</div>

---    

## 📋 Table of Contents

<!--ts-->
   * [Features](#-features)
   * [Installation](#-installation)
   * [Running](#-running)
   * [Technologies](#-technologies)
   * [Authors](#-authors)
   * [License](#-license)
<!--te-->

---

## ✨ Features

- [x] User authentication with email and password;
- [x] JWT-based authorization;
- [x] User Management (CRUD);
- [x] Customer Management (CRUD);
- [x] Car Management (CRUD);
- [x] Order Management (CRUD).

---

## ⚙ Installation

### Prerequisites

Before installing the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-started/get-docker/git)
  

### How To Install

1. Clone the repository:

```bash
  git clone https://github.com/geyseevelyn/AWS_NODE_SET24_DESAFIO_02_BREAKING_NODE.git
```

2. Navigate to the project directory:
   
 ```bash
  cd ~/[folder-of-choice]/AWS_NODE_SET24_DESAFIO_02_BREAKING_NODE
```

3. Install the dependencies:
   
```bash
  npm install
```
---

## ⚡ Running

1. Configure environment Variables:
     
- Create a `.env` file at root directory and configure like this:
   ```
   DB_HOST= localhost
   DB_PORT= <database port>
   DB_USER= <your-user>
   DB_PASS= <your-passwrd>
   DB_NAME= compass_car
   JWT_SECRET= <string of your choice>
   JWT_EXPIRES_IN= (10min)
   ```
- You can use .env-example on root directory, just rename to .env

2. Run the Docker container:
   
```bash
  docker compose up -d
```

3. Run the application:
   
```bash
  npm run dev
```

4. Run database migrations:

```bash
  npm run dev typeorm migration:run
```
   
5. Create deafult user (admin):

```bash
   npx ts-node -r tsconfig-paths/register src/seeds/createAdminSeed.ts
```
---

## 🛠 Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgresSQL](https://www.postgresql.org/download/))
- [TypeORM](https://typeorm.io/)
- [Postman](https://www.postman.com/)

---

 ## 👩‍💻 Authors

- [Breno Kauã](https://github.com/BrenoKFA)
- [Geyse Evelyn](https://github.com/geyseevelyn)
- [Marcos Adriano](https://github.com/imasdavid)
- [Pedro Renan](https://github.com/pedrorenanvm)

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
