import { WeatherApiResponse } from '@/types/weather';

// Base URL for Laravel backend API
const API_BASE_URL = 'http://localhost:8000/api'; // Replace with production URL in real deployment

/**
 * Fetches current weather data from backend API
 * 
 * @param location - City name or location to search for
 * @param units - Measurement units ('metric' or 'imperial')
 * @returns Promise containing weather data or error information
 */
export const fetchCurrentWeather = async (
  location: string,
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherApiResponse> => {
  try {
    // Make API request to backend
    const response = await fetch(
      `${API_BASE_URL}/weather/current?location=${encodeURIComponent(location)}&units=${units}`
    );

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    // Parse and return JSON response
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Return standardized error response
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};