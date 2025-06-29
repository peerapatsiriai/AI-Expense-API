# AI Expense API

A powerful REST API service that uses Google Gemini AI to extract expense information from text and AI-powered speech-to-text conversion. Built with TypeScript, Express.js, and modern development practices.

## 🚀 Features

- **AI-Powered Expense Extraction**: Uses Google Gemini AI to intelligently parse expense information from text
- **AI Speech-to-Text Conversion**: Convert audio files to text using advanced AI speech recognition
- **Multi-language Support**: Handles both Thai and English text and audio input
- **Boosting Words**: Enhance recognition accuracy for specific words and phrases
- **RESTful API**: Clean, well-documented REST endpoints
- **Swagger Documentation**: Interactive API documentation with OpenAPI 3.0
- **TypeScript**: Full type safety and modern JavaScript features
- **Docker Support**: Containerized deployment with Docker and Docker Compose
- **Modular Architecture**: Clean separation of concerns with module-based structure
- **Input Validation**: Robust request validation using Yup schemas
- **Error Handling**: Comprehensive error handling and logging
- **Health Checks**: Built-in health monitoring endpoints
- **File Upload Support**: Handle multiple audio files with size and format validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key
- Speech-to-Text API key 
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

# Speech-to-Text API Configuration (optional - has default)
SPEECH_TO_TEXT_API_KEY=c53885651642eb532ed5d0625104e8c0
SPEECH_TO_TEXT_BASE_URL=https://stt.infer.visai.ai
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

#### 2. Speech-to-Text Conversion
```http
POST /api/expenses/v1/speech-to-text/transcribe
```

**Request (multipart/form-data):**
- `files`: Audio files (max 5 files, 50MB each)
- `boosting_words`: Optional words to enhance recognition (max 10 words)

**Example with curl:**
```bash
curl -X POST http://localhost:3000/api/expenses/v1/speech-to-text/transcribe \
  -F "files=@audio.mp3" \
  -F "boosting_words=สวัสดี" \
  -F "boosting_words=วันจันทร์"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "filename": "voice_01.m4a",
      "status": "success",
      "result": [
        {
          "speaker": "SPEAKER_00",
          "transcript": "มื้อเช้ากินโจ๊กห้าสิบบาทยามเที่ยงกินก๋วยเตี๋ยวเจ็ดสิบห้าบาท",
          "start_time": 0.6143344709897611,
          "end_time": 6.928327645051194
        },
        {
          "speaker": "SPEAKER_00",
          "transcript": "มื้อเย็นกินสุกี้สองร้อยห้าสิบบาท",
          "start_time": 7.286689419795222,
          "end_time": 10.546075085324231
        }
      ],
      "duration": 10.922666666666666
    }
  ],
  "message": "Audio transcription completed successfully"
}
```

#### 3. Test Endpoints
```http
GET /api/expenses/v1/test
GET /api/expenses/v1/speech-to-text/test
```

Returns sample results for testing purposes.

#### 4. Health Checks
```http
GET /api/expenses/v1/health
GET /api/expenses/v1/speech-to-text/health
```

Returns service health status.

## 🎯 Speech-to-Text Features

### **Boosting Words**
Enhance recognition accuracy for specific words:
- **Maximum 10 words** can be provided
- **Examples**: `สวัสดี`, `กรุงเทพ`, `วันจันทร์`
- **Use cases**: Names, technical terms, place names
- **Performance**: No impact on response time

### **Supported Audio Formats**
- MP3, WAV, M4A, and other audio formats
- Maximum file size: 50MB per file
- Maximum files: 5 files per request

### **Postman Setup**
1. **Method**: `POST`
2. **URL**: `http://localhost:3000/api/expenses/v1/speech-to-text/transcribe`
3. **Body**: `form-data`
4. **Files**: Select audio files
5. **Boosting Words**: Add optional words (Text type)

## 🏗️ Project Structure

```
src/
├── config/                 # Configuration files
│   ├── appConfig.ts       # Application configuration
│   └── swaggerConfig.ts   # Swagger documentation config
├── modules/               # Feature modules
│   ├── extractExpenses/   # Expense extraction module
│   │   ├── extract.controller.ts
│   │   ├── extract.rout.ts
│   │   ├── extract.service.ts
│   │   ├── extract.validation.ts
│   │   ├── extract.dto.ts
│   │   └── gemini.service.ts
│   └── speechToText/      # Speech-to-text module
│       ├── speechToText.controller.ts
│       ├── speechToText.rout.ts
│       ├── speechToText.service.ts
│       ├── speechToText.validation.ts
│       └── speechToText.dto.ts
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
| `SPEECH_TO_TEXT_API_KEY` | ❌ | ` ` | Speech-to-text API key |
| `SPEECH_TO_TEXT_BASE_URL` | ❌ | `https://stt.infer.visai.ai` | Speech-to-text API base URL |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔄 Version History

- **v1.1.0**: Added AI Speech-to-Text conversion module
  - Audio file upload support (MP3, WAV, M4A)
  - Boosting words for enhanced recognition
  - File size and format validation
  - Functional programming architecture
- **v1.0.0**: Initial release with AI expense extraction
  - Modular architecture with TypeScript
  - Docker support for easy deployment
  - Comprehensive API documentation with Swagger 