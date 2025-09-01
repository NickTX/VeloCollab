# VeloCollab Frontend

React TypeScript frontend for the VeloCollab fitness tracking application.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Development

The frontend is built with:
- React 18 with TypeScript
- Tailwind CSS for styling
- Axios for API communication
- Create React App for tooling

## API Integration

The frontend connects to the backend API at http://localhost:8000. The main App component includes a connectivity test that displays:
- ✅ Success state when connected to the API
- ❌ Error state when the backend is unavailable
- 🔄 Loading state during connection

## Available Scripts

- `npm start` - Runs the app in development mode (http://localhost:3000)
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - One-way operation to customize build tools

## Phase 1 Complete

This frontend successfully demonstrates:
- React TypeScript setup
- Tailwind CSS integration
- Backend API connectivity
- Error handling and loading states
- Responsive design ready for mobile/desktop
