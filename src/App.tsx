
import './App.css'
import {CurrentWeather} from './pages/Weatherpage/Weather';
import { Forecast } from './pages/Forecastpage/Forecast'; 
import { WeatherCard } from './pages/Parentpage/Parent';

function App() {

  return (
    <>
      <CurrentWeather />
      <Forecast />
      <WeatherCard />
      
    </>
  )
}

export default App
