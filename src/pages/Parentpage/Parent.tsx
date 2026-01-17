import { useState, useEffect } from "react";
import { CurrentWeather } from "../Weatherpage/Weather";   
import { Forecast } from "../Forecastpage/Forecast";
import { HourlyForecast } from "../Hourlypage/HourlyForecast";

export const WeatherCard = () => {
  const API_KEY = "d1ea05683e9d0fc352b997f29d0226fa";
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Show daily or hourly forecast
  const [showHourly, setShowHourly] = useState(false);

  // ================= CITY SEARCH ================= //
  const fetchCityWeather = async () => {
    if (!city) return;

    try {
      const resCurrent = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const dataCurrent = await resCurrent.json();

      if (dataCurrent.cod === 200) {
        setCurrentWeather(dataCurrent);
        setError("");
      } else {
        setError(dataCurrent.message);
        setCurrentWeather(null);
      }

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const dataForecast = await resForecast.json();

      if (dataForecast.cod === "200") {
        setForecast(dataForecast);
      } else {
        setForecast(null);
      }

      setCity("");
    } catch {
      setError("Failed to fetch weather data.");
      setCurrentWeather(null);
      setForecast(null);
    }
  };

  // ================= CURRENT LOCATION WEATHER ================= //
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchWeatherByCoords(coords.latitude, coords.longitude);
        },
        () => setError("Geolocation permission denied.")
      );
    } else {
      setError("Geolocation is not supported.");
    }
  }, []);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const resCurrent = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const dataCurrent = await resCurrent.json();
      if (dataCurrent.cod === 200) {
        setCurrentWeather(dataCurrent);
        setError("");
      }

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const dataForecast = await resForecast.json();
      if (dataForecast.cod === "200") {
        setForecast(dataForecast);
      }
    } catch {
      setError("Failed to fetch location weather data.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchCityWeather();
    }
  };

  return (
    <div
      className="h-screen overflow-hidden transition-all duration-500"
      style={{
        backgroundImage: darkMode
          ? "url(/unnamed.png)"
          : "url(/background_LE_upscale_balanced_x4.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header Section with Toggle and Search */}
        <div className="w-full px-4 py-2 sm:px-6 sm:py-3 flex-shrink-0">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
              {/* Search Section */}
              <div className="flex flex-1 w-full sm:w-auto gap-2">
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 p-2 sm:p-3 rounded-lg font-semibold shadow-md transition-colors text-sm sm:text-base ${
                    darkMode
                      ? "bg-gray-800 text-white placeholder-gray-400 border border-gray-700"
                      : "bg-white text-blue-700 placeholder-blue-400 border border-blue-200"
                  }`}
                />
                <button
                  onClick={fetchCityWeather}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-md transition-colors text-sm sm:text-base ${
                    darkMode
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-white text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  Get Weather
                </button>
              </div>

              {/* Dark/Light Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-3 sm:px-4 py-2 rounded-lg shadow-md transition-colors flex items-center justify-center ${
                  darkMode
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 sm:h-6 sm:w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                  </svg>
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 sm:h-6 sm:w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                    />
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <div className={`mt-2 p-2 rounded-lg text-sm ${
                darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-700"
              }`}>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden px-4 sm:px-6 pb-4">
          <div className="h-full max-w-[1920px] mx-auto">
            <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Current Weather - Left Side */}
              <div className="lg:col-span-1 overflow-hidden">
                <CurrentWeather data={currentWeather} darkMode={darkMode} />
              </div>

              {/* Forecast/Hourly - Right Side */}
              <div className="lg:col-span-2 flex flex-col overflow-hidden">
                {forecast && (
                  <>
                    {/* Toggle Buttons */}
                    <div className="flex justify-center gap-2 mb-2 flex-shrink-0">
                      <button
                        onClick={() => setShowHourly(false)}
                        className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-colors text-sm ${
                          !showHourly
                            ? "bg-blue-700 text-white"
                            : darkMode
                            ? "bg-gray-800 text-white hover:bg-gray-700"
                            : "bg-white text-blue-700 hover:bg-blue-50"
                        }`}
                      >
                        Forecast
                      </button>
                      <button
                        onClick={() => setShowHourly(true)}
                        className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-colors text-sm ${
                          showHourly
                            ? "bg-blue-700 text-white"
                            : darkMode
                            ? "bg-gray-800 text-white hover:bg-gray-700"
                            : "bg-white text-blue-700 hover:bg-blue-50"
                        }`}
                      >
                        Hourly
                      </button>
                    </div>

                    {/* Forecast/Hourly Display */}
                    <div className="flex-1 overflow-hidden">
                      {!showHourly ? (
                        <Forecast data={forecast} darkMode={darkMode} />
                      ) : (
                        <HourlyForecast data={forecast} darkMode={darkMode} />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
