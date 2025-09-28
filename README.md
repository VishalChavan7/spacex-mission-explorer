# SpaceX Mission Explorer

A modern React application for exploring SpaceX missions with real-time data from the SpaceX API v4. Features filtering, favorites, pagination, and responsive design with dark/light theme support.

## 🚀 Features

- **Real-time Data**: Fetches live SpaceX mission data from the official API
- **Advanced Filtering**: Search by mission name, filter by year and success status
- **Favorites System**: Mark missions as favorites with localStorage persistence
- **Theme Support**: Dark/light mode with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modal Details**: Detailed mission information with external links
- **Pagination**: Efficient navigation through large datasets
- **Error Handling**: Graceful error states with retry functionality

## 🛠 Tech Stack

### Core Technologies

- **React 19.1.1** - Modern React with hooks and concurrent features
- **React Router DOM 7.9.3** - Client-side routing with URL state management
- **Vite 7.1.7** - Fast build tool and development server
- **CSS Variables** - Custom properties for theming

### Key Dependencies

- **React DOM 19.1.1** - React rendering library
- **Modern JavaScript** - ES6+ features, async/await, modules

### Development Tools

- **ESLint 9.36.0** - Code linting with React-specific rules
- **Vite Plugin React 5.0.3** - Fast refresh and JSX transformation
- **Vitest** - Unit testing framework (tests included)

### Architecture Patterns

- **Context API** - State management for themes and favorites
- **Custom Hooks** - Reusable logic (debouncing, data fetching)
- **Component Composition** - Modular, reusable components
- **URL State Management** - Filters and pagination synced with browser history

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/spacex-mission-explorer.git
   cd spacex-mission-explorer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

### Test Coverage

- **Component Rendering**: Ensures all components render correctly
- **User Interactions**: Tests filtering, favorites, and modal functionality
- **State Management**: Validates context providers and localStorage persistence
- **API Integration**: Mocks SpaceX API responses for reliable testing

Test files are located in the `/tests` directory and use Vitest with React Testing Library.

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Badge.jsx       # Status indicator component
│   ├── EmptyState.jsx  # No results state
│   ├── ErrorState.jsx  # Error handling component
│   ├── Filters.jsx     # Search and filter controls
│   ├── Header.jsx      # App header with navigation
│   ├── LaunchCard.jsx  # Mission card component
│   ├── LoadingList.jsx # Loading state component
│   ├── Modal.jsx       # Modal dialog component
│   ├── Pagination.jsx  # Page navigation component
│   ├── Spacer.jsx      # Layout utility component
│   └── Toggle.jsx      # Switch/toggle component
├── context/            # React Context providers
│   ├── FavoritesContext.jsx  # Favorites state management
│   └── ThemeContext.jsx      # Theme state management
├── hooks/              # Custom React hooks
│   └── useDebounce.js  # Debounced value hook
├── pages/              # Page components
│   └── LaunchesPage.jsx      # Main launches listing page
├── api.js              # SpaceX API integration
├── App.jsx             # Root application component
├── main.jsx            # Application entry point
└── styles.css          # Global styles and CSS variables
```

## 🔧 Configuration

### API Integration

The app uses the SpaceX API v4:

- **Launches Endpoint**: `https://api.spacexdata.com/v4/launches/latest`
- **Rockets Endpoint**: `https://api.spacexdata.com/v4/rockets`
- **Timeout**: 10 seconds per request
- **Error Handling**: Network errors, timeouts, and HTTP errors are handled gracefully

## 🎨 Styling

### CSS Architecture

- **CSS Variables** for consistent theming
- **Responsive Grid** layouts with CSS Grid
- **Mobile-first** design approach
- **Dark/Light** theme support with system preference detection

### Theme System

- Automatic system theme detection
- Manual theme toggle
- Persistent theme preference in localStorage
- CSS variables for consistent color schemes
# spacex-mission-explorer
