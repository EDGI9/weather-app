import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./services/weather.service";
import { WeatherItem } from "./classes/weather-item";
import {
  debounceTime,
  distinctUntilChanged,
  catchError,
  retry,
} from "rxjs/operators";
import { throwError, pipe } from "rxjs";
import { ProfileItem } from "./classes/profile-item";
import { ProfileService } from "./services/profile.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [WeatherService, ProfileService],
})
export class AppComponent implements OnInit {
  constructor(
    private _weatherService: WeatherService,
    private _profileService: ProfileService
  ) {}

  weatherItems: WeatherItem[];
  foundResult: any = {};
  profileItems: ProfileItem[];

  onDeleteProfile(event: Event, profile: ProfileItem) {
    event.stopPropagation();
    this._profileService.deleteProfile(profile);
  }

  onSaveProfile() {
    const cities = this._weatherService
      .getWeatherItems()
      .map((item: WeatherItem) => item.name);

    this._profileService.saveNewProfile(cities);
  }

  onLoadProfile(profile: ProfileItem) {
    this._weatherService.clearWeatherItems();
    for (let i = 0; i < profile.cities.length; i++) {
      this._weatherService
        .searchWeatherData(profile.cities[i])
        .pipe(retry())
        .subscribe((response) => {
          const weatherItem = new WeatherItem(
            response.name,
            response.weather[0].description,
            response.main.temp
          );
          this._weatherService.addWeatherItem(weatherItem);
        });
    }
  }

  onSearchTextInput(string) {
    this._weatherService
      .searchWeatherData(string)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        catchError((error) => {
          this.foundResult = { name: error.error.message };
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.foundResult = response;
      });
  }

  onSearchWeather(form) {
    this._weatherService
      .searchWeatherData(form.value.searchInput)
      .pipe(
        catchError((error) => {
          this.foundResult = { name: error.error.message };
          return throwError(error);
        })
      )
      .subscribe((response) => {
        const weatherItem = new WeatherItem(
          response.name,
          response.weather[0].description,
          response.main.temp
        );

        this._weatherService.addWeatherItem(weatherItem);
      });
  }

  ngOnInit() {
    this.weatherItems = this._weatherService.getWeatherItems();
    this.profileItems = this._profileService.getProfiles();
  }
}
