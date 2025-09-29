import React from "react";

interface HourlyForecastProps {
  data: any; // forecast data from OpenWeather
  darkMode?: boolean; // optional for dark mode styling
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, darkMode }) => {
  if (!data || !data.list) return null;

  // Show next 12 hours
  const hourlyData = data.list.slice(0, 12);

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
        return "public/unnamedhh-removebg-preview.png";
    }
  };

  return (
    <div className="p-6 max-w-4xl ml-[580px] mt-[80px] overflow-auto">
        
        
              <div className="flex gap-4 text-center">
        {hourlyData.map((f: any, index: number) => {
          const dateObj = new Date(f.dt * 1000);
          const hour = dateObj.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: false});
          const condition = f.weather[0].main;
          const imgSrc = getIconPath(condition);
          

          const minTemp = Math.round(f.main.temp_min);
          const maxTemp = Math.round(f.main.temp_max);

          return (
            <div
              key={index}
              className={`bg-gray-100 ${darkMode ? "bg-gray-800 text-white items-center p-3 min-w-[300px] min-h-[550px]" :  "bg-gray-100 items-center p-3 min-w-[300px] min-h-[550px] border-r border-gray-300 last:border-none"}`}
            > 
              <p className="font-semibold text-[16px] mb-0.5">{hour}</p>
                  {/* Icon */}
              <img 
                src={imgSrc} 
                alt={condition} 
                className="w-[200px] h-[200px] mb-4 ml-10 " 
              />
              
              {/* Temperature Range */}
              <p className={`text-xl font-normal mb-2 ${darkMode ? "text-gray-200" : "text-blue-900"}`}>
  {minTemp}°C ~ {maxTemp}°C
</p>

              {/* Condition */}
              <p className={`text-lm font-semibold text-blue-900 uppercase mb-3 ${darkMode ? "text-gray-200" : "text-blue-900"}`}>
                {f.weather[0].description}
              </p>
              
              {/* Wind and Quality/Humidity */}
              <div> 
                {/* Wind */}
                <p className={`text-xs text-blue-900 ${darkMode ? "text-gray-200" : "text-blue-900"}`}>
                  Wind: &lt;{Math.round(f.wind.speed * 3.6)}km/h 
                </p>
                
              </div>
                   <div>
            <p className={`text-xs  text-blue-900 mt-[15px] ${darkMode ? "text-gray-200" : "text-blue-900"}`}>Humid: {f.main?.humidity}%</p>
            
          </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
