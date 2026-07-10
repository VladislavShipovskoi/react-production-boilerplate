# 🚀 React Production Boilerplate

A modern, scalable, and enterprise-ready React application template built from scratch. 
This boilerplate avoids the black-box abstraction of Create React App (CRA) and provides full control over the build process, developer experience, and deployment pipeline.

## 🛠 Tech Stack & Features

* **Core:** React 18 + TypeScript (v6)
* **Bundler:** Webpack 5 + Babel (Highly optimized, modular configuration)
* **Code Quality:** ESLint (v8) + Prettier (Strict rules with auto-formatting)
* **Git Hooks:** Husky + lint-staged (Prevents bad commits)
* **Testing:** Jest + React Testing Library (Pre-configured for DOM testing)
* **Containerization:** Docker (Multi-stage build with Nginx for ultra-lightweight images)
* **CI/CD:** GitHub Actions (Automated linting, testing, and build checks on push/PR)

## 🎯 Why this template?
This setup is designed for developers and teams who need a robust foundation for commercial projects. It ensures:
1. **Consistency:** Everyone on the team writes code in the exact same style.
2. **Safety:** Broken code or failing tests will never reach the `main` branch.
3. **Performance:** The output is minimized, chunked, and ready to be served via an optimized Nginx container.

## 📦 Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/your-username/react-production-boilerplate.git my-app
cd my-app

# 2. Install dependencies
npm install

# 3. Start development server
npm start
