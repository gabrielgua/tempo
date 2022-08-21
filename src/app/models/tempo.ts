export interface Tempo {
    temp: number;
    date: string;
    time: string;
    condition_code: string;
    description: string;
    currently: string;
    cid: string;
    city: string;
    img_id: string;
    humidity: number;
    wind_speedy: string;
    sunrise: string;
    sunset: string;
    condition_slug: string;
    city_name: string;
    forecast: Forecast[];
}

export interface Forecast {
    date: string;
    weekday: string;
    max: number;
    min: number;
    description: string;
    condition: string;
}
