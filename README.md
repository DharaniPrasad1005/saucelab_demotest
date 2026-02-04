# 🧪 Playwright Test Automation Framework

A comprehensive end-to-end test automation framework built with Playwright and JavaScript, featuring continuous integration through Jenkins. The framework automatically triggers test execution on every push to the master branch, ensuring consistent quality checks throughout the development lifecycle.

## 🚀 Tech Stack

- **Language**: JavaScript (Node.js)
- **Automation Tool**: Playwright
- **Test Runner**: Playwright Test
- **Design Pattern**: Page Object Model (POM)
- **CI/CD**: Jenkins
- **Containerization**: Docker
- **Reporting**: Playwright HTML Report
- **Version Control**: Git / GitHub

## 📁 Project Structure

```
saucelab_demotest/
│
├── pages/                  # Page Object Model classes
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

## 🔄 CI/CD Workflow

The framework follows a fully automated continuous integration approach:

1. **Code Push**: Developer commits and pushes code to the master branch
2. **Webhook Trigger**: GitHub webhook automatically notifies Jenkins
3. **Pipeline Execution**: Jenkins performs the following steps:
   - Checks out the latest code from the repository
   - Builds a fresh Docker image
   - Executes Playwright tests inside the containerized environment
   - Publishes test results and artifacts
4. **Status Update**: Pipeline reflects test execution status (success/failure)

**Key Benefits:**
- ✅ Fully automated testing on every commit
- ✅ CI-ready with minimal configuration
- ✅ Reproducible execution using Docker containers

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker (for containerized execution)
- Jenkins (for CI/CD integration)

### Local Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd saucelab_demotest

# Install dependencies
npm install

# Run tests locally
npm test
```

## 🐳 Docker

### Building the Docker Image

```bash
docker build -t dharanigone/saucelab_demotest .
```

### Running Tests in Docker

```bash
docker run --rm dharanigone/saucelab_demotest
```

The `--rm` flag automatically removes the container after test execution, keeping your environment clean.

## 🔧 Jenkins Pipeline

The Jenkins pipeline is configured to:

- Connect to GitHub via webhook integration
- Automatically trigger on every push to the master branch
- Execute the complete test suite in an isolated Docker environment
- Archive test reports as build artifacts for historical tracking

## 📊 Test Reporting

Playwright generates comprehensive HTML reports after each test run:

- **Local Reports**: Located in the `playwright-report/` directory
- **Jenkins Reports**: Archived as build artifacts and accessible from the Jenkins job page
- **Report Features**: Detailed test steps, screenshots on failure, execution timelines, and error stack traces

### Viewing Reports Locally

To view the HTML report from your terminal:

```bash
npm run report
```

This command starts a local server and automatically opens the Playwright HTML report in your default browser, allowing you to:
- Inspect detailed test results
- Review execution steps and timings
- Analyze failures with screenshots and traces

## ⚙️ Configuration

- **Base URL**: Dynamically injected at runtime using Jenkins environment variables
- **Browser Settings**: Configured in `playwright.config.js` (browsers, viewports, timeouts)
- **Test Execution**: Headless mode enabled by default for CI/CD environments
- **Environment Consistency**: Docker ensures identical execution across all environments


## 📝 Best Practices Implemented

- **Page Object Model**: Maintains clean separation between test logic and page interactions
- **Docker Containerization**: Ensures consistent test execution across different environments
- **Automated CI/CD**: Reduces manual intervention and catches issues early
- **Comprehensive Reporting**: Provides detailed insights into test execution and failures

## 👨‍💻 Author

**Dharani Gone**  
QA Engineer

//Test webhooks


