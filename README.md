# 🧪 Playwright Test Automation Framework – Jenkins CI Integrated

This repository contains a Playwright (JavaScript) end-to-end test automation framework integrated with Jenkins CI.\
The framework is designed so that every push to the master branch automatically triggers a Jenkins pipeline, builds the project, and runs the automated tests.

📌 This project is part of my QA Automation portfolio and was built for real-world CI/CD demonstration.

## 🚀 Tech Stack
  - Language: JavaScript (Node.js)
  - Automation Tool: Playwright
  - Test Runner: Playwright Test
  - Design Pattern: Page Object Model (POM)
  - CI Tool: Jenkins
  - Containerization: Docker
  - Reporting: Playwright HTML Report
  - Version Control: Git / GitHub

## 📁 Project Structure 
```pgsql
  saucelab_demotest/
  │
  ├── pages/                  # Page Object Model
  │   ├── login.page.js
  │   └── inventory.page.js
  │
  ├── tests/                  # Test specifications
  │   ├── login.spec.js
  │   └── inventory-page.spec.js
  │
  ├── playwright.config.js    # Playwright configuration
  ├── Dockerfile              # Docker image definition
  ├── Jenkinsfile             # Jenkins pipeline configuration
  ├── package.json
  └── README.md
  ```

## 🔁 CI/CD Workflow (High Level)

  1. Developer pushes code to master branch\
  2. GitHub webhook triggers Jenkins\
  3. Jenkins pipeline:\
      Checks out latest code\
      Builds Docker image\
      Runs Playwright tests inside Docker\
      Publishes test results
  4. Pipeline status reflects test success/failure
  
  ✔ Fully automated\
  ✔ CI-ready\
  ✔ Reproducible execution using Docker\


##🐳 Dockerized Test Execution
The project uses the official Playwright Docker image, which includes:\
  - Node.js\
  - Playwright\
  - Chromium\
  - All required system dependencies

**Dockerfile**
  ```dockerfile
  FROM mcr.microsoft.com/playwright:v1.58.1-jammy
  WORKDIR /app
  
  COPY package.json package-lock.json ./
  RUN npm ci
  
  COPY . .
  
  CMD ["npx", "playwright", "test"]
  ```

### 🔍 Dockerfile Explanation
  ```
  FROM mcr.microsoft.com/playwright:v1.58.1-jammy	#Uses the official Playwright image with browsers pre-installed
  WORKDIR /app	#Sets the working directory inside the container
  COPY package.json package-lock.json ./	#Copies dependency files first to leverage Docker layer caching
  RUN npm ci	#Installs dependencies in a clean, reproducible way
  COPY . .	#Copies test code, configs, and page objects
  CMD ["npx", "playwright", "test"]	#Runs Playwright tests when the container starts
  ```
**📌 Tests automatically execute when the Docker container runs
**
Build Docker Image\
  ```docker build -t dharanigone/saucelab_demotest .```

Run Tests\
  ```docker run --rm dharanigone/saucelab_demotest```

## 🔁 Jenkins CI Pipeline (Exact Behavior)
The Jenkins pipeline is defined in Jenkinsfile and consists of two stages.

**📌 Trigger
**
Jenkins is connected to GitHub via webhook\
Every push to the master branch triggers the pipeline automatically

### 1️⃣ Run Playwright Tests
  ```jenkinsfile
  stage('Run Playwright Tests') {
    steps {
      sh '''
        docker build -t dharanigone/saucelab_demotest .
        docker run --rm \
          -e baseURL=https://www.saucedemo.com \
          dharanigone/saucelab_demotest
      '''
    }
  }
  ```
  
  What this stage does:\
   - Builds a Docker image using the provided Dockerfile\
   - Runs Playwright tests inside the container\
   - Passes baseURL as an environment variable\
   - Executes tests in headless mode\
   - Returns exit code to Jenkins (pass/fail)

📌 The baseURL is consumed inside ```playwright.config.js``` for environment-based execution.

###2️⃣ Archive Playwright Report
  ```jenkisfile
  stage('Archive Report') {
    steps {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
  ```

What this stage does:\
 - Archives the Playwright HTML report generated during execution\
 - Makes reports available as Jenkins build artifacts\
 - Allows pipeline to continue even if the report folder is empty

## 📊 Test Reporting
  - Playwright generates an HTML report in the playwright-report/ directory after test execution\
  - Jenkins archives the report as a build artifact for every pipeline run\
  - Reports can be downloaded and viewed from the Jenkins job page

### 🔍 View Report Locally from Terminal
If the playwright-report/ folder is available on your local machine, the report can be viewed directly from the terminal using:\
  ```bash
  npm run report
  ```
  This command:\
   1. Starts a local server\
   2. Opens the Playwright HTML report in the browser\
   3. Allows easy inspection of test results, steps, and failures

## ⚙️ Configuration
  - baseURL is injected at runtime using Jenkins environment variables\
  - Browser settings and timeouts are defined in playwright.config.js\
  - Docker ensures consistent execution across all environments

## 📌 Author
Dharani Gone\
QA Engineer

#Test webhooks 
