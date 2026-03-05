# Weather App

A modern, responsive weather application built with React, TypeScript, and Vite. Get real-time weather information, daily forecasts, and hourly predictions for any city worldwide.

## Features

- **Current Weather**: Display current temperature, humidity, wind speed, and weather conditions
- **5-Day Forecast**: View weather predictions for the next 5 days
- **Hourly Forecast**: Detailed hourly weather data for the next 24 hours
- **Location Services**: Automatic detection of current location weather
- **City Search**: Search weather by city name
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast & Modern**: Built with Vite for lightning-fast development and builds

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API**: OpenWeatherMap API
- **Icons**: Custom SVG icons

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task4-weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Get your OpenWeatherMap API key:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key from your dashboard

4. Create a `.env` file in the root directory and add your API key:

   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Usage

### Getting Weather Data

- **Automatic Location**: The app will automatically detect your current location and display weather data
- **City Search**: Enter a city name in the search bar and click "Get Weather" or press Enter
- **Toggle Forecast**: Switch between daily forecast and hourly forecast using the buttons

### Dark/Light Mode

Click the sun/moon icon in the top-right corner to toggle between light and dark themes.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── App.css                # Global styles
├── index.css              # Additional styles
├── assets/                # Static assets
└── pages/
    ├── Parentpage/
    │   └── Parent.tsx     # Main weather card component
    ├── Weatherpage/
    │   └── Weather.tsx    # Current weather display
    ├── Forecastpage/
    │   └── Forecast.tsx   # 5-day forecast display
    └── Hourlypage/
        └── HourlyForecast.tsx  # Hourly forecast display
```

## API Reference

This app uses the OpenWeatherMap API:

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

For detailed API documentation, visit [OpenWeatherMap API Docs](https://openweathermap.org/api).
