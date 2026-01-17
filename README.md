# Weather App

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information for any city or your current location with a beautiful, single-page interface.

## Features

- 🌤️ **Current Weather Display**
  - Real-time temperature, conditions, and weather icons
  - Wind speed and humidity information
  - Temperature range visualization with wave chart
  - City name, country, and current date/time

- 📅 **Weather Forecast**
  - 4-day weather forecast
  - Daily temperature ranges
  - Weather conditions and descriptions
  - Wind and humidity data for each day

- ⏰ **Hourly Forecast**
  - Hour-by-hour weather predictions
  - Next 12 hours of weather data
  - Compact, scrollable interface

- 🔍 **City Search**
  - Search for weather in any city worldwide
  - Enter key support for quick searches

- 📍 **Geolocation**
  - Automatic location detection
  - Weather for your current location
  - Permission-based access

- 🌓 **Dark/Light Mode**
  - Toggle between dark and light themes
  - Beautiful icon-based toggle button
  - Smooth theme transitions

- 📱 **Fully Responsive**
  - Mobile-first design
  - Single-page layout (no scrolling)
  - Optimized for all screen sizes

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **OpenWeatherMap API** - Weather data

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Task4-WeatherApp
```

2. Install dependencies:
```bash
npm install
```

3. Get your OpenWeatherMap API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key

4. Update the API key in `src/pages/Parentpage/Parent.tsx`:
```typescript
const API_KEY = "your-api-key-here";
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── pages/
│   ├── Weatherpage/
│   │   └── Weather.tsx          # Current weather component
│   ├── Forecastpage/
│   │   └── Forecast.tsx        # Daily forecast component
│   ├── Hourlypage/
│   │   └── HourlyForecast.tsx  # Hourly forecast component
│   └── Parentpage/
│       └── Parent.tsx          # Main container with state management
├── App.tsx                      # Root component
├── main.tsx                     # Entry point
└── assets/                      # Static assets
```

## Features in Detail

### Component Reusability
- Single `Weather` component with `darkMode` prop (no duplicate components)
- Single `Forecast` component with `darkMode` prop
- Shared icon utility functions

### Responsive Design
- Grid layout that adapts to screen size
- Mobile: Stacked vertical layout
- Desktop: Side-by-side layout (1/3 current weather, 2/3 forecast)
- All components fit within viewport height (no page scrolling)

### API Integration
- OpenWeatherMap API for current weather
- OpenWeatherMap API for 5-day forecast
- Error handling for API failures
- Loading states and error messages

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
