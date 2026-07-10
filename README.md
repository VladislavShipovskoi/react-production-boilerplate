# 🚀 React Production Boilerplate

A modern, scalable, and enterprise-ready React application template built from scratch.
This boilerplate avoids the black-box abstraction of Create React App (CRA) and provides full control over the build process, developer experience, and deployment pipeline.

## 🛠 Tech Stack & Features

- **Core:** React 18 + TypeScript (v6)
- **Bundler:** Webpack 5 + Babel (Highly optimized, modular configuration)
- **Code Quality:** ESLint (v8) + Prettier (Strict rules with auto-formatting & Windows CRLF safety)
- **Git Hooks:** Husky + lint-staged (Prevents bad commits)
- **Testing:** Jest + React Testing Library (Pre-configured for DOM testing and asset mocking)
- **Containerization:** Docker (Multi-stage build with Nginx for ultra-lightweight images)
- **CI/CD:** GitHub Actions (Automated linting, testing, build checks, and SSH deployment)

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) (v24+) and/or [Docker](https://www.docker.com/) installed.

### 1. Project Initialization

```bash
# Clone the repository (or download template)
git clone https://github.com/your-username/react-production-boilerplate.git my-app
cd my-app
```

---

### 2. Local Development (Without Docker)

Use this mode if you have Node.js installed locally and want maximum speed.

```bash
# Install dependencies
npm install

# Run development server with Hot Module Replacement (HMR)
npm start
```

👉 Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 3. Development inside Docker (With HMR)

Use this mode if you don't want to install Node.js locally. Your code changes will still update the page instantly thanks to volume mapping and file polling.

```bash
# Start development container (auto-rebuilds image on config changes)
docker-compose -f docker-compose.dev.yml up --build
```

👉 Open [http://localhost:3000](http://localhost:3000) in your browser.

_To stop the dev container:_

```bash
docker-compose -f docker-compose.dev.yml down
```

---

### 4. Production Deployment via Docker (Nginx served)

Use this mode to test how your application will run on a real production server. It compiles the static files and serves them via an optimized, lightweight Nginx Alpine container.

```bash
# Build and run production container in the background (detached mode)
docker-compose -f docker-compose.prod.yml up -d --build
```

👉 Open [http://localhost](http://localhost) (or `http://localhost:80`) in your browser.

_To stop the production container:_

```bash
docker-compose -f docker-compose.prod.yml down
```

---

## 🌐 CI/CD & Continuous Deployment (CD) Setup

The project is pre-configured with a fully automated deployment pipeline inside `.github/workflows/deploy.yml`.
Every time you push code to the `main` branch, GitHub Actions will:

1. Run ESLint checks and Jest unit tests.
2. Build a production Docker image and push it to **Docker Hub**.
3. Establish a secure **SSH connection** to your remote VPS server.
4. Pull the newly created image, stop the old container, and start the updated one on port `8080` (or your chosen port).

### 🔑 Configuration Steps

#### 1. Configure GitHub Secrets

Go to your GitHub Repository ➔ **Settings** ➔ **Secrets and variables** ➔ **Actions** ➔ **New repository secret** and add the following variables:

| Secret Name           | Description                                          | Example / Format                         |
| :-------------------- | :--------------------------------------------------- | :--------------------------------------- |
| `SSH_HOST`            | Your remote VPS IP address                           | `192.168.1.100`                          |
| `SSH_USERNAME`        | SSH login user on the VPS                            | `root` or `deploy`                       |
| `SSH_PRIVATE_KEY`     | The **private** SSH key (content of `~/.ssh/id_rsa`) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `DOCKER_HUB_USERNAME` | Your Docker Hub account username                     | `yourusername`                           |
| `DOCKER_HUB_TOKEN`    | Docker Hub Access Token (PAT)                        | `dckr_pat_...`                           |

#### 2. Prepare Your VPS Server

SSH into your remote server and install Docker if it is not already installed:

```bash
# Update and install Docker
sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

# (Optional) Allow running Docker without sudo
sudo usermod -aG docker $USER
```

Once configured, pushing code to the `main` branch will automatically deploy your application to your server within minutes!

---

## 🧪 Other Utility Commands

- **Run Linting & Formatting:**

  ```bash
  npm run lint
  ```

  _(Checks and automatically fixes styling/linting errors using ESLint & Prettier)_

- **Run Tests:**

  ```bash
  npm run test
  ```

  _(Runs Jest test suite in watch mode)_

- **Manual Build:**
  ```bash
  npm run build
  ```
  _(Compiles production bundles locally into the `/dist` directory)_

---

## 📐 Gatekeeper Pipeline (CI/CD)

We maintain a strict quality gate to prevent broken code from reaching the main branch:

1. **Local Commit:** Husky blocks commits via `lint-staged` if your code has unresolved linting/formatting issues.
2. **Pull Request:** GitHub Actions runs ESLint, Jest tests, and a production build. The PR cannot be merged if any check fails.
