# samroyio-app

This is a simple React application initialized with `create-react-app` and configured for deployment to AWS S3 using GitHub Actions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

You need to have Node.js and npm installed on your system to run this project. You can download and install Node.js from [here](https://nodejs.org/).

### Installing

Clone the repository to your local machine:

git clone https://github.com/your-username/my-react-app.git
Navigate to the project directory:

cd my-react-app
Install the dependencies:

npm install
Run the application in development mode:

npm start
Open http://localhost:3000 to view it in the browser.

Deployment
This project is configured to be deployed to an AWS S3 bucket using GitHub Actions.

Workflow
The .github/workflows/deploy-to-s3.yml file contains the GitHub Actions workflow responsible for deploying the application to S3.

Configuration
Ensure that your AWS credentials are stored as secrets in your GitHub repository settings:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
The workflow will use these credentials to deploy the application to the following S3 bucket:

arn:aws:s3:::temp-samroyio-app

Built With
React - The web framework used
Create React App - Tool to set up a modern web app by running one command
GitHub Actions - CI/CD pipeline for automatic deployment
AWS S3 - Service used for hosting the deployed application