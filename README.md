# ECE1724 Project: Distributed-Banking-Transaction-System (For the Pre-Delicate-Frontend)

+ Boyuan Tan (1011579258) - boyuan.tan@mail.utoronto.ca
+ Yiming Li (1006147368) - yimingjo.li@mail.utoronto.ca
+ Minghao Ma (1010800536) - minghao.ma@mail.utoronto.ca

This markdown is written when we are working for the pre-delicate-frontend. Unfortunately, due to limited time, we have not yet combined it with our backend. But we are all very satisfied with this frontend interface. So we keep this markdown for the course project and provide the corresponding user guide.

Video demo for this Pre-Delicate-Frontend: [https://drive.google.com/file/d/1VVz86LHWlr3ZqUNysAfCrjWWonzhbbcg/view?usp=drive_link](https://drive.google.com/file/d/1HoE_3F0noIv0vvKt48iEWDNq_5nmbBXR/view?usp=sharing)

## Motivation

### Problem Background
Traditional banking systems often rely on monolithic architectures, which can lead to limited scalability, reduced fault tolerance, and difficulty in maintaining or upgrading individual components. 

Moreover, transactional consistency and real-time responsiveness are critical issues, especially in financial applications involving sensitive monetary operations. Customers today expect banking services to be seamless, fast, secure, and available around the clock, presenting significant technical challenges to traditional system designs. 

For instance, during peak usage periods such as payday or holidays, traditional monolithic systems often experience slowdowns or even downtime, leading to customer dissatisfaction and potential financial losses for institutions.

### Why This Project is Worth Pursuing
By adopting a distributed microservices architecture enhanced with modern middleware technologies like Kafka, Redis, and Kubernetes, this project aims to address these challenges. The use of microservices enables independent scalability, improved fault isolation, and easier system upgrades without impacting overall availability. Implementing advanced features like the Saga compensation pattern for handling distributed transactions further enhances reliability and robustness, crucial for financial applications.

This project not only demonstrates modern, industry-standard technologies but also prepares the foundation for highly available, scalable, and secure banking transaction systems that align closely with industry trends and practical business needs.

### Our Target Users

- **Bank customers:** Individuals requiring reliable, secure, and instantaneous banking transactions, notifications, and account management.

- **Banking institutions:** Organizations aiming to provide scalable, modern digital financial services, improve customer satisfaction, and reduce technical debt associated with legacy systems.

- **Developers and IT teams:** Professionals seeking a modular, maintainable, and scalable architecture to manage and extend banking systems effectively.

### Existing Solutions and Limitations
Existing banking systems typically rely on traditional monolithic designs, limiting scalability, increasing downtime risks during updates, and complicating transaction management across distributed environments. Some solutions employ distributed systems but often lack comprehensive mechanisms for managing transactional integrity in distributed environments or real-time communication capabilities. This project addresses these limitations by integrating real-time notifications, robust transactional management via the Saga pattern, and cloud-based storage solutions for enhanced reliability and accessibility.

## Objectives

The primary objective of our project is to develop a distributed banking transaction system that leverages a microservices architecture, incorporating modern backend and frontend technologies. The system aims to provide reliable, scalable, and responsive banking operations, including user authentication, account management, cross-account transactions, real-time notifications, and cloud-based file handling.

## Technical Stack (Only Frontend)

* **React For Frontend**: A JavaScript library for building user        interfaces. Multiple hooks are applied to use React’s features in functional components.
  - `useState`: Re-render the UI when state changes. Can be combined with CSS to implement visual switching when the state changes.
  - `useEffect`: Handle side effects. For example retrieving account data from the backend during page initialization.
* **React Router For Routing**: Enables developers to update the URL without reloading the page. This leads to a faster reaction when we switch to another page in the app. `useNavigate` is used in the project to jump from one page to another.
* **JSX**: Combines the power of JavaScript with the readability of HTML.
* **Tailwind CSS**: A utility-first CSS framework with predefined classes for rapid UI development, which enables developers to define styles directly in JSX components using className without the need for additional CSS files. `@keyframes` is applied to implement animation effect.


## Features
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
- Database: PostgreSQL (`files` table, storing blob URLs and metadata).

### Database Schema and Relationships

We use **PostgreSQL ** as our primary relational database, storing users, accounts, transactions, notifications, transaction Sagas, compensation logs, and files. Relations are clearly defined through foreign keys, ensuring data integrity and enabling complex queries and reporting. The schema is structured as follows:

- **Users** (`users`): linked to accounts, notifications, and file uploads.

- **Accounts** (`accounts`): linked to transactions.

- **Transactions** (`transactions`): linked with Saga transaction management (`transaction_sagas` and `compensation_logs`).

- **Notifications** and **Files**: directly linked with users.

### User Interface and Experience Design
- Simplified yet comprehensive frontend views using React components.

- User-friendly interfaces for login, account management, transaction initiation, notification viewing, and file uploads.

- Responsive design ensures accessibility on various devices, achieved with Tailwind CSS and shadcn/ui components.

### Fulfillment of Course Requirements
- Meets frontend technology requirement (React, Tailwind CSS, shadcn/ui).

- Implements backend requirement (Express.js with RESTful API).

- Utilizes relational database (PostgreSQL).

- Includes advanced features: user authentication, real-time notifications, and file handling.
  
## User Guide

When arriving the home page of our Banking System, the user can see the `Get Started` button on the very prominent location with our welcome. You can register your account or directly log in by clicking the `Get Started` button. 

<!--![Home Page](./Pictures%20for%20README/Home_page.jpg)-->
<div style="text-align:center">
    <img src="./Pictures%20for%20README/Home_page.jpg" width="500" height="" alt="Home Page">
</div>

After clicking the `Get Started` button, you will be asked whether having an account already. There will be two choices:  `Yes, Login` and `No, Register`. If you don't have an account and decide to register one, you will be asked to provide your e-mail address and password like below. You should click to accept the terms and conditions and make sure that the e-mail address and password is valid. You will automatically log in once you create an account.

<div style="text-align:center">
    <img src="./Pictures%20for%20README/Register.jpg" width="500" height="" alt="Register">
</div>

If you have already have an account and want to log in, you can click the `Yes, Login` button and enter your e-mail address and password.

Once you successfully register or log in your account, you will enter the account page. Here provides all the information about your accounts, such as yout total balance, your transaction history. It also provides entries for multiple account operations, like making a transaction or creating/deleting an account. Let's start with the transaction operation. You can implement this by clicking the `Transactions` button on top-right of the web page.

<div style="text-align:center">
    <img src="./Pictures%20for%20README/Dashboard.jpg" width="500" height="" alt="Account Page">
</div>

Here we enter the transaction page. On the left side you can follow our instructions to start a new transaction. After a transaction is successfully submitted, you will find out that the balance of corresponding accouts have changed due to your operations. You can also find the transaction history and balance flow in this page. If you want to know more about a historical transaction, click the `View Details` to get what you need.

<div style="text-align:center">
    <img src="./Pictures%20for%20README/Transaction.jpg" width="500" height="" alt="Transaction Page">
</div>

Clicking the `Back to Accounts` button, we can go back to the Account page. We now focus on the `delete` operation of an account. By clicking the `delete` button, you can see the interface below that allows you to delete an account and transfer the funds to another account. We promise that no funds will get lost when you delete an account! 

<div style="text-align:center">
    <img src="./Pictures%20for%20README/Delete_account.jpg" width="300" height="" alt="Delete Interface">
</div>

Similarly, clicking the `Add New Account` button on the top-right of the Account page will pop up the following interface, which enable users to create a new account. You can specify a name for your new account, and choose an account type. Different account types have different features. Create an account that best fit your need!

<div style="text-align:center">
    <img src="./Pictures%20for%20README/Create_account.jpg" width="300" height="" alt="Create Interface">
</div>

This user guide has given a brief introduction to our banking system. Some functions like the investment services have not been mentioned yet. Feel free to explore them by yourself! We have prepared detailed and straightaway guidance in the user interface. 

## Development Guide

### Frontend
* Run `npm install` to install dependencies.
* Run `npm run start` to start the development server.
* Run `npm run test` for local testing.

## Individual Contributions

| Team Member       | Responsibilities                                                                                                                   |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Backend Developer (Boyuan Tan)  | - Infrastructure setup (Express.js, Docker, Kubernetes, Azure Database for PostgreSQL, RESTful API, Azure Blob Storage, Saga Pattern, Redis, Kafka)<br>- Complex backend services development (Transaction Service, Notification Service, File Service, Saga distributed transactions)<br>- Advanced backend logic and API Gateway detailed setup |
| Frontend Developer (Yiming Li) | - Frontend setup, UI development, and design (React.js, Tailwind CSS, shadcn/ui)<br>- API integration (Auth, Account, Transaction, Notification, File services)<br>- Assisting backend setup for simpler API tasks and basic backend integration tests |
| Frontend Developer (Minghao Ma) | - Frontend setup, UI development, and design (React.js, Tailwind CSS, shadcn/ui)<br>- Frontend integration testing and adjustments<br>- Support Backend Specialist with simpler backend tasks (API Gateway basic configuration, Database table design) |
| All members | - Testing of the program<br>- Finishing the final report<br>- Video demo |

## Lessons Learned and Concluding Remarks

In conclusion, our **Distributed-Banking-Transaction-System** project has been an exciting and rewarding experience that allowed us to explore the power of **React** and **Tailwind CSS** for building scalable, high-performance and easy-to-use web applications. Throughout the development process, we focused on implementing the real-time services including user authentication, account management and transaction processing, while ensuring a concise and user-friendly interface. 

We hope that this application serves as a useful starting point for anyone looking to build or use Distributed Banking-Transaction-Systems, and we are excited to continue exploring new possibilities in the world of web development with **React** and other technologies.
