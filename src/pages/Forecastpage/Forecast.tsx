
import React from "react";

interface ForecastProps {
  data: any;
  darkMode?: boolean;
}

export const Forecast: React.FC<ForecastProps> = ({ data, darkMode = false }) => {
  if (!data || !data.list) return null;

  const dailyData: any[] = [];
  const seenDates = new Set();
  const maxDays = 4;

  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!seenDates.has(date) && dailyData.length < maxDays) {
      dailyData.push(item);
      seenDates.add(date);
    }
  });

  const getIconPath = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunshine": 
        return "public/sun-removebg-preview.png";
      case "rain":
      case "rainstorm":
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

  const cardBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const textPrimary = darkMode ? "text-gray-100" : "text-blue-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-blue-900";

  return (
    <div className="w-full h-full p-2 sm:p-3">
      <div className="h-full flex flex-row justify-center items-stretch gap-2 sm:gap-3 text-center">
        {dailyData.map((f: any, index: number) => {
          const dateObj = new Date(f.dt * 1000);
          const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });
          const dayMonth = dateObj.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          });

          const condition = f.weather[0].main;
          const imgSrc = getIconPath(condition);

          const minTemp = Math.round(f.main.temp_min);
          const maxTemp = Math.round(f.main.temp_max);

          return (
            <div 
              key={index} 
              className={`${cardBg} flex flex-col items-center justify-between p-2 sm:p-3 flex-1 h-full border-r ${borderColor} last:border-none rounded-lg sm:rounded-none first:rounded-l-lg last:rounded-r-lg`}
            >
              {/* Day and Date */}
              <div>
                <p className={`font-semibold text-sm sm:text-base ${textPrimary} mb-0.5`}>
                  {weekday}
                </p>
                <p className={`text-xs ${textSecondary} mb-2`}>
                  {dayMonth}
                </p>
              </div>

              {/* Icon */}
              <img 
                src={imgSrc} 
                alt={condition} 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2" 
              />
              
              {/* Temperature Range */}
              <p className={`text-sm sm:text-base font-normal ${textPrimary} mb-1`}>
                {minTemp}° ~ {maxTemp}°
              </p>

              {/* Condition */}
              <p className={`text-xs sm:text-sm font-semibold ${textPrimary} uppercase mb-2 line-clamp-2`}>
                {f.weather[0].description}
              </p>
              
              {/* Wind and Humidity */}
              <div className="space-y-1 text-xs"> 
                <p className={textSecondary}>
                  Wind: &lt;{Math.round(f.wind.speed * 3.6)}km/h 
                </p>
                <p className={textSecondary}>
                  Humid: {f.main?.humidity}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};