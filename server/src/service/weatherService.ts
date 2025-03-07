import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = process.env.OPENWEATHER_API_KEY;

  // TODO: Fetch location data based on city name
  private async fetchLocationData(query: string): Promise<Coordinates> {
    // Use the buildGeocodeQuery method to build the geocode query URL
    const geocodeQuery = this.buildGeocodeQuery(query);
    const response = await fetch(geocodeQuery);
    const data = await response.json();
    return { lat: data.coord.lat, lon: data.coord.lon };
  }

  // TODO: Build geocode query URL
  private buildGeocodeQuery(query: string): string {
    return `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`;
  }

  // TODO: Fetch weather data from OpenWeather API using coordinates
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(`${this.baseURL}?${weatherQuery}`);
    return response.json();
  }

  // TODO: Build weather query URL
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

  // TODO: Parse current weather data
  private parseCurrentWeather(response: any) {
    return {
      temperature: response.main.temp,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      weather: response.weather[0].description,
      icon: response.weather[0].icon
    };
  }

  // TODO: Get weather data for a city
  async getWeatherForCity(city: string) {
    const locationData = await this.fetchLocationData(city);
    const weatherData = await this.fetchWeatherData(locationData);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
