import { Component, OnInit, Input } from "@angular/core";
import { WeatherItem } from "src/app/classes/weather-item";

@Component({
  selector: "app-weather-item",
  templateUrl: "./weather-item.component.html",
  styleUrls: ["./weather-item.component.scss"],
})
export class WeatherItemComponent implements OnInit {
  @Input("weather-item") weatherItem: WeatherItem;

  ngOnInit(): void {}
}
