# Buy & Sell Marketplace

A full-stack web application for buying and selling items in a local marketplace. Users can create listings, search for products, message sellers, and manage their account with a secure authentication system.

## Project Overview

This is a collaborative team project built as a Software Engineering capstone course application. The platform provides a complete e-commerce experience with real-time messaging, product search, and user account management.

**Live Application:** [http://44.201.159.31](http://44.201.159.31)

## Key Features

- **User Authentication & Authorization** - Secure registration and login system
- **Product Listings** - Create, view, edit, and delete product listings with images
- **Advanced Search** - Filter and search products by category and keywords
- **Messaging System** - Direct messaging between buyers and sellers
- **User Dashboard** - Manage listings, profile, and view purchase/sale history
- **Image Upload** - Support for product images with file upload functionality
- **Category Management** - Organize products by predefined categories
- **Responsive Design** - Mobile-friendly interface

## Tech Stack

### Frontend
- **React** 18.0 - UI library
- **React Router DOM** 6.30 - Client-side routing
- **CSS** - Custom styling with responsive design
- **Jest** - Unit testing framework

### Backend
- **Node.js & Express** 4.21 - Server framework
- **MySQL** - Relational database (AWS RDS)
- **Multer** - File upload middleware
- **Express Session** - Session management and authentication
- **CORS** - Cross-origin resource sharing

### Infrastructure
- **AWS EC2** - Application hosting
- **AWS RDS** - Database hosting
- **AWS S3** - File storage (planned)

## Team Members

| Name | GitHub |
|------|--------|
| Nathan Donat-Filliod | [DonatNathan](https://github.com/DonatNathan) |
| Claudia Wormley | [CWormley](https://github.com/CWormley) |
| Daniel Cervantes | [daniecervantes](https://github.com/daniecervantes) |
| Davis Rosenstein | [davisjoro](https://github.com/davisjoro) |
| Fatimah Abdolcader | [Fatimah520](https://github.com/Fatimah520) |

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MySQL database
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/CWormley/Buy-Sell-Website.git
cd Buy-Sell-Website/application

# Install backend dependencies
cd src/backend
npm install
npm run start

# In a new terminal, install frontend dependencies
cd ../frontend
npm install
npm start
```

The application will be available at:
- **Frontend:** http://localhost:8080
- **Backend:** http://localhost:5000

### Running Tests

```bash
# Backend tests
cd src/backend
npm run test

# Frontend tests
cd src/frontend
npm run test

# View coverage reports
# Backend: ./src/backend/coverage/lcov-report/index.html
# Frontend: ./src/frontend/coverage/lcov-report/index.html
```

## Project Structure

```
application/
├── src/
│   ├── backend/              # Express.js server & API routes
│   │   ├── src/
│   │   │   ├── server.js     # Main server file
│   │   │   ├── db.js         # Database connection
│   │   │   └── routes/       # API endpoints
│   │   ├── test/             # Jest unit tests
│   │   └── package.json
│   └── frontend/             # React application
│       ├── src/
│       │   ├── index.js      # Entry point
│       │   ├── auth.js       # Authentication logic
│       │   ├── dashboard.js  # User dashboard
│       │   ├── listing.js    # Product listing page
│       │   └── ...           # Other components
│       ├── test/             # Jest tests
│       └── package.json
└── Database.sql              # Database schema
```

## Key Accomplishments

- Built a scalable full-stack application handling user authentication and authorization
- Implemented RESTful API with proper route organization and error handling
- Designed responsive UI with React component-based architecture
- Integrated AWS cloud services for hosting and databases
- Achieved test coverage for critical backend functionality
- Implemented real-time messaging between users
- Created secure file upload functionality for product images

## Development Process

This project was developed using Agile methodology with:
- Regular sprint planning and reviews
- Git-based collaboration with proper branching strategy
- Continuous integration practices
- Test-driven development approach
- Database design and optimization

## License

ISC
