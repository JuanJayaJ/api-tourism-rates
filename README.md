# Tourism Rates API

A production-ready backend API for managing tourism suppliers and rates.  
Built with **Node.js, Express, TypeScript, Prisma, PostgreSQL, Docker, Jest**.

---

## Features
- CRUD for **Suppliers** and **Rates**
- Input validation with **Zod**
- Centralized error handling & logging (Winston)
- Pagination & filtering
- Postgres with Prisma ORM
- Dockerized with multi-stage builds
- CI/CD with GitHub Actions
- Postman collection for easy testing

---

### Clone & setup
```bash
git clone https://github.com/JuanJayaJ/api-tourism-rates.git
cd api-tourism-rates
cp .env.example .env
