<?php
// app/Http/Controllers/WeatherController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    private $openWeatherMapApiKey;
    private $client;

    public function __construct()
    {
        $this->openWeatherMapApiKey = env('OPENWEATHERMAP_API_KEY');
        $this->client = new Client([
            'base_uri' => 'https://api.openweathermap.org/data/2.5/',
            'timeout'  => 5.0,
        ]);
    }

    /**
     * Get current weather for a location
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function current(Request $request)
    {
        $request->validate([
            'location' => 'required|string',
            'units' => 'sometimes|string|in:metric,imperial'
        ]);

        try {
            $response = $this->client->get('weather', [
                'query' => [
                    'q' => $request->location,
                    'appid' => $this->openWeatherMapApiKey,
                    'units' => $request->units ?? 'metric'
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            return response()->json([
                'success' => true,
                'data' => $this->transformWeatherData($data)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch weather data'
            ], 500);
        }
    }

    /**
     * Transform raw OpenWeatherMap data to our API format
     * 
     * @param array $data
     * @return array
     */
    private function transformWeatherData(array $data): array
    {
        return [
            'location' => $data['name'],
            'country' => $data['sys']['country'] ?? null,
            'temperature' => $data['main']['temp'],
            'feels_like' => $data['main']['feels_like'],
            'humidity' => $data['main']['humidity'],
            'pressure' => $data['main']['pressure'],
            'wind_speed' => $data['wind']['speed'],
            'wind_direction' => $data['wind']['deg'] ?? null,
            'weather' => [
                'main' => $data['weather'][0]['main'],
                'description' => $data['weather'][0]['description'],
                'icon' => $data['weather'][0]['icon']
            ],
            'sunrise' => isset($data['sys']['sunrise']) ? date('H:i', $data['sys']['sunrise']) : null,
            'sunset' => isset($data['sys']['sunset']) ? date('H:i', $data['sys']['sunset']) : null,
            'timezone' => $data['timezone'] ?? null,
            'timestamp' => now()->toDateTimeString()
        ];
    }
}