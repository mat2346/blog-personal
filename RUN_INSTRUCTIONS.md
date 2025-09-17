# Blog Application Setup and Run Instructions

## Backend Setup (Django)

1. **Install CORS Headers** (if not already installed):
   ```bash
   cd blog_project
   pip install django-cors-headers
   ```

2. **Run Django Migrations** (if needed):
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Create Superuser** (optional):
   ```bash
   python manage.py createsuperuser
   ```

4. **Start Django Backend**:
   ```bash
   python manage.py runserver
   ```
   Backend will run on: http://localhost:8000

## Frontend Setup (React + Vite)

1. **Install Dependencies** (if node_modules is missing):
   ```bash
   cd Frontend
   npm install
   ```

2. **Start React Frontend**:
   ```bash
   npm run dev
   ```
   Frontend will run on: http://localhost:5173

## Application Features

### 🎨 **Complete Blog Design**
- Modern gradient-based UI design
- Responsive layout that works on all devices
- Phone mockup cards for blog posts
- Professional header with search and category filtering
- Hero section with database-themed graphics
- Star ratings and like functionality

### 🔧 **Technical Stack**
- **Frontend**: React 19 + Vite + Modern CSS
- **Backend**: Django + Django REST Framework
- **Database**: SQLite (can be changed to PostgreSQL)
- **Authentication**: JWT-based user system

### 📱 **Components Created**
- `Header.jsx` - Navigation with search and category filters
- `HeroSection.jsx` - Hero section with database branding
- `BlogCard.jsx` - Individual blog post cards with phone mockup design
- `Footer.jsx` - Professional footer with links and social media
- `LoginModal.jsx` - Authentication modal for login/register
- `ApiService.js` - Complete API integration layer

### 🌐 **API Integration**
- **Posts**: Get all posts, filter by category, search functionality
- **Categories**: Dynamic category loading
- **Authentication**: Login, register, logout
- **Likes**: Like/unlike posts functionality
- **Comments**: Comment system (backend ready)

### 🎯 **Key Features**
- **Search**: Real-time search across blog posts
- **Category Filtering**: Filter posts by technology categories
- **User Authentication**: Complete login/register system
- **Responsive Design**: Mobile-first approach
- **Like System**: Users can like posts
- **Error Handling**: Graceful fallbacks with sample data
- **CORS Configured**: Frontend-backend communication enabled

### 🚀 **Usage Instructions**
1. Start the Django backend first (port 8000)
2. Start the React frontend (port 5173)
3. The application will show sample data if backend is unavailable
4. Users can search, filter, and interact with posts
5. Authentication modal appears when user tries to like posts

### 🛠 **Customization**
- Change `API_BASE_URL` in `src/services/api.js` to match your backend
- Modify sample data in `App.jsx` if needed
- Update branding in header and footer components
- Add more categories in the backend admin panel

### 📦 **Database Schema**
The application uses these main models:
- **Post**: Blog posts with title, content, categories
- **Categoria**: Post categories (Technology, Programming, etc.)
- **LikePost**: User likes on posts
- **Comentario**: Comments on posts
- **Usuario**: Custom user model with JWT authentication

### 🎨 **Design Notes**
- Color scheme: Purple gradients with gold accents
- Typography: Modern, clean fonts
- Icons: Custom SVG icons throughout
- Images: Database-themed hero graphics
- Cards: Phone mockup design for modern appeal
- Animations: Smooth hover effects and transitions
