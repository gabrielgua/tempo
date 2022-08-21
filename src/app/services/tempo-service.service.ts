import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Tempo } from '../models/tempo';

@Injectable({
  providedIn: 'root'
})
export class TempoService {

  constructor(private http: HttpClient) { }

  getTempo(cidade?: String): Observable<Tempo> {
    if(!cidade) {
      return this.http.get<Tempo>(`${API_CONFIG.apiBaseUrl}${API_CONFIG.jsonFormatConfig}${API_CONFIG.customResponse}${API_CONFIG.apiKey}&user_ip=remote
      `);
    }
    return this.http.get<Tempo>(`${API_CONFIG.apiBaseUrl}${API_CONFIG.jsonFormatConfig}${API_CONFIG.customResponse}${API_CONFIG.apiKey}&city_name=${cidade}`);
  }
}
