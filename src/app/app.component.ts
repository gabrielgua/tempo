import { Component, OnInit } from '@angular/core';
import { Tempo } from './models/tempo';
import { TempoService } from './services/tempo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tempo?: Tempo;
  busca?: String;
  
  constructor(private service: TempoService) {}

  ngOnInit(): void {
    this.buscarTempo(); 
  }

  buscarTempo(cidade?: String) {
    this.service.getTempo(cidade).subscribe(reps => {
      this.tempo = reps;
      this.tempo.max = this.tempo.forecast[0].max;
      this.tempo.min = this.tempo.forecast[0].min;
      this.tempo.forecast.shift();
      this.tempo.condition_slug = this.buscarIcones(this.tempo.condition_slug);
      this.tempo.forecast.forEach(f => {
        f.condition = this.buscarIcones(f.condition);
      });
      
    });
  }

  pesquisarCidade() {
    this.buscarTempo(this.busca);
    this.busca = '';
  }

  buscarIcones(condition_slug: String): String {
    switch (condition_slug) {
      case 'storm': condition_slug = 'thunderstorm'; break;
      case 'snow':  condition_slug = 'severe_cold'; break;
      case 'hail':  condition_slug = 'snowing'; break;
      case 'rain': condition_slug = 'rainy'; break;
      case 'fog': condition_slug = 'foggy'; break;
      case 'clear_day': condition_slug = 'sunny'; break;
      case 'cloudly_day': condition_slug = 'partly_cloudy_day'; break;
      case 'cloudly_night': condition_slug = 'partly_cloudy_night'; break;
      case 'none_day': condition_slug = 'sunny'; break;
      case 'none_night': condition_slug = 'clear_night'; break;
    }
    return condition_slug;
  }
}
