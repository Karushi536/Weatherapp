import { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '@/services/weather';
import { WeatherData } from '@/types/weather';

/**
 * 
 * WeatherCard component displays the current weather information for a specified location.
 * 
 * Features:
 * - Location search
 * - Unit toggle (metric/imperial)
 * - Weather data display with icons
 * - Loading and error states
 */

const WeatherCard = () => {
    // State management
  const [location, setLocation] = useState<string>('London');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Constructs the URL for the weather icon based on the icon code.
   * @param iconCode - weather icon code from OpenWeatherMap API
   * @returns Complete URL for the weather icon
   */

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

    /**
     * Fetches the current weather data from the API.
     */
  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchCurrentWeather(location, units);
      
      if (result.success && result.data) {
        setWeather(result.data);
      } else {
        setError(result.message || 'Failed to fetch weather data');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);
  /**
   * Handles the form submission for location search.
   * @param e - Form event
   */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Weather Forecast</h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
          
          <div className="flex justify-center mt-3 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={units === 'metric'}
                onChange={() => setUnits('metric')}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-white">°C</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={units === 'imperial'}
                onChange={() => setUnits('imperial')}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-white">°F</span>
            </label>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {weather && (
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {weather.location}, {weather.country}
              </h2>
              <span className="text-lg">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-5xl font-bold mb-2">
                  {Math.round(weather.temperature)}°{units === 'metric' ? 'C' : 'F'}
                </div>
                <div className="text-sm">
                  Feels like {Math.round(weather.feels_like)}°{units === 'metric' ? 'C' : 'F'}
                </div>
              </div>
              
              <div className="text-center">
                <img 
                  src={getWeatherIcon(weather.weather.icon)} 
                  alt={weather.weather.description}
                  className="w-20 h-20"
                />
                <div className="capitalize">{weather.weather.description}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="text-sm opacity-80">Humidity</div>
                <div className="text-lg font-semibold">{weather.humidity}%</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="text-sm opacity-80">Wind</div>
                <div className="text-lg font-semibold">
                  {weather.wind_speed} {units === 'metric' ? 'm/s' : 'mph'}
                  {weather.wind_direction && `, ${weather.wind_direction}°`}
                </div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="text-sm opacity-80">Pressure</div>
                <div className="text-lg font-semibold">{weather.pressure} hPa</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="text-sm opacity-80">Sunrise/Sunset</div>
                <div className="text-lg font-semibold">
                  {weather.sunrise} / {weather.sunset}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;