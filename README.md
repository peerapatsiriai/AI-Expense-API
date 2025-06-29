# AI Expense API

A powerful REST API service that uses Google Gemini AI to extract expense information from text, AI-powered speech-to-text conversion, and OCR text extraction from images and documents. Built with TypeScript, Express.js, and modern development practices.

## 🚀 Features

- **AI-Powered Expense Extraction**: Uses Google Gemini AI to intelligently parse expense information from text
- **AI Speech-to-Text Conversion**: Convert audio files to text using advanced AI speech recognition
- **AI OCR Text Extraction**: Extract text from images and PDFs using AI optical character recognition
- **Multi-language Support**: Handles both Thai and English text, audio, and image input
- **Boosting Words**: Enhance speech recognition accuracy for specific words and phrases
- **Box Threshold Control**: Adjust OCR confidence threshold for optimal text detection
- **RESTful API**: Clean, well-documented REST endpoints
- **Swagger Documentation**: Interactive API documentation with OpenAPI 3.0
- **TypeScript**: Full type safety and modern JavaScript features
- **Docker Support**: Containerized deployment with Docker and Docker Compose
- **Modular Architecture**: Clean separation of concerns with module-based structure
- **Input Validation**: Robust request validation using Yup schemas
- **Error Handling**: Comprehensive error handling and logging
- **Health Checks**: Built-in health monitoring endpoints
- **File Upload Support**: Handle multiple files with size and format validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key
- Speech-to-Text API key
- OCR API key
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
SPEECH_TO_TEXT_API_KEY=your_speech_to_text_api_key_here
OCR_API_KEY=your_ocr_api_key_here

# Optional (with defaults)
GEMINI_MODEL=gemini-pro
GEMINI_BASE_URL=https://generativelanguage.googleapis.com
SPEECH_TO_TEXT_BASE_URL=https://stt.infer.visai.ai
OCR_BASE_URL=https://ocrdoc.infer.visai.ai
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
        }
      ],
      "duration": 10.922666666666666
    }
  ],
  "message": "Audio transcription completed successfully"
}
```

#### 3. OCR Text Extraction
```http
POST /api/expenses/v1/ocr/extract
```

**Request (multipart/form-data):**
- `files`: Image files or PDFs (max 5 files, 50MB each)
- `box_threshold`: Optional confidence threshold (0.0 to 1.0, default: 0.4)

**Example with curl:**
```bash
curl -X POST http://localhost:3000/api/expenses/v1/ocr/extract \
  -F "files=@receipt.jpg" \
  -F "box_threshold=0.4"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "filename": "receipt.jpg",
      "status": "success",
      "result": [
        {
          "text": "กาแฟ 60 บาท",
          "confidence": 0.95,
          "bbox": [100, 200, 300, 250]
        }
      ]
    }
  ],
  "message": "Text extraction completed successfully"
}
```

#### 4. Test Endpoints
```http
GET /api/expenses/v1/test
GET /api/expenses/v1/speech-to-text/test
GET /api/expenses/v1/ocr/test
```

Returns sample results for testing purposes.

#### 5. Health Checks
```http
GET /api/expenses/v1/health
GET /api/expenses/v1/speech-to-text/health
GET /api/expenses/v1/ocr/health
```

Returns service health status.

## 🎯 Advanced Features

### **Speech-to-Text Boosting Words**
Enhance recognition accuracy for specific words:
- **Maximum 10 words** can be provided
- **Examples**: `สวัสดี`, `กรุงเทพ`, `วันจันทร์`
- **Use cases**: Names, technical terms, place names
- **Performance**: No impact on response time

### **OCR Box Threshold**
Control text detection confidence:
- **Range**: 0.0 to 1.0
- **Default**: 0.4
- **Low values (0.0-0.3)**: More text detected, less accurate
- **High values (0.7-1.0)**: Less text detected, more accurate

### **Supported File Formats**

#### **Speech-to-Text:**
- MP3, WAV, M4A, and other audio formats
- Maximum file size: 50MB per file
- Maximum files: 5 files per request

#### **OCR:**
- **Images**: JPG, PNG, GIF, BMP, etc.
- **Documents**: PDF
- Maximum file size: 50MB per file
- Maximum files: 5 files per request

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
│   ├── speechToText/      # Speech-to-text module
│   │   ├── speechToText.controller.ts
│   │   ├── speechToText.rout.ts
│   │   ├── speechToText.service.ts
│   │   ├── speechToText.validation.ts
│   │   └── speechToText.dto.ts
│   └── imageOCR/              # OCR module
│       ├── ocr.controller.ts
│       ├── ocr.rout.ts
│       ├── ocr.service.ts
│       ├── ocr.validation.ts
│       └── ocr.dto.ts
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
| `SPEECH_TO_TEXT_API_KEY` | ✅ | - | Speech-to-text API key |
| `OCR_API_KEY` | ✅ | - | OCR API key |
| `GEMINI_MODEL` | ❌ | `gemini-pro` | Gemini model to use |
| `GEMINI_BASE_URL` | ❌ | `https://generativelanguage.googleapis.com` | Gemini API base URL |
| `SPEECH_TO_TEXT_BASE_URL` | ❌ | `https://stt.infer.visai.ai` | Speech-to-text API base URL |
| `OCR_BASE_URL` | ❌ | `https://ocrdoc.infer.visai.ai` | OCR API base URL |
| `PORT` | ❌ | `3000` | Server port |
| `API_BASE_URL` | ❌ | `http://localhost` | API base URL for Swagger |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔄 Version History

- **v1.2.0**: Added AI OCR text extraction module
  - Image and PDF text extraction
  - Box threshold control for confidence adjustment
  - Comprehensive file validation
  - Functional programming architecture
- **v1.1.0**: Added AI Speech-to-Text conversion module
  - Audio file upload support (MP3, WAV, M4A)
  - Boosting words for enhanced recognition
  - File size and format validation
  - Functional programming architecture
- **v1.0.0**: Initial release with AI expense extraction
  - Modular architecture with TypeScript
  - Docker support for easy deployment
  - Comprehensive API documentation with Swagger 