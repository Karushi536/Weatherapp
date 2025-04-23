use App\Http\Controllers\WeatherController;

Route::get('/weather/current', [WeatherController::class, 'current']);