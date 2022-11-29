import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CardComponent } from "./components/card/card.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { WeatherItemComponent } from "./components/weather-item/weather-item.component";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ProfileItemComponent } from "./components/profile-item/profile-item.component";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    NavBarComponent,
    FooterComponent,
    WeatherItemComponent,
    SearchInputComponent,
    ButtonComponent,
    SidebarComponent,
    ProfileItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
