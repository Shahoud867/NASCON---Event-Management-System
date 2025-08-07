# NASCON - National Student Convention

A comprehensive event management system for the National Student Convention, featuring user authentication, role-based access control, and a modern web interface.

## 🚀 Features

### Phase 1 - Authentication & Setup ✅
- **User Authentication**: Login/Register with JWT tokens
- **Role-Based Access**: Multiple user roles (admin, participant, judge, sponsor, etc.)
- **Modern UI**: React + TypeScript + Tailwind CSS
- **Responsive Design**: Mobile-first approach
- **Secure Backend**: Express.js with MySQL database
- **API Documentation**: RESTful API endpoints

### Upcoming Phases
- **Phase 2**: Event Management & Venue Scheduling
- **Phase 3**: Payments & Sponsorships
- **Phase 4**: Judge & Accommodation Systems
- **Phase 5**: AI Agents Integration
- **Phase 6**: Finalization & Deployment

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** for form handling
- **Zustand** for state management
- **React Query** for data fetching
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Winston** for logging
- **Helmet** for security
- **CORS** for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nascon-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Database Setup**
   - Import the `NASCON.sql` file into your MySQL database
   - Create a database named `NASCON`
   - Update the database configuration in `server/env.example`

4. **Environment Configuration**
   ```bash
   cd server
   cp env.example .env
   # Edit .env with your database credentials
   ```

5. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
This will start both the frontend (port 5173) and backend (port 5000) servers.

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
nascon-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── stores/        # Zustand stores
│   │   └── main.tsx       # App entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Server entry point
└── package.json
```

## 🔐 Authentication

The system supports multiple user roles:
- **super_admin**: Full system access
- **admin**: Administrative functions
- **participant**: Event registration and participation
- **judge**: Event scoring and evaluation
- **sponsor**: Sponsorship management
- **event_organizer**: Event creation and management

## 🗄️ Database Schema

The MySQL database includes comprehensive tables for:
- User management and roles
- Event management with categories
- Venue scheduling
- Sponsorship tracking
- Payment processing
- Judge assignments and scoring
- Accommodation requests
- System alerts and notifications

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/roles` - Get available roles

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id/status` - Update user status

### Events (Public)
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID

## 🎨 UI Components

The application uses a consistent design system with:
- **Primary Colors**: Blue theme with proper contrast
- **Typography**: Inter font family
- **Components**: Cards, buttons, forms, navigation
- **Responsive**: Mobile-first design approach

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Backend (Railway/Render)
1. Deploy to Railway or Render
2. Set environment variables
3. Configure database connection

### Database
- Use PlanetScale or ClearDB for MySQL hosting
- Configure connection strings in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

- [ ] Phase 2: Event Management
- [ ] Phase 3: Payment Integration
- [ ] Phase 4: Judge System
- [ ] Phase 5: AI Agents
- [ ] Phase 6: Production Deployment

---

**NASCON Team** - Building the future of student conventions
