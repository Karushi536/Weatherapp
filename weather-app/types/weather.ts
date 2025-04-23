/**
 * Interface for weather data returned by our API
 */
export interface WeatherData {
    location: string; // City name
    country: string | null; // Country code
    temperature: number; // Current temperature
    feels_like: number; // "Feels like" temperature
    humidity: number; // Humidity percentage
    pressure: number; // Atmospheric pressure in hPa
    wind_speed: number; // Wind speed
    wind_direction: number | null; // Wind direction in degrees
    weather: {
      main: string; // General weather condition (e.g., "Rain")
      description: string; // Detailed description (e.g., "light rain")
      icon: string; // Weather icon code
    };
    sunrise: string | null; // Sunrise time (HH:MM)
    sunset: string | null; // Sunset time (HH:MM)
    timezone: number | null; // Timezone offset in seconds
    timestamp: string; // When the data was fetched
  }
  
  /**
   * Interface for API response structure
   */
  export interface WeatherApiResponse {
    success: boolean; // Whether the request was successful
    data?: WeatherData; // Weather data (if successful)
    message?: string; // Error message (if unsuccessful)
  }