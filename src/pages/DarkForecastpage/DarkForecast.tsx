import React from "react";

interface ForecastProps {
  data: any;
}

export const DarkForecast: React.FC<ForecastProps> = ({ data }) => {
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
        return "public/unnamedhh-removebg-preview.png";
    }
  };

  return (
    <div
      className="
      p-6 
      max-w-4xl 
      ml-[550px]
      mt-[90px]
    "
    >
      <div className="flex justify-between text-center">
        {dailyData.map((f: any, index: number) => {
          const dateObj = new Date(f.dt * 1000);
          const weekday = dateObj.toLocaleDateString("en-US", {
            weekday: "long",
          });
          const dayMonth = dateObj.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
          });

          const condition = f.weather[0].main;
          const imgSrc = getIconPath(condition);

          const minTemp = Math.round(f.main.temp_min);
          const maxTemp = Math.round(f.main.temp_max);

          return (
            <div
              key={index}
              className="bg-gray-800 items-center p-3 min-w-[300px] min-h-[550px] border-r border-gray-700 last:border-none rounded-lg"
            >
              {/* Day and Date */}
              <p className="font-semibold text-[20px] text-gray-100 mb-0.5">
                {weekday}
              </p>
              <p className="text-sm text-gray-400 mb-3">
                {dayMonth.split(" ").reverse().join(" ")}
              </p>

              {/* Icon */}
              <img
                src={imgSrc}
                alt={condition}
                className="w-[200px] h-[200px] mb-4 ml-8"
              />

              {/* Temperature Range */}
              <p className="text-xl font-normal text-gray-200 mb-2">
                {minTemp}°C ~ {maxTemp}°C
              </p>

              {/* Condition */}
              <p className="text-lm font-semibold text-gray-100 uppercase mb-3">
                {f.weather[0].description}
              </p>

              {/* Wind */}
              <p className="text-xs text-gray-400">
                Wind: &lt;{Math.round(f.wind.speed * 3.6)}km/h
              </p>

              {/* Humidity */}
              <p className="text-xs text-gray-400 mt-[15px]">
                Humid: {f.main?.humidity}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
