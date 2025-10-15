# Employee Management System 👥

A comprehensive ReactJS application for managing employee data with interactive features including authentication, data visualization, mapping, and camera integration.

## 🎯 Project Overview

This is a full-featured employee management system built with modern web technologies. The application provides a complete workflow from user authentication to employee data management, featuring interactive charts, global office mapping, and photo capture capabilities.

## ✨ Features

### 🔐 **Authentication System**
- Secure login with predefined credentials
- Session management with localStorage
- Protected routes with automatic redirects

### 📊 **Employee Data Management**
- Real-time data fetching from REST API
- Comprehensive employee listing with search and filter
- Detailed employee profiles with complete information
- Responsive table design with hover effects

### 📈 **Data Visualization**
- Interactive salary charts for top 10 employees
- Bar graph representation with gradient styling
- Statistical insights (highest, average, lowest salaries)
- Sortable data with visual rankings

### 🗺️ **Global Office Mapping**
- Interactive world map using OpenStreetMap
- Real geographic coordinates for all office locations
- Custom markers sized by employee count
- City-wise employee distribution
- Clickable markers with employee details popups

### 📸 **Camera Integration**
- Native camera access through Web API
- Live video preview with controls
- Photo capture functionality
- Image download capabilities
- Timestamp overlay on captured photos

## 🚀 Live Demo

### Screenshots

#### 🔐 Login Page
![Login Page](https://github.com/user-attachments/assets/de34a745-251d-463e-bbcf-32bf6edf4a0b)
*Secure authentication with clean, centered design*

#### 📋 Employee List
![Employee List](https://github.com/user-attachments/assets/98a5ddc9-572f-4931-9ebe-56d0c0494c7d)
*Comprehensive employee data table with navigation options*

#### 📊 Salary Charts
![Salary Charts](https://github.com/user-attachments/assets/d96d462e-1265-448b-90cf-e16d1afc64dd)
*Interactive bar charts showing top 10 employee salaries*

#### 🗺️ Global Map
![Global Map](https://github.com/user-attachments/assets/2a8522f4-8741-4bcb-8416-a96b7c507182)
*Interactive world map with office locations and employee distribution*

#### 👤 Employee Details
![Employee Details](https://github.com/user-attachments/assets/a7318a3e-07a6-4460-b562-d5dfb7750e9a)
*Detailed employee profile with camera integration*

#### 📷 Camera Interface
![Camera Interface](https://github.com/user-attachments/assets/a1e47ae8-53d0-43f1-87ad-cf57ac95bd2c)
*Live camera preview with capture controls*

#### 🖼️ Photo Result
![Photo Result](https://github.com/user-attachments/assets/2926ee2c-b141-43da-b251-c6a7ee20a6dd)
*Captured photo display with download and navigation options*

### 🎬 Complete Walkthrough Video

https://github.com/user-attachments/assets/e049b4bb-85d0-4a8d-ba9e-c4871d5f1d70

*Full end-to-end demonstration showing all features and workflows*

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool and dev server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Responsive Design** - Mobile-first approach with breakpoint system
- **Custom Components** - Reusable UI components with consistent design

### Routing & Navigation
- **React Router v6** - Client-side routing with nested routes
- **Protected Routes** - Authentication-based access control
- **State Management** - Navigation state and data persistence

### Maps & Visualization
- **Leaflet** - Interactive maps with OpenStreetMap tiles
- **React-Leaflet** - React integration for Leaflet maps
- **Custom Markers** - Dynamic markers with employee count indicators
- **CSS Charts** - Pure CSS bar charts without external libraries

### API & Data
- **REST API Integration** - POST requests to external employee API
- **Environment Variables** - Secure credential management
- **Error Handling** - Comprehensive error states with retry mechanisms
- **Loading States** - User-friendly loading indicators

### Camera & Media
- **MediaDevices API** - Native browser camera access
- **Canvas API** - Image capture and manipulation
- **File Download** - Client-side image download functionality

## 📥 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Modern browser** with camera support

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/kosangyadav/jotish-assignment.git
   cd jotish-assignment
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open application**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
pnpm build
# or
npm run build
```

## 🎮 How to Use

### 1. 🔐 Login
- Navigate to the application
- Use credentials: **Username:** `testuser`, **Password:** `Test123`
- Click "Login" to access the dashboard

### 2. 📋 Browse Employees
- View complete employee list with details
- Click on any employee row to see detailed information
- Use navigation buttons to access charts and maps

### 3. 📊 View Analytics
- Click "View Charts" to see salary visualizations
- Explore top 10 employee salaries with interactive bars
- Review statistical insights and rankings

### 4. 🗺️ Explore Global Offices
- Click "View Map" to see worldwide office locations
- Click on map markers to see employee details
- Use the sidebar to filter by city
- Explore employee distribution across continents

### 5. 👤 Employee Details
- Click on any employee from the list
- View comprehensive employee information
- Access camera functionality for photo capture

### 6. 📸 Capture Photos
- Click "Start Camera" in employee details
- Allow camera permissions when prompted
- Use "Capture Photo" to take a picture
- Download or retake photos as needed

### 7. 🔄 Navigation
- Use breadcrumb navigation and back buttons
- Access different sections through header navigation
- Logout securely when finished

## 🏗️ Project Structure

```
jotish-assignment/
├── src/
│   ├── components/
│   │   ├── Login.tsx       # Authentication component
│   │   ├── ListPage.tsx    # Employee list view
│   │   ├── DetailsPage.tsx # Employee details + camera
│   │   ├── ChartPage.tsx   # Salary visualizations
│   │   ├── MapPage.tsx     # Global office map
│   │   └── PhotoResultPage.tsx # Photo display
│   ├── apiService.ts       # API integration utilities
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles + Tailwind
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── vite.config.ts        # Vite configuration + proxy
└── README.md             # Project documentation
```

## 🔧 Technical Features

### API Integration
- **REST API Calls** - POST requests with JSON payload authentication
- **CORS Handling** - Vite proxy configuration for development
- **Error Recovery** - Graceful fallback mechanisms
- **Type Safety** - Full TypeScript interfaces for API responses

### State Management
- **Local Storage** - Authentication persistence across sessions
- **Component State** - React hooks for local component state
- **Navigation State** - Route-based state management
- **Form Handling** - Controlled components with validation

### Performance Optimizations
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Efficient camera image handling
- **Memory Management** - Proper cleanup of camera streams
- **Bundle Optimization** - Vite's optimized build process

### Security Features
- **Environment Variables** - Secure credential storage
- **Authentication Guards** - Protected route access
- **Input Validation** - Form input sanitization
- **HTTPS Ready** - Production-ready secure deployment

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm preview
```

### Environment Setup
- Configure environment variables for production
- Set up CORS headers on the API server
- Enable HTTPS for camera functionality
