import { Injectable } from "@angular/core";
import { WEATHER_ITEMS } from "../store/weather.data";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { WeatherItem } from "../classes/weather-item";

@Injectable()
export class WeatherService {
  constructor(private _http: HttpClient) {}
  getWeatherItems() {
    return WEATHER_ITEMS;
  }

  addWeatherItem(weatherItem: WeatherItem) {
    if (WEATHER_ITEMS.map((e) => e.name).indexOf(weatherItem.name) < 0) {
      WEATHER_ITEMS.push(weatherItem);
    }
  }

  clearWeatherItems() {
    WEATHER_ITEMS.splice(0);
  }

  searchWeatherData(cityName: string): Observable<any> {
    return this._http
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          cityName +
          "&APPID=927d100a485672b0684c432f47a22926" +
          "&units=metric",
        { responseType: "json" }
      )
      .pipe(map((response) => response))
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
