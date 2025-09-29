import { useState, useEffect } from "react";
import { CurrentWeather } from "../Weatherpage/Weather";   
import { DarkWeather } from "../DarkWeatherpage/DarkWeather"; 
import { DarkForecast } from "../DarkForecastpage/DarkForecast";
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
      className={`min-h-screen transition-all duration-500`}
      style={{
        backgroundImage: darkMode
          ? "url(/unnamed.png)"
          : "url(/background_LE_upscale_balanced_x4.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark/Light Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-33 left-85 px-4 py-2 bg-gray-200 text-black rounded-lg shadow"
      >
        {darkMode ? " Light Mode" : " Dark Mode"}
      </button>

      {/* Search */}
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`"mt-[60px] ml-[150px] p-2 rounded-md w-[1600px] font-semibold"
            ${darkMode ? "bg-gray-800 text-white mt-[60px]" : "bg-white text-blue-700 mt-[60px] "}`}
      />
      <br />
      <button
        onClick={fetchCityWeather}
        className={`"mt-[30px] ml-[150px] font-semibold py-2 px-4 rounded-md shadow hover:bg-gray-100"
       ${darkMode ? "bg-gray-800 text-white mt-[30px] hover:bg-gray-900" : "bg-white text-blue-700 mt-[30px] hover:bg-gray-100"}`}
     >
        Get Weather
      </button>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Weather Display */}
      {darkMode ? (
        <DarkWeather data={currentWeather} />
      ) : (
        <CurrentWeather data={currentWeather} />
      )}

      {/* Toggle Buttons for Forecast/Hourly */}
      {forecast && (
        <div className="mt-[-850px] ml-[1450px] w-[300px] flex gap-4">
          <button
            onClick={() => setShowHourly(false)}
            className={`px-4 py-2 rounded-md font-semibold shadow ${
              !showHourly
                ? "bg-blue-700 text-white"
                : darkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-blue-700"
            }`}
          >
            Show Forecast
          </button>
          <button
            onClick={() => setShowHourly(true)}
            className={`px-4 py-2 rounded-md font-semibold shadow ${
              showHourly
                ? "bg-blue-700 text-white"
                : darkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-blue-700"
            }`}
          >
            Show Hourly
          </button>
        </div>
      )}

      {/* Conditional Display */}
      {forecast && !showHourly && (
        darkMode ? <DarkForecast data={forecast} /> : <Forecast data={forecast} />
      )}
      {forecast && showHourly && (
        <HourlyForecast data={forecast} darkMode={darkMode} />
      )}
    </div>
  );
};
