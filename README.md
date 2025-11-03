# 🌱 Urvann Mini Plant Store

A full-stack plant store application built with React (frontend) and Node.js + Express + PostgreSQL (backend).

PlantStore2024!@#$%^&*()_+SecureKeyRandomString987654321

## 🚀 Features

### Frontend Features
- ✅ **Plant Catalog**: Grid display with plant cards showing name, price, categories, and stock availability
- ✅ **Search & Filter**: Search by name or category, filter by category dropdown
- ✅ **Add Plant**: Form with validation for adding new plants
- ✅ **Edit Plant**: Update existing plant details
- ✅ **Delete Plant**: Remove plants with confirmation modal
- ✅ **Pagination**: 12 plants per page with navigation
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Loading States**: Proper loading indicators and error handling
- ✅ **Plant Care Tips**: AI-powered care tips using Google GenAI

### Backend Features
- ✅ **RESTful API**: Complete CRUD operations for plants
- ✅ **PostgreSQL Database**: Relational database with proper schema
- ✅ **Search & Filter**: Advanced search with category filtering
- ✅ **Data Validation**: Input validation and error handling
- ✅ **Security**: CORS, rate limiting, and security headers
- ✅ **Scalable Architecture**: Modular code structure

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Bootstrap 5** - CSS framework
- **JavaScript (JSX)** - Programming language

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client

### Additional
- **Google GenAI** - AI-powered plant care tips
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Rate Limiting** - API protection

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v16 or higher)
2. **PostgreSQL** (v12 or higher)
3. **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Mini-plant-store
```

### 2. Database Setup

#### Install PostgreSQL
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

#### Create Database
```sql
CREATE DATABASE urvann_plant_store;
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your database credentials
# Update DB_PASSWORD and other settings as needed

# Setup database (creates tables and seeds data)
node setup.js

# Start the server
npm run dev
```

The backend will be running on `http://localhost:5000`

### 4. Frontend Setup

```bash
# Navigate back to root directory
cd ..

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running on `http://localhost:5173`

## 📁 Project Structure

```
Mini-plant-store/
├── backend/                 # Backend application
│   ├── config/             # Database configuration
│   ├── database/           # SQL files and setup
│   ├── middleware/         # Express middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── components/             # React components
├── services/               # API services
├── data/                   # Static data
├── package.json            # Frontend dependencies
└── README.md              # This file
```

## 🗄️ Database Schema

### Tables
- **plants**: Plant information (id, name, price, description, image_url, in_stock)
- **categories**: Plant categories (id, name)
- **plant_categories**: Junction table for many-to-many relationship

### Relationships
- Plants can belong to multiple categories
- Categories can have multiple plants

## 🔌 API Endpoints

### Plants
- `GET /api/plants` - Get all plants
- `GET /api/plants/:id` - Get plant by ID
- `POST /api/plants` - Create new plant
- `PUT /api/plants/:id` - Update plant
- `DELETE /api/plants/:id` - Delete plant

### Search & Filter
- `GET /api/plants/search?q=term&category=Indoor` - Search plants

### Categories
- `GET /api/plants/categories` - Get all categories

### System
- `GET /health` - Health check
- `GET /api/plants/storage-info` - Get storage statistics

## 🌍 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=urvann_plant_store
DB_USER=postgres
DB_PASSWORD=your_password
CORS_ORIGIN=http://localhost:5173
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)

1. **Create a PostgreSQL database** (Heroku Postgres, Railway, etc.)
2. **Set environment variables** in your hosting platform
3. **Deploy the backend**:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Set environment variables** in your hosting platform
2. **Deploy the frontend**:
   ```bash
   npm run build
   # Upload dist folder to your hosting platform
   ```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
npm test
```

## 📊 Performance Features

- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connections
- **Rate Limiting**: API protection against abuse
- **Caching**: Browser caching for static assets
- **Lazy Loading**: Images loaded on demand

## 🔒 Security Features

- **CORS Protection**: Controlled cross-origin requests
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Parameterized queries
- **Rate Limiting**: API abuse prevention
- **Security Headers**: Helmet.js protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bootstrap** for the UI framework
- **Google GenAI** for plant care tips
- **PostgreSQL** for the database
- **Vite** for the build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ by the Urvann Team**
