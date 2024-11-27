# Sporday Backend

## Project Overview

This is the backend for the **Sporday** application, built using [NestJS](https://nestjs.com/) with a **microservices architecture**. The backend handles different services like users, catalog, discount-promotion, notifications, orders, and an API gateway, all within a **monorepo** architecture.

## Table of Contents

-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Environment Variables](#environment-variables)
    -   [Configuration](#configuration)
-   [Running the Project Locally](#running-the-project-locally)
-   [Code Structure and Conventions](#code-structure-and-conventions)
-   [Available Scripts](#available-scripts)
-   [Database Migrations](#database-migrations)
-   [Dockerization](#dockerization)
    -   [Dockerfile](#dockerfile)
    -   [Docker Compose](#docker-compose)
    -   [Running Docker Containers](#running-docker-containers)
-   [Contributing](#contributing)
-   [Troubleshooting](#troubleshooting)
-   [License](#license)

## Project Structure

The repository uses the **NX** monorepo tool to manage all backend applications. Each microservice resides in the `apps/` folder, while shared libraries are in the `libs/` folder.

## Getting Started

### Prerequisites

Make sure you have the following installed:

-   **Node.js** (version >= 20.x)
-   **npm** (preferred) or **yarn**
-   **PostgreSQL** (for database usage)
-   **Docker** (for containerized environments)

### Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:sporday/sporday-backend.git
    ```

2. Install dependencies for all apps:

    ```bash
    cd sporday-backend
    npm install
    ```

### Environment Variables

Configure your environment variables by creating a `.env` file in the root of your project. Refer to the `.env.example` file for a list of required variables.

### Configuration

Make necessary configurations in `apps/{app-name}/config` for each microservice as required.

## Running the Project Locally

To run the project locally, use the following commands for each backend service:

-   **API Gateway**:

    ```bash
    npm run start:api-gateway
    ```

-   **Users Service**:

    ```bash
    npm run start:users
    ```

-   **Catalog Service**:

    ```bash
    npm run start:catalog
    ```

-   **Discount-Promotion Service**:

    ```bash
    npm run start:discount
    ```

-   **Notifications Service**:

    ```bash
    npm run start:notifications
    ```

-   **Orders Service**:

    ```bash
    npm run start:orders
    ```

-   **Run All Services**:

    ```bash
    npm run start:all
    ```

## Available Scripts

In the root directory, you can run the following commands for all services.

### Building the Apps

-   Build all microservices:

    ```bash
    npm run build:all
    ```

### Running Tests

Each app has its own unit and integration tests. You can run tests for any specific app:

-   Run tests for **Users Service**:

    ```bash
    npm run test:users
    ```

-   Run tests for **Catalog Service**:

    ```bash
    npm run test:catalog
    ```

-   Run tests for **API Gateway**:

    ```bash
    npm run test:api-gateway
    ```

### Linting

-   Lint all applications:

    ```bash
    npm run lint
    ```

## Database Migrations

To create and run migrations for your database, you can use the following commands:

-   Generate a new migration:

    ```bash
    npm run migration:generate --name=<migration-name>
    ```

-   Run all pending migrations:

    ```bash
    npm run migration:run
    ```

## Dockerization

To run the backend services in Docker, you can utilize the provided `Dockerfile` and `docker-compose.yml`. Follow these steps to build and run the containers:

### Dockerfile

The `Dockerfile` is structured in multiple stages to build and serve each microservice.

```dockerfile
# STAGE 1: BUILD STAGE
# Use an official Node.js runtime as a parent image
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the TypeScript configuration file explicitly
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
RUN npm run build

# STAGE 2: RUN-TIME STAGE
FROM node:20 AS runtime

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Set the PATH to include the global npm bin directory
ENV PATH="/usr/local/bin:${PATH}"

# Copy .env file
COPY .env ./

# Expose the ports the app runs on
EXPOSE 3000 3001 3002 3003 3004 3005

# Command to run the application
CMD ["sh", "-c", "npm run build && npm start"]
```

### Docker Compose

Use the following `docker-compose.yml` to run all backend services simultaneously:

```yaml
services:
    backend:
        build: .
        volumes:
            - .:/app # This ensures your local directory is mounted to /app in the container
        ports:
            - '3000:3000' # Maps host port 3000 to container port 3000
            - '3001:3001' # Maps host port 3001 to container port 3001
            - '3002:3002' # Maps host port 3002 to container port 3002
            - '3003:3003' # Maps host port 3003 to container port 3003
            - '3004:3004' # Maps host port 3004 to container port 3004
            - '3005:3005' # Maps host port 3005 to container port 3005
        depends_on:
            - db

    db:
        image: postgres:13
        environment:
            POSTGRES_DB: ${DB_NAME}
            POSTGRES_USER: ${DB_USER}
            POSTGRES_PASSWORD: ${DB_PASSWORD}
        ports:
            - '5432:5432'
        volumes:
            - pgdata:/var/lib/postgresql/data

volumes:
    pgdata:
```

### Running Docker Containers

To build and run the containers, execute the following command in the terminal:

```bash
docker-compose up --build
```

You can then access the services in your browser at:

-   API Gateway: http://localhost:3000

## Contributing

We welcome contributions! Please follow the guidelines below to maintain consistency:

### Branching Strategy

-   **Main Branch**: The `develop` branch is where the latest completed development work is consolidated and prepared for the next release.

-   **Supporting Branches**: Use feature, release, hotfix, and bugfix branches as necessary. Follow the naming conventions as outlined in the Git guide.

### Commit Style

Follow the commit message structure:

```bash
<gitmoji> Short description starting with a verb

- Optionally detailed explanation

<ISSUE-ID>
```

e.g

```bash
✨ Add user authentication
- Added login and signup functionality
- Integrated JWT for secure authentication
DAY-123
```

## Troubleshooting

For common issues, please refer to the [Troubleshooting Guide](https://sporday.atlassian.net/wiki/spaces/Sporday/pages/14942323/Troubleshooting+-+Backend).

## License

This project is UNLICENSED.
