# LaraFeed

A full-stack, Twitter/X-style social media platform built with **Laravel 13**, **React** and **Inertia.js**. Server-side logic lives in Laravel, client-side interactivity lives in React and Inertia glues them together seamlessly.

Fully containerized with **Docker & Docker Compose** for a consistent, one-command local development environment.

## Features

- 🔐 **Authentication & Authorization** - registration, login, logout and Laravel policies to ensure users can only edit their own content
- 📝 **Posts & Replies** - full CRUD with validation, Twitter-style threaded replies
- ❤️ **Likes** - heart/like system with optimistic UI updates for instant feedback
- ♾️ **Infinite Scroll** - cursor-based pagination for smooth, performant feeds
- 🔄 **Real-Time Polling** - new content updates without a manual refresh

## Tech Stack

| Layer          | Technology                              |
|----------------|-----------------------------------------|
| Backend        | Laravel 13                              |
| Frontend       | React + TypeScript                      |
| Bridge         | Inertia.js                              |
| Styling        | Tailwind CSS v4, shadcn/ui              |
| Routing        | Laravel Wayfinder                       |
| Debugging      | Laravel Telescope                       |
| Database       | MySQL (via Docker)                      |
| Web Server     | Nginx (via Docker)                      |
| Infrastructure | Docker & Docker Compose                 |

## Architecture

The app runs across four containers plus a host-based frontend toolchain:

| Service      | Container             | Purpose                          | Port                      |
|--------------|-----------------------|----------------------------------|---------------------------|
| `nginx`      | `larafeed_nginx`      | Web server                       | `8876` → `80`             |
| `app`        | `larafeed_app`        | PHP-FPM (Laravel)                | -                         |
| `db`         | `larafeed_db`         | MySQL                            | `8101` → `3306`           |
| `phpmyadmin` | `larafeed_phpmyadmin` | Database GUI                     | `8102` → `80`             |

**Note:** Node/npm run directly on the **host machine**, not in a container. PHP and MySQL are containerized (to guarantee consistent versions/extensions across machines) but the frontend build toolchain (Vite, npm) runs locally for faster HMR and simpler tooling. This means:
- `php artisan` commands → run via `docker exec -it larafeed_app php artisan ...`
- `npm` commands → run directly, no Docker prefix

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (v24+) and npm (installed locally)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/constaleks/LaraFeed.git
   cd larafeed
   ```

2. **Copy the environment file**
   ```bash
   cp .env.example .env
   ```

3. **Set your user/group IDs** (prevents file permission issues between the container and host)

   Add to `.env`:
   ```
   UID=1000
   GID=1000
   ```

4. **Build and start the containers**
   ```bash
   docker compose up -d
   ```

5. **Install PHP dependencies**
   ```bash
   docker exec -it larafeed_app composer install
   ```

6. **Generate the application key**
   ```bash
   docker exec -it larafeed_app artisan key:generate
   ```

7. **Run migrations (and seeders, if available)**
   ```bash
   docker exec -it larafeed_app artisan migrate --seed
   ```

8. **Install frontend dependencies and start Vite** (run locally, not in Docker)
   ```bash
   npm install
   npm run dev
   ```

## Roadmap & Ideas for Further Improvement

- [ ] Create posts, comments and likes
- [ ] Infinite scroll pagination with cursor-based pagination
- [ ] Real-time polling for new content updates
- [ ] Search functionality

## Contributing

This is a study project. Feel free to fork and experiment with the codebase.