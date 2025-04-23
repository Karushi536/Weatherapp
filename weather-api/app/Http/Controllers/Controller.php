<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    private $openWeatherMapApiKey;
    private $client;

    /**
     * Initialize the controller with API key and HTTP client
     */

    public function __construct()
    {
        //Loaad API key from environment variables
        $this->openWeatherMapApiKey = env('OPENWEATHERMAP_API_KEY');

        //Create HTTP client with OpenWeatherMap base URI
        $this->client = new Client([
            'base_uri' => 'https://api.openweathermap.org/data/2.5/',
            'timeout'  => 5.0, // 5 second timeout
        ]);
    }

    /**
     * Get current weather for a specified location
     * 
     * @param Request $request - The incoming request containing:
     * - The location for which to fetch weather data
     * - Optional units (metric or imperial)
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function current(Request $request)
    {
        $request->validate([
            'location' => 'required|string',
            'units' => 'sometimes|string|in:metric,imperial'
        ]);

        try {
            // Make a GET request to the OpenWeatherMap API
            $response = $this->client->get('weather', [
                'query' => [
                    'q' => $request->location,
                    'appid' => $this->openWeatherMapApiKey,
                    'units' => $request->units ?? 'metric'
                ]
            ]);

            // Decode the JSON response
            $data = json_decode($response->getBody(), true);

            // return transformed weaather data
            return response()->json([
                'success' => true,
                'data' => $this->transformWeatherData($data)
            ]);

        } catch (\Exception $e) {
            // Handle any errors that occur during API request
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch weather data'
            ], 500);
        }
    }

    /**
     * Transform the weather data into a more readable format
     * 
     * @param array $data - Raw data from OpenWeatherMap API
     * @return array - Transformed weather data in consistent formart
     */
    private function transformWeatherData(array $data): array
    {
        return [
            'location' => $data['name'], // City name
            'country' => $data['sys']['country'] ?? null, // Country code
            'temperature' => $data['main']['temp'], // Current temperature
            'feels_like' => $data['main']['feels_like'], // "Feels like" temperature
            'humidity' => $data['main']['humidity'], // Humidity percentage
            'pressure' => $data['main']['pressure'], // Atmospheric pressure
            'wind_speed' => $data['wind']['speed'], // Wind speed
            'wind_direction' => $data['wind']['deg'] ?? null, // Wind direction in degrees
            'weather' => [
                'main' => $data['weather'][0]['main'], // General weather condition
                'description' => $data['weather'][0]['description'], // Detailed description
                'icon' => $data['weather'][0]['icon'] // Weather icon code
            ],
            // Convert Unix timestamps to readable time format
            'sunrise' => isset($data['sys']['sunrise']) ? date('H:i', $data['sys']['sunrise']) : null,
            'sunset' => isset($data['sys']['sunset']) ? date('H:i', $data['sys']['sunset']) : null,
            'timezone' => $data['timezone'] ?? null, // Timezone offset
            'timestamp' => now()->toDateTimeString() // Current server time
            
        ];
    }
}
