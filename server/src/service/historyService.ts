import fs from 'fs/promises';
import path from 'node:path';

class HistoryService {
  private filePath = path.join(__dirname, '../data/searchHistory.json');

  // TODO: Define a method to read from the searchHistory.json file
  private async read() {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  // TODO: Define a method to write the updated cities array to the searchHistory.json file
  private async write(cities: any[]) {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

  // TODO: Define a method to get cities from the searchHistory.json file
  async getCities() {
    const cities = await this.read();
    return cities;
  }

  // TODO: Define a method to add a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();
    const cityObj = { name: city, id: Date.now().toString() }; // Unique id based on timestamp
    cities.push(cityObj);
    await this.write(cities);
  }

  // * BONUS TODO: Define a method to remove a city from the searchHistory.json file
  // async removeCity(id: string) {
  //   const cities = await this.getCities();
  //   const updatedCities = cities.filter((city) => city.id !== id);
  //   await this.write(updatedCities);
  // }
}

export default new HistoryService();
