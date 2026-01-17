import React from "react";

interface CurrentWeatherProps {
  data?: any;
  darkMode?: boolean;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, darkMode = false }) => {
  if (!data) return null;

  const condition = data.weather?.[0]?.main.toLowerCase();
  let imgSrc = "";

  const getIconPath = (condition: string) => {
    switch (condition) {
      case "clear":
        return "public/sun-removebg-preview.png";
      case "rain":
        return "public/rain-removebg-preview.png";
      case "clouds":
      case "partly cloudy":
        return "public/unnamed__7_-removebg-preview.png";
      case "thunderstorm":
        return "public/thunder-removebg-preview.png";
      default:
        return "public/unnamed__7_-removebg-preview.png";
    }
  };

  imgSrc = getIconPath(condition);

  const currentTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const currentDate = new Date().toLocaleDateString("en-US", { day: "numeric", month: "long" });
  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const containerBg = darkMode ? "bg-gray-900" : "bg-gray-100";
  const cardBg = darkMode 
    ? "linear-gradient(to bottom, #1f2937, #111827)" 
    : "linear-gradient(to bottom, #67a0d6, #5912dd)";
  const textColor = darkMode ? "text-gray-100" : "text-white";
  const textSecondary = darkMode ? "text-gray-300" : "text-white";
  const textMuted = darkMode ? "text-gray-400" : "text-white";
  const chartGradientId = darkMode ? "chartGradientDark" : "chartGradient";
  const chartStopColor = darkMode ? "#9ca3af" : "#fff";
  const chartStroke = darkMode ? "#9ca3af" : "white";

  return (
    <div className={`${containerBg} w-full h-full p-3 sm:p-4 rounded-2xl shadow-md flex items-center justify-center`}>
      <div 
        className="rounded-xl h-full w-full flex flex-col"
        style={{ background: cardBg }}
      >
        <div className={`flex justify-center items-center ${textSecondary} text-xs px-3 pt-3 pb-2`}>
          <span className="text-center">
            {currentDate}, {currentDay} {currentTime}
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-3 pb-3">
          {/* City Name and Country/Region */}
          <h2 className={`text-xl sm:text-2xl font-bold ${textColor} text-center`}>
            {data.name}
          </h2>
          <p className={`text-sm ${textMuted} mt-1`}>
            {data.sys?.country}
          </p>

          {/* Weather Icon and Temperature */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <img
              src={imgSrc}
              alt={condition}
              className="w-20 h-20 sm:w-24 sm:h-24" 
            />
            <p className={`text-3xl sm:text-4xl font-bold ${textColor}`}>
              {Math.round(data.main.temp)}°C
            </p>
          </div>

          {/* Wave chart */}
          <div className="relative w-full max-w-[280px] h-16 mt-4">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id={chartGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={chartStopColor} stopOpacity="0.8"/>
                  <stop offset="100%" stopColor={chartStopColor} stopOpacity="0.2"/>
                </linearGradient>
              </defs>
              <path
                d="M0 70 Q10 50, 20 60 T40 40 T60 50 T80 40 T100 60"
                fill={`url(#${chartGradientId})`}
                stroke={chartStroke}
                strokeWidth="0.5"
                opacity="0.3"
              />
            </svg>
            {/* Temperature labels on the sides */}
            <span className={`absolute left-2 top-1 ${textColor} text-xs opacity-70`}>
              {Math.round(data.main.temp_min)}°C
            </span>
            <span className={`absolute right-2 top-1 ${textColor} text-xs opacity-70`}>
              {Math.round(data.main.temp_max)}°C
            </span>
          </div>

          {/* Wind, Humidity */}
          <div className={`grid grid-cols-2 gap-3 w-full text-center ${textSecondary} text-xs sm:text-sm mt-4 px-3`}>
            <div>
              <p className="text-xs">wind</p>
              <p>&lt;{Math.round(data.wind?.speed * 3.6)}km/h</p>
            </div>
            <div>
              <p className="text-xs">humidity</p>
              <p>{data.main?.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};