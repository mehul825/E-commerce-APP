# E-Commerce MERN Stack Application

A full-stack e-commerce application built using the MERN stack (MongoDB, Express, React, Node.js). This project features a modern user interface, user authentication, product management, and order processing capabilities.

## Features

- **User Authentication**: Secure login and registration.
- **Product Catalog**: Browse and view product details.
- **Shopping Cart**: Add items to cart and manage orders.
- **Admin Dashboard**: Manage products and orders.
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop compatibility.

## Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Client: Mongoose)
- **Authentication**: JWT (JSON Web Tokens), Bcryptjs

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) installed or a MongoDB Atlas connection string.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project root.

2.  **Install Client Dependencies**:
    ```bash
    cd client
    npm install
    ```

3.  **Install Server Dependencies**:
    ```bash
    cd ../server
    npm install
    ```

4.  **Environment Variables**:
    Create a `.env` file in the `server` directory and add the following (adjust based on your configuration):
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
    *(Note: Check the source code for any other specific variables needed)*

### Running the Application

You need to run both the client and server terminals.

**1. Start the Server**
Open a terminal, navigate to the `server` folder, and run:
```bash
cd server
npm run dev
```
*Runs on http://localhost:5000 (or your configured port)*

**2. Start the Client**
Open a **new** terminal, navigate to the `client` folder, and run:
```bash
cd client
npm run dev
```
*Runs on http://localhost:5173 (default Vite port)*
