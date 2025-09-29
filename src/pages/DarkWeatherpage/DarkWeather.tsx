import React from "react";

interface DarkWeatherProps {
  data?: any;
}

export const DarkWeather: React.FC<DarkWeatherProps> = ({ data }) => {
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

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className="bg-gray-900 w-[1700px] p-4 rounded-[60px] shadow-md h-180 justify-self-center my-10">
      <div
        className="rounded-[40px] mt-[20px] ml-[30px] h-[650px] w-[400px]"
        style={{ background: "linear-gradient(to bottom, #1f2937, #111827)" }}
      >
        <div className="flex justify-between items-center text-gray-300 text-sm">
          <span className="mb-[-80px] ml-[100px]">
            {currentDate}, {currentDay} {currentTime}
          </span>
        </div>

        <div className="mt-[90px] flex flex-col items-center">
          {/* City Name and Country/Region */}
          <h2 className="text-3xl font-bold text-gray-100 text-center pl-2">
            {data.name}
          </h2>
          <p className="text-lg text-gray-400 pl-2">{data.sys?.country}</p>

          {/* Weather Icon and Temperature */}
          <div className="flex items-center justify-between w-full mt-4">
            <img
              src={imgSrc}
              alt={condition}
              className="w-[150px] h-[150px] ml-[30px]"
            />
            <p className="text-5xl font-bold text-gray-100 mr-16">
              {Math.round(data.main.temp)}°C
            </p>
          </div>

          {/* Wave chart */}
          <div className="relative w-full h-24 mt-[70px]">
            <svg
              className="absolute inset-0 w-[320px] h-full ml-[35px]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M0 70 Q10 50, 20 60 T40 40 T60 50 T80 40 T100 60"
                fill="url(#chartGradient)"
                stroke="#9ca3af"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </svg>
            <span className="absolute left-12 top-2 text-white text-xs ">
              {Math.round(data.main.temp_min)}°C
            </span>
            <span className="absolute right-12 top-2 text-white text-xs ">
              {Math.round(data.main.temp_max)}°C
            </span>
          </div>

          {/* Wind, Humidity */}
          <div className="grid grid-cols-2 gap-4 w-full text-center text-gray-300 text-base mt-auto">
            <div>
              <p className="text-sm">wind</p>
              <p>&lt;{Math.round(data.wind?.speed * 3.6)}km/h</p>
            </div>
            <div>
              <p className="text-sm">humidity</p>
              <p>{data.main?.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
