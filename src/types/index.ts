export interface WeatherData {
    city: string;
    list: WeatherForecast[];
}

export interface WeatherForecast {
    dt: number;
    main: MainWeatherData;
    wind: WindData;
    weather: WeatherDescription[];
    dt_txt: string;
}

export interface MainWeatherData {
    temp: number;
    pressure: number;
    humidity: number;
}

export interface WindData {
    speed: number;
    deg: number;
}

export interface WeatherDescription {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface City {
    name: string;
    country: string;
}