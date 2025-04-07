# Distributed-Banking-Transaction-System
## Team Information
Boyuan Tan (1011579258) - boyuan.tan@mail.utoronto.ca
  
Minghao Ma (1010800536) - minghao.ma@mail.utoronto.ca

Yiming Li (1006147368) - yimingjo.li@mail.utoronto.ca

## Motivation
Our goal is to address the limitations of monolithic applications by designing a distributed microservices architecture using cloud and middleware technologies, so this project demonstrates the ability to integrate multiple independent services.

## Objectives
- Develop a banking transaction system using a microservices architecture.
- Implement independent services for authentication, account management, transaction processing (with Saga/compensation), notifications, and file uploads.
- Integrate distributed middleware components such as Apache Kafka, Zookeeper, and Redis.
- Use Azure services for cloud-based PostgreSQL and Blob Storage in production.
- Ensure the system is secure, scalable, and highly available with a user interface that mimics a real bank system.

## Technical Stack
- **Frontend:**  
  - React, React Router DOM  
  - Tailwind CSS, shadcn/ui  
  - JWT-based authentication (with jwt-decode)  
- **Backend (Microservices):**  
  - Node.js with Express.js  
  - Sequelize ORM with PostgreSQL  
  - Apache Kafka for asynchronous messaging  
  - Zookeeper for managing Kafka brokers  
  - Redis for distributed caching  
  - Socket.IO for real-time notifications  
  - Multer for file uploads  
- **Cloud Services:**  
  - **Azure Database for PostgreSQL:** Used in production to store all microservices data with high availability and secure connectivity.  
  - **Azure Blob Storage:** Used for storing files, like file upload.
- **Containerization & Orchestration:**  
  - Docker & Docker Compose for local development  
  - (Planned) Kubernetes (AKS) for production deployment with API Gateway and Ingress

## Microservices Architecture & Middleware
Our system is built as a collection of independent microservices:
- **Auth Service:** Manages user registration, login, and JWT token issuance.
- **Account Service:** Handles account creation, balance updates (deposit, withdraw), and deletion.
- **Transaction Service:** Processes fund transfers between accounts using a Saga pattern with compensation for error handling.
- **Notification Service:** Consumes transaction events via Apache Kafka and pushes real-time notifications using Socket.IO.
- **File Service:** Manages file uploads, downloads, and deletion; intended to be upgraded to Azure Blob Storage for production.
- **API Gateway:** Acts as the single entry point for client requests, handling JWT authentication and routing to appropriate services.

Middleware components:
- **Apache Kafka:** Serves as the central messaging bus to decouple services and enable asynchronous event processing.
- **Zookeeper:** Manages Kafka broker metadata and coordination, ensuring system reliability and scalability.
- **Redis:** Provides caching for frequently accessed data to reduce database load and improve response times.

## Features
- **Authentication:**  
  - User registration and login with JWT-based authentication.
- **Account Management:**  
  - Create, view, update (deposit/withdraw), and delete bank accounts.
  - Display current account balance and show only accounts associated with the logged-in user.
- **Transaction Processing:**  
  - Transfer funds between accounts using a Saga pattern for distributed transaction management.
  - View transaction history with detailed timestamps.
- **Real-Time Notifications:**  
  - Receive and display notifications for transaction events (e.g., successful transfers, failures) with creation timestamps.
- **File Upload:**  
  - Upload files (e.g., bank statements, receipts), with functionality to download and delete files.
- **User Interface Enhancements:**  
  - A navigation bar that shows the logged-in user's email.
  - Clear labels and descriptive text for Deposit, Withdraw, Transfer, Notifications, and File Upload functionalities.
  - User-specific data: Each user sees only their own accounts, transactions, notifications, and files.

## User Guide
1. **Home Page:**  
   - Unauthenticated users see a "Login / Register" button.
   - After login, the navigation bar displays the user's email and links to Accounts, Transactions, Notifications, and File Upload pages.
2. **Authentication:**  
   - Register using your email and password.
   - Log in with your credentials to receive a JWT token that authenticates subsequent API requests.
3. **Accounts:**  
   - Create a new account by entering an account number.
   - View your accounts with current balances.
   - Use the Deposit and Withdraw controls to modify your account balance.
   - Click "Transfer" to navigate to the Transfer page.
4. **Transactions:**  
   - View a list of transactions (transfers) with details and timestamps.
   - Use the transfer form to select source and destination accounts and enter an amount.
5. **Notifications:**  
   - View real-time notifications about transaction events, including their timestamps.
6. **File Upload:**  
   - Upload files such as bank statements or receipts.
   - Download or delete uploaded files.
7. **Navigation:**  
   - The top navigation bar allows quick access to all features, and displays the logged-in user's email.

## Development Guide
### Environment Setup and Configuration
1. **Backend Setup:**
   - Install [Docker Desktop](https://www.docker.com/products/docker-desktop).
   - Navigate to the backend directory (where `docker-compose.yml` is located):
     ```bash
     cd /path/to/Distributed-Banking-Transaction-System-main/backend
     ```
   - Start all backend microservices:
     ```bash
     docker compose up --build -d
     ```
   - Verify all containers are running:
     ```bash
     docker compose ps
     ```
   - Check service logs if needed:
     ```bash
     docker compose logs <service-name>
     ```
2. **Frontend Setup:**
   - Install [Node.js](https://nodejs.org/) (v18 or higher).
   - Navigate to the frontend directory:
     ```bash
     cd /path/to/Distributed-Banking-Transaction-System-main/frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```
   - Access the application at [http://localhost:3003](http://localhost:3003).

### Database and Cloud Storage
- **Database Initialization:**  
  - The PostgreSQL container is automatically started by Docker Compose with the database `banking`.  
  - For production, update the `DATABASE_URL` environment variable to point to your Azure Database for PostgreSQL:
    ```
    postgresql://tby:Tanboyuan0724%29@bank2.postgres.database.azure.com:5432/postgres?sslmode=require
    ```
  - Sequelize models sync and create tables automatically on service startup.
- **Cloud Storage Configuration:**  
  - File uploads are stored locally in the `uploads/` directory for testing.  
  - For production, modify the File Service to use Azure Blob Storage and update the corresponding environment variables and code.

### Local Development and Testing
- Use Docker Compose to orchestrate and run the backend microservices.
- Use `npm start` in the frontend directory to launch the React application.
- Test API endpoints using Postman or curl.
- Use browser developer tools to inspect network requests and debug issues.

## Deployment Information
- **Local Development:**  
  - Docker Compose is used for local orchestration.
- **Production Deployment:**  
  - Each microservice can be containerized and deployed to a Kubernetes cluster (e.g., AKS) with an API Gateway and Ingress for secure, scalable routing.
  - Update environment variables and secrets for production, ensuring secure management of sensitive credentials.

## Individual Contributions
- **Boyuan Tan:** Implemented backend.
- **Minghao Ma:** Implemented frontend.
- **Yiming Li:** Implemented frontend.

## Lessons Learned and Concluding Remarks
- Adopting a microservices architecture greatly improves scalability and maintainability.
- Integrating distributed middleware (Kafka, Zookeeper, Redis) presented challenges but enhanced system resilience.
- Security, error handling, and clear user guidance are critical in financial applications.
- This project has provided valuable hands-on experience in building, testing, and deploying a modern, distributed system.

## Video Demo
A demo video by Yiming Li(teammate): [4 mins video](https://drive.google.com/file/d/1R-J5nz73TkYlvky1uyYa-Mu-L98TrdGq/view?usp=sharing)
  

## Source Code
The repository includes all source code for the frontend and backend microservices, including:
- Complete implementations of Auth, Account, Transaction, Notification, and File Services.
- Environment configuration templates and Sequelize models for database schema definitions.
- Docker Compose file for local development.
- Detailed setup instructions and documentation in this README.
