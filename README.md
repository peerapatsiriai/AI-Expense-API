# AI Expense API

A powerful REST API service that uses Google Gemini AI to extract expense information from text in both Thai and English languages. Built with TypeScript, Express.js, and modern development practices.

## 🚀 Features

- **AI-Powered Expense Extraction**: Uses Google Gemini AI to intelligently parse expense information from text
- **Multi-language Support**: Handles both Thai and English text input
- **RESTful API**: Clean, well-documented REST endpoints
- **Swagger Documentation**: Interactive API documentation with OpenAPI 3.0
- **TypeScript**: Full type safety and modern JavaScript features
- **Docker Support**: Containerized deployment with Docker and Docker Compose
- **Modular Architecture**: Clean separation of concerns with module-based structure
- **Input Validation**: Robust request validation using Yup schemas
- **Error Handling**: Comprehensive error handling and logging
- **Health Checks**: Built-in health monitoring endpoints

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key
- Docker (optional, for containerized deployment)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd POC-Expense-App
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment setup
```bash
# Copy the environment template
cp env.example .env

# Edit .env file with your configuration
```

### 4. Configure environment variables
```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (with defaults)
GEMINI_MODEL=gemini-pro
GEMINI_BASE_URL=https://generativelanguage.googleapis.com
PORT=3000
API_BASE_URL=http://localhost
```

## 🚀 Running the Application

### Development Mode
```bash
# Start development server with hot reload
npm run start:dev

# Run with API tests
npm run dev:full
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Using Docker
```bash
# Development with Docker Compose
npm run docker:dev:up

# Production with Docker Compose
npm run docker:compose:up

# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation:

- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api/expenses/v1
```

### Available Endpoints

#### 1. Extract Expenses
```http
POST /api/expenses/v1/extract
```

**Request Body:**
```json
{
  "text": "วันนี้ไปซื้อกาแฟ 60 บาท และซื้อขนมปัง 25 บาท"
}
```

**Response:**
```json
{
  "expenses": [
    {
      "item": "กาแฟ",
      "price": 60
    },
    {
      "item": "ขนมปัง",
      "price": 25
    }
  ],
  "total": 85
}
```

#### 2. Test Endpoint
```http
GET /api/expenses/v1/test
```

Returns sample expense extraction results for testing purposes.

#### 3. Health Check
```http
GET /api/expenses/v1/health
```

Returns service health status.

## 🏗️ Project Structure

```
src/
├── config/                 # Configuration files
│   ├── appConfig.ts       # Application configuration
│   └── swaggerConfig.ts   # Swagger documentation config
├── modules/               # Feature modules
│   └── extractExpenses/   # Expense extraction module
│       ├── extract.controller.ts
│       ├── extract.rout.ts
│       ├── extract.service.ts
│       ├── extract.validation.ts
│       ├── extract.dto.ts
│       └── gemini.service.ts
├── middleware/            # Express middleware
│   └── validation.ts     # Request validation middleware
├── routes/               # Route definitions
│   └── routes.ts         # Main route aggregator
├── utils/                # Utility functions
│   └── disPlayLogo.ts    # Console logo display
└── server.ts             # Main server file
```

## 🧪 Testing

### Run API Tests
```bash
npm run test:api
```

### Run Individual Scripts
```bash
# Test Gemini service directly
npm run script:gemini

# Test expense extraction
npm run script:expense
```

## 🐳 Docker Commands

### Development
```bash
# Start development environment
npm run docker:dev:up

# Stop development environment
npm run docker:dev:down

# Rebuild development containers
npm run docker:dev:build
```

### Production
```bash
# Start production environment
npm run docker:compose:up

# Stop production environment
npm run docker:compose:down

# Rebuild production containers
npm run docker:compose:build
```

### Maintenance
```bash
# Clean up Docker resources
npm run docker:clean
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run start:dev` | Start development server with hot reload |
| `npm run test:api` | Run API tests |
| `npm run dev:full` | Start dev server with API tests |
| `npm run script:gemini` | Test Gemini service directly |
| `npm run script:expense` | Test expense extraction |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run Docker container |
| `npm run docker:compose:up` | Start with Docker Compose |
| `npm run docker:compose:down` | Stop Docker Compose |
| `npm run docker:dev:up` | Start development with Docker Compose |
| `npm run docker:dev:down` | Stop development Docker Compose |

## 🌐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | ✅ | - | Google Gemini API key |
| `GEMINI_MODEL` | ❌ | `gemini-pro` | Gemini model to use |
| `GEMINI_BASE_URL` | ❌ | `https://generativelanguage.googleapis.com` | Gemini API base URL |
| `PORT` | ❌ | `3000` | Server port |
| `API_BASE_URL` | ❌ | `http://localhost` | API base URL for Swagger |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔄 Version History

- **v1.0.0**: Initial release with AI expense extraction
- Modular architecture with TypeScript
- Docker support for easy deployment
- Comprehensive API documentation with Swagger 