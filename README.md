<<<<<<< HEAD
# Hospital_management
=======
# Hospital Management System

A full-stack hospital management system built with React, Node.js, Express, and MongoDB.

## Project Structure

```
your-project/
├── backend/           # Node.js backend service
├── frontend/          # React frontend service
├── docker-compose.yml # Docker compose configuration
├── Jenkinsfile       # CI/CD pipeline configuration
└── README.md         # Project documentation
```

## Prerequisites

- Docker and Docker Compose
- Node.js (v18 or later)
- npm or yarn
- MongoDB (if running locally)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hospital-management
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Testing

Run tests for both services:
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## CI/CD

The project includes a Jenkins pipeline configuration. The pipeline includes:
- Build stage
- Test stage
- Deploy stage

## Environment Variables

### Backend (.env)
- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/hospital_management
- JWT_SECRET=your_jwt_secret_key
- NODE_ENV=development

### Frontend (.env)
- REACT_APP_API_URL=http://localhost:5000

## License

MIT 
>>>>>>> 10d98c0 (Initial commit or updated project)
