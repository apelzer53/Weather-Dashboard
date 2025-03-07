import { Router } from 'express';
import HistoryService from '../../service/historyService.ts'; // Changed to .ts extension
import WeatherService from '../../service/weatherService.ts'; // Changed to .ts extension

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const { city } = req.body;

  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(city);

  // TODO: save city to search history
  HistoryService.addCity(city);

  res.json(weatherData);
});

// TODO: GET search history
router.get('/history', async (_, res) => {  // Removed req as it's not needed
  const cities = await HistoryService.getCities();
  res.json(cities);
});

// * BONUS TODO: DELETE city from search history

export default router;
