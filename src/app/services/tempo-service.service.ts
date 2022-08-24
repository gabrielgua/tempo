import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GEO_API_CONFIG, OPEN_WEATHER_API_CONFIG } from '../config/api.config';
import { Root, Cidade } from '../models/apimodel';

@Injectable({
  providedIn: 'root'
})
export class TempoService {

  constructor(private http: HttpClient) { }

  getTempo(lat: number, lon: number): Observable<Root> {
    return this.http.get<Root>(`${OPEN_WEATHER_API_CONFIG.baseUrl}?lat=${lat}&lon=${lon}&exclude=${OPEN_WEATHER_API_CONFIG.exclude}&lang=${OPEN_WEATHER_API_CONFIG.lang}&units=${OPEN_WEATHER_API_CONFIG.units}&appid=${OPEN_WEATHER_API_CONFIG.appid}`);
  }

  getCidadeByNome(cidade: string, pais: string): Observable<Array<Cidade>> {
    return this.http.get<Array<Cidade>>(`${GEO_API_CONFIG.baseUrl}direct?limit=${GEO_API_CONFIG.limit}&appid=${GEO_API_CONFIG.appid}&q=${cidade},${pais}`);
  }

  getCidadeByCoords(lat: number, lon: number): Observable<Array<Cidade>> {
    return this.http.get<Array<Cidade>>(`${GEO_API_CONFIG.baseUrl}reverse?limit=${GEO_API_CONFIG.limit}&appid=${GEO_API_CONFIG.appid}&lat=${lat}&lon=${lon}`);
  }
}
