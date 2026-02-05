# 🧪 Playwright Test Automation Framework

A comprehensive end-to-end test automation framework built with Playwright and JavaScript, featuring dual CI/CD pipelines through both Jenkins and GitHub Actions. The framework automatically triggers test execution on every push to the master branch, ensuring consistent quality checks throughout the development lifecycle.

## 🚀 Tech Stack

- **Language**: JavaScript (Node.js)
- **Automation Tool**: Playwright
- **Test Runner**: Playwright Test
- **Design Pattern**: Page Object Model (POM)
- **CI/CD**: Jenkins & GitHub Actions
- **Containerization**: Docker
- **Reporting**: Playwright HTML Report
- **Version Control**: Git / GitHub

## 📁 Project Structure

```
saucelab_demotest/
│
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       ├── integration.yml # CI workflow for testing
│       └── deploy.yml      # Deployment workflow
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

## 🔄 CI/CD Workflows

This framework implements dual CI/CD pipelines for flexibility and demonstration of different automation approaches:

### Jenkins Pipeline (Webhook-Triggered)

1. **Code Push**: Developer commits and pushes code to the master branch
2. **Webhook Trigger**: GitHub webhook automatically notifies Jenkins
3. **Pipeline Execution**: Jenkins performs the following steps:
   - Checks out the latest code from the repository
   - Builds a fresh Docker image
   - Executes Playwright tests inside the containerized environment
   - Publishes test results and artifacts
4. **Status Update**: Pipeline reflects test execution status (success/failure)

### GitHub Actions Workflows

#### Integration Workflow (`integration.yml`)
- **Trigger**: Automatic on push to master/main branch and pull requests
- **Purpose**: Run Playwright tests in GitHub's cloud infrastructure

#### Deploy Workflow (`deploy.yml`)
- **Trigger**: Successful completion of integration tests 
- **Purpose**: Handle deployment tasks after successful test execution

**Key Benefits:**
- ✅ Fully automated testing on every commit
- ✅ Multiple CI/CD options (Jenkins & GitHub Actions)
- ✅ Cloud-based and self-hosted pipeline alternatives
- ✅ Reproducible execution using Docker containers
- ✅ No infrastructure management needed with GitHub Actions


**Why Both?**
- Demonstrates versatility in CI/CD tooling
- Provides fallback options for different deployment scenarios
- Showcases understanding of both self-hosted and managed CI/CD solutions

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


## 📊 Test Reporting

Playwright generates comprehensive HTML reports after each test run across all CI/CD platforms:

- **Local Reports**: Located in the `playwright-report/` directory
- **Jenkins Reports**: Archived as build artifacts and accessible from the Jenkins job page
- **GitHub Actions Reports**: Uploaded as workflow artifacts, accessible from the Actions tab for 30 days
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

### Accessing GitHub Actions Reports

1. Navigate to the **Actions** tab in your GitHub repository
2. Select the workflow run you want to review
3. Scroll to **Artifacts** section
4. Download `playwright-report` artifact
5. Extract and open `index.html` in your browser

## ⚙️ Configuration

- **Base URL**: Dynamically injected at runtime using environment variables (Jenkins/GitHub Actions)
- **Browser Settings**: Configured in `playwright.config.js` (browsers, viewports, timeouts)
- **Test Execution**: Headless mode enabled by default for CI/CD environments
- **Environment Consistency**: 
  - Docker ensures identical execution in Jenkins pipeline
  - GitHub Actions uses Ubuntu runners with consistent Node.js environment
  - Both approaches guarantee reproducible test results

## 🛠️ Getting Started

### Prerequisites

**For Local Development:**
- Node.js (v16 or higher)
- npm or yarn

**For Jenkins Pipeline (Optional):**
- Docker (for containerized execution)
- Jenkins server with Docker support

**For GitHub Actions:**
- No additional setup required - runs automatically on GitHub's infrastructure

### Local Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd saucelab_demotest

# Install dependencies
npm install

# Run tests locally
npm run test
```

## 📝 Best Practices Implemented

- **Page Object Model**: Maintains clean separation between test logic and page interactions
- **Docker Containerization**: Ensures consistent test execution across different environments
- **Dual CI/CD Pipelines**: Demonstrates proficiency with both self-hosted (Jenkins) and cloud-native (GitHub Actions) solutions
- **Automated Testing**: Reduces manual intervention and catches issues early in development
- **Comprehensive Reporting**: Provides detailed insights into test execution and failures across multiple platforms
- **Infrastructure as Code**: GitHub Actions workflows defined in version-controlled YML files

## 👨‍💻 Author

**Dharani Gone**  
QA Engineer
