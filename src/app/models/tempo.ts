export interface Tempo {
    temp: number
    date: string
    time: string
    description: string
    city: string,
    condition_slug: String,
    forecast: Forecast[]
  }
  
  export interface Forecast {
    date: string
    weekday: string
    max: number
    min: number
    description: string
  }