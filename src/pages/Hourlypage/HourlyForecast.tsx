import React from "react";

interface HourlyForecastProps {
  data: any;
  darkMode?: boolean;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, darkMode = false }) => {
  if (!data || !data.list) return null;

  // Show next 12 hours
  const hourlyData = data.list.slice(0, 12);

  const getIconPath = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunshine":
        return "/sun-removebg-preview.png";
      case "rain":
      case "rainstorm":
        return "/rain-removebg-preview.png";
      case "clouds":
      case "partly cloudy":
        return "/unnamed__7_-removebg-preview.png";
      case "thunderstorm":
        return "/thunder-removebg-preview.png";
      default:
        return "/unnamed__7_-removebg-preview.png";
    }
  };

  const cardBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const textPrimary = darkMode ? "text-gray-100" : "text-blue-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-blue-900";

  return (
    <div className="w-full h-full p-2 sm:p-3 overflow-x-auto">
      <div className="h-full flex gap-2 sm:gap-3 text-center min-w-max">
        {hourlyData.map((f: any, index: number) => {
          const dateObj = new Date(f.dt * 1000);
          const hour = dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit", 
            minute: "2-digit", 
            hour12: false
          });
          const condition = f.weather[0].main;
          const imgSrc = getIconPath(condition);

          const minTemp = Math.round(f.main.temp_min);
          const maxTemp = Math.round(f.main.temp_max);

          return (
            <div
              key={index}
              className={`${cardBg} flex flex-col items-center justify-between p-2 sm:p-3 min-w-[100px] sm:min-w-[120px] h-full border-r ${borderColor} last:border-none rounded-lg sm:rounded-none first:rounded-l-lg last:rounded-r-lg`}
            > 
              <p className={`font-semibold text-xs sm:text-sm ${textPrimary} mb-1`}>
                {hour}
              </p>
              
              {/* Icon */}
              <img 
                src={imgSrc} 
                alt={condition} 
                className="w-12 h-12 sm:w-16 sm:h-16 mb-2" 
              />
              
              {/* Temperature Range */}
              <p className={`text-xs sm:text-sm font-normal mb-1 ${textPrimary}`}>
                {minTemp}° ~ {maxTemp}°
              </p>

              {/* Condition */}
              <p className={`text-xs font-semibold ${textPrimary} uppercase mb-2 line-clamp-2`}>
                {f.weather[0].description}
              </p>
              
              {/* Wind and Humidity */}
              <div className="space-y-1 text-xs"> 
                <p className={textSecondary}>
                  W: &lt;{Math.round(f.wind.speed * 3.6)}km/h 
                </p>
                <p className={textSecondary}>
                  H: {f.main?.humidity}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
