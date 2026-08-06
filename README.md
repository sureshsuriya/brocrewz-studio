# BroCrewz Studio

A premium, full-stack video editing agency platform for managing client projects, team workflows, and delivery — built with a React frontend, a Spring Boot backend, and a Docker-based deployment pipeline.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS (Glassmorphism theme), Framer Motion |
| **Backend** | Java 21, Spring Boot 3, Spring Security, JWT, MySQL |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

---

## Project Structure

```
brocrewz-studio/
├── frontend/            # React application
├── backend/              # Spring Boot application
├── docker-compose.yml    # Root orchestration file
└── README.md
```

---

## Prerequisites

- **Java 21** (JDK)
- **Node.js 18+** and npm
- **Docker** and **Docker Compose**
- **MySQL 8+** — only needed if running the backend outside Docker

---

## Getting Started

**1. Clone the repository**
```bash
git clone <repository-url>
cd brocrewz-studio
```

**2. Configure environment variables**
```bash
cp .env.example .env
```
Fill in the values described under [Configuration](#configuration) below.

**3. Run with Docker Compose**
```bash
docker-compose up --build
```

**4. Access the app**

| Service | URL |
|---|---|
| Frontend (Docker) | http://localhost:80 |
| Frontend (Vite dev server) | http://localhost:5173 |
| Backend API | http://localhost:8080 |

---

## Configuration

Set these in your `.env` file — never commit real values to version control:

| Variable | Description |
|---|---|
| `DB_URL` | MySQL connection URL |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `JWT_EXPIRATION` | Token expiry time, in ms |
| `ADMIN_EMAIL` | Seeded admin account email |
| `ADMIN_PASSWORD` | Seeded admin account password |

---

## Admin Access

An admin account is seeded on first run from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env` file.

> ⚠️ Set a strong, unique password before deploying anywhere shared or public, and change it immediately after first login. Never leave example or default credentials active in production.

---

## Screenshots

*Add a hero screenshot or short demo GIF here — worth showing off given the glassmorphism UI and Framer Motion transitions.*

---

## License

Not yet licensed — pick based on how this project will be used:
- **Portfolio piece / open-source:** MIT is a common, permissive default.
- **Client or commercial product:** mark it proprietary ("All rights reserved") instead, since an open license would let anyone reuse the code commercially.

---

## Developer Information

- **Developed By:** Suresh P
- **Role:** Java Full Stack Developer
- **Email:** sureshsurey4@gmail.com
- **GitHub:** [github.com/sureshsuriya](https://github.com/sureshsuriya)
- **LinkedIn:** [linkedin.com/in/suresh-p-822b43230](https://www.linkedin.com/in/suresh-p-822b43230/)
- **Portfolio:** [suresh-portfolio-blush.vercel.app](https://suresh-portfolio-blush.vercel.app/)

## Developer & Leadership

**Suresh P** — *Operations Manager & Web Lead*

Suresh P oversees operations and leads development of BroCrewz Studio's digital platform — planning, designing, and managing the website while ensuring a modern user experience, reliable backend architecture, and continuous improvements to the company's online presence.

**Responsibilities:**
- Operations Management
- Website Planning & Strategy
- UI/UX Design
- Frontend Development
- Backend Development
- Database Management
- Performance Optimization
- Technical Leadership
