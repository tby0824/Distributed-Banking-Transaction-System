# ECE1724 Project Proposal - Distributed Banking Transaction System

### **Group Member:**
+ a 
+ Minghao Ma (1010800536) Department: Electrical & Computer Engineering
+ Yiming Li (1006147368) Department: Electrical & Computer Engineering

## Motivation

### Problem Background
Traditional banking systems often rely on monolithic architectures, which can lead to limited scalability, reduced fault tolerance, and difficulty in maintaining or upgrading individual components. 

Moreover, transactional consistency and real-time responsiveness are critical issues, especially in financial applications involving sensitive monetary operations. Customers today expect banking services to be seamless, fast, secure, and available around the clock, presenting significant technical challenges to traditional system designs. 

For instance, during peak usage periods such as payday or holidays, traditional monolithic systems often experience slowdowns or even downtime, leading to customer dissatisfaction and potential financial losses for institutions.

### Why This Project is Worth Pursuing
By adopting a distributed microservices architecture enhanced with modern middleware technologies like Kafka, Redis, and Kubernetes, this project aims to address these challenges. The use of microservices enables independent scalability, improved fault isolation, and easier system upgrades without impacting overall availability. Implementing advanced features like the Saga compensation pattern for handling distributed transactions further enhances reliability and robustness, crucial for financial applications.

This project not only demonstrates modern, industry-standard technologies but also prepares the foundation for highly available, scalable, and secure banking transaction systems that align closely with industry trends and practical business needs.

### Target Users

The primary users of this project are:

- **Bank customers:** Individuals requiring reliable, secure, and instantaneous banking transactions, notifications, and account management.

- **Banking institutions:** Organizations aiming to provide scalable, modern digital financial services, improve customer satisfaction, and reduce technical debt associated with legacy systems.

- **Developers and IT teams:** Professionals seeking a modular, maintainable, and scalable architecture to manage and extend banking systems effectively.

### Existing Solutions and Limitations
Existing banking systems typically rely on traditional monolithic designs, limiting scalability, increasing downtime risks during updates, and complicating transaction management across distributed environments. Some solutions employ distributed systems but often lack comprehensive mechanisms for managing transactional integrity in distributed environments or real-time communication capabilities. This project addresses these limitations by integrating real-time notifications, robust transactional management via the Saga pattern, and cloud-based storage solutions for enhanced reliability and accessibility.

## Objective and Key Features

### Project Objectives

The primary objective of our project is to develop a distributed banking transaction system that leverages a microservices architecture, incorporating modern backend and frontend technologies. The system aims to provide reliable, scalable, and responsive banking operations, including user authentication, account management, cross-account transactions, real-time notifications, and cloud-based file handling.

### Technical Implementation Approach

Our project will follow the "Separate Frontend & Backend" architecture approach:

- **Frontend:** React will provide a dynamic, responsive, and user-friendly interface. Tailwind CSS will ensure a modern, consistent, and responsive design. The shadcn/ui library will offer accessible, customizable components for rapid development.

- **Backend:** We will use Node.js with the Express.js framework to create distinct microservices for Auth, Account, Transaction, Notification, and File Management. RESTful API design principles will guide API creation, ensuring clear and efficient communication between services. The API Gateway will handle request routing, JWT-based authentication, and rate limiting.

### Core Features

#### 1. User Authentication and Authorization
- Implementation via the Auth Service using JWT (JSON Web Tokens).

- Secure user registration, login functionalities, and session management.

- Database: PostgreSQL (`users` table).

#### 2. Account Management
- Users can create, view, and manage multiple banking accounts.

- Real-time balance inquiries, account freezing, and closure options.

- Caching frequently queried data (account balances) using Redis to improve performance.

- Database: PostgreSQL (`accounts` table).

#### 3. Transaction Processing with Saga/Compensation Pattern
- Facilitate reliable cross-account fund transfers using the Saga transaction management pattern to ensure data consistency.

- Use Apache Kafka for event-driven architecture, handling debit and credit operations asynchronously.

- Robust error handling and automatic compensating actions in case of transaction failures.

- Database: PostgreSQL (`transactions`, `transaction_sagas`, `compensation_logs` tables).

#### 4. Real-Time Notifications
- Real-time transaction status updates using WebSocket (Socket.IO).

- Users receive immediate notifications upon transaction completion or failure, and account updates.

- Database: PostgreSQL (`notifications` table).

#### 5. Cloud File Handling
- Secure and efficient file upload handling using Azure Blob Storage.

- Storage and management of banking-related documents (e.g., statements, transaction receipts).

- Database: PostgreSQL (`files` table, storing blob URLs and metadata).

### Database Schema and Relationships

We use **PostgreSQL (Azure Database)** as our primary relational database, storing users, accounts, transactions, notifications, transaction Sagas, compensation logs, and files. Relations are clearly defined through foreign keys, ensuring data integrity and enabling complex queries and reporting. The schema is structured as follows:

- **Users** (`users`): linked to accounts, notifications, and file uploads.

- **Accounts** (`accounts`): linked to transactions.

- **Transactions** (`transactions`): linked with Saga transaction management (`transaction_sagas` and `compensation_logs`).

- **Notifications** and **Files**: directly linked with users.

### User Interface and Experience Design
- Simplified yet comprehensive frontend views using React components.

- User-friendly interfaces for login, account management, transaction initiation, notification viewing, and file uploads.

- Responsive design ensures accessibility on various devices, achieved with Tailwind CSS and shadcn/ui components.

### Integration with External Services
- **Redis**: Implemented as a distributed cache to speed up frequent data retrieval (e.g., account balance checks) and provide performance optimization.

- **Azure Blob Storage**: Used for handling file uploads securely and efficiently. Files and their metadata (such as URL paths, filenames, upload dates) are stored in the PostgreSQL `files` table.

- **Apache Kafka**: Enables reliable asynchronous messaging between microservices, supporting event-driven communication and distributed transactions.

### Fulfillment of Course Requirements
- Meets frontend technology requirement (React, Tailwind CSS, shadcn/ui).

- Implements backend requirement (Express.js with RESTful API).

- Utilizes relational database (PostgreSQL).

- Employs cloud storage (Azure Blob Storage) for file handling.

- Includes advanced features: user authentication, real-time notifications, and file handling.

### Project Scope and Feasibility
The outlined scope and features have been carefully evaluated and structured to fit within the project's available timeline and team capacity. By leveraging modular microservice architecture and existing cloud services, our project maintains a realistic balance between innovation and feasibility.

## Tentative Plan

To ensure effective project completion within 4-5 weeks, our team has clearly defined responsibilities aligned with each member's expertise and familiarity with different aspects of the project. The project implementation will follow a phased approach as detailed below:

### Weekly Tasks Breakdown

|**Week**                 |**Backend Specialist Tasks**                |**Frontend Developers Tasks**                                                             |
|----------------------|-----------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Mar 17 – Mar 23      | - Setup backend environment (Docker, Kubernetes, Azure PostgreSQL, Redis)<br>- Initialize microservices structure and API Gateway | - Setup frontend environment (React.js, Tailwind CSS, shadcn/ui)<br>- Design and build login/registration pages |
| Mar 24 – Mar 30      | - Develop Auth Service (registration, login, JWT authentication)                                                | - Integrate Auth Service APIs into frontend<br>- Testing and finalizing auth pages    |
| Mar 31 – Apr 6       | - Implement Account Service (account creation, balance queries) with Redis caching                              | - Develop account management interface<br>- API integration and testing               |
| Apr 7 – Apr 13       | - Build Transaction Service (Saga pattern, Kafka event-driven architecture for distributed transactions)        | - Create transaction initiation UI<br>- Frontend-backend integration and basic testing|
| Apr 14 – Apr 20 (Final Delivery) | - Develop Notification Service (real-time via WebSocket/Socket.IO)<br>- Implement File Service (Azure Blob Storage integration) | - Develop notification center UI<br>- Implement file upload interface<br>- Final comprehensive testing, documentation, and demo preparation |

### Team Member Responsibilities

| Team Member       | Responsibilities                                                                                                                   |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Backend Developer (Member 1)  | - Infrastructure setup (Docker, Kubernetes, PostgreSQL, Redis, Kafka)<br>- Complex backend services development (Transaction Service, Notification Service, File Service, Saga distributed transactions)<br>- Advanced backend logic and API Gateway detailed setup |
| Frontend Developer (Yiming Li) | - Frontend setup, UI development, and design (React.js, Tailwind CSS, shadcn/ui)<br>- API integration (Auth, Account, Transaction, Notification, File services)<br>- Assisting backend setup for simpler API tasks and basic backend integration tests |
| Frontend Developer (Member 3) | - Frontend setup, UI development, and design (React.js, Tailwind CSS, shadcn/ui)<br>- Frontend integration testing and adjustments<br>- Support Backend Specialist with simpler backend tasks (API Gateway basic configuration, Auth and Account APIs integration) |

### Rationale for Task Distribution

- **Backend Specialist**
    - Responsible for critical backend infrastructure and complex distributed system tasks due to their expertise in backend technologies, ensuring robust and secure system architecture.

- **Frontend Developers** 
    - Initially focus on frontend UI tasks due to simplicity and quicker completion potential. 
    - Upon completing frontend tasks, they will support backend development by handling simpler backend functionalities and assisting integration processes, ensuring effective team collaboration and balanced workload distribution.

This structured approach ensures the successful delivery of our robust, scalable, and secure distributed banking system within the specified timeframe.
