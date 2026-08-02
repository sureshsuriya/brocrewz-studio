# Changelog

All notable changes to the BroCrewz Studio project will be documented in this file.

## [1.0.0] - Production Ready - 2026-08-02

### Added
- **Full Stack Architecture:** Initialized a Monorepo containing the React Vite frontend and Spring Boot 3 backend.
- **Database:** MySQL database integration with Hibernate ORM. Added `init.sql` for automated database seeding.
- **Security:** JWT-based authentication system with BCrypt password encoding for secure Admin access.
- **Frontend Theme:** Implemented a luxury Black & Gold Glassmorphism design system using Tailwind CSS v4.
- **Pages (Public):**
  - Parallax Home Page with animated statistics
  - About Us Page detailing agency mission
  - Services & Pricing Page with highlighted Monthly Plans
  - Meet The Team Page pulling dynamic data from backend API
  - Portfolio gallery with category filtering
  - Contact Page integrated with WhatsApp, Mail, and Instagram links
- **Pages (Admin):**
  - Secure Login Portal
  - Protected Admin Dashboard for CRUD management of Services, Team, Portfolio, and Messages.
- **DevOps:**
  - `Dockerfile` configurations for both Backend (Maven/Alpine) and Frontend (Node/Nginx)
  - `docker-compose.yml` for unified local deployment
  - GitHub Actions CI/CD Pipeline (`main.yml`) for automated builds and testing.
- **Documentation:**
  - Developer Information setup in README and footer.
  - Image assets placement guide (`public/assets/README.md`)
  - Postman API Collection for REST API testing.

### Fixed
- Migrated legacy PostCSS setup to natively support Tailwind CSS v4 via `@tailwindcss/postcss`.
- Resolved TypeScript strict null checks and unused variables in contact forms.
- Configured dedicated `application-test.properties` with an H2 in-memory database to allow `mvn test` execution without a live MySQL host.

### Optimized
- Enhanced SEO and Accessibility markers.
- Implemented Lazy Loading constraints via Vite bundling.
- Configured Nginx try_files directive for React Router SPA fallbacks.
