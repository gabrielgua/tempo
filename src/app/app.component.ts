import { Component, OnInit } from '@angular/core';
import { Root, Tempo, Forecast, Cidade } from './models/apimodel';
import { TempoService  } from './services/tempo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  root?: Root;
  loading?: boolean = true;
  mensagem?: boolean = false;
  tempo: Tempo = new Tempo();
  cidade?: Cidade;
  busca: string = '';
  
  constructor(private service: TempoService) {}

  ngOnInit(): void {
    this.buscarLocalizacao();
  }

  buscarLocalizacao() {
    navigator.geolocation.getCurrentPosition(success => {
      this.buscarCidadePelasCoords(success.coords.latitude, success.coords.longitude);
    });
  }

  buscarTempo(lat: number, lon: number) {
    this.loading = true
    this.service.getTempo(lat, lon).subscribe(resp => {
      this.root = resp;
      this.toTempo(this.root);
      this.loading = false;
    });
  }

  pesquisarCidade() {
    this.loading = !this.loading;
    if (this.busca.length > 0) {
      if (this.busca.includes(',')) {
        var cidade = this.busca.split(',')[0];
        var pais = this.busca.split(',')[1];
        this.buscarCidadePeloNome(cidade, pais);
      } else {
        this.buscarCidadePeloNome(this.busca, '');
      }
    } else {
      this.buscarLocalizacao();
    }

    this.busca='';
  }

  buscarCidadePeloNome(cidade: string, pais: string) {
    this.service.getCidadeByNome(cidade, pais).subscribe({ next: $data => {
      if($data.length <= 0) {
        this.erro();
        this.buscarLocalizacao();
      }
      this.cidade = $data[0];
      this.buscarTempo(this.cidade.lat, this.cidade.lon);
    }});
  }

  buscarCidadePelasCoords(lat: number, lon: number) {
    this.service.getCidadeByCoords(lat, lon).subscribe({ next: resp => {
      this.cidade = resp[0];      
      this.buscarTempo(this.cidade.lat, this.cidade.lon);
    }})
  }

  toTempo(root: Root) {
    if (this.cidade) {
      this.tempo.city = this.cidade.name;
      this.tempo.region = this.cidade.country;
    } 
    var locale = 'pt-br';
    this.tempo.date = new Date(root.current.dt * 1000).toLocaleDateString(locale, { weekday: 'long', day: '2-digit' , month: '2-digit', year: 'numeric'});
    this.tempo.time = new Date(root.current.dt * 1000).toLocaleTimeString(locale, { hour:'2-digit', minute: '2-digit'} );
    this.tempo.temp = Math.round(root.current.temp);
    this.tempo.description = root.current.weather[0].description;
    this.tempo.icon = root.current.weather[0].icon;
    this.tempo.forecast = this.addForecasts(root);
  } 

  addForecasts(root: Root): Forecast[] {
    let list: Array<Forecast> = [];
    var counter = 0;
    root.daily.forEach(f => {
      if (counter <= 3) {
        list.push(new Forecast(new Date(f.dt * 1000).toLocaleDateString('pt-br', { day: "2-digit", month: "2-digit" }), 
        new Date(f.dt * 1000).toLocaleDateString('pt-br', {weekday: 'short'}),
        Math.round(f.temp.max), Math.round(f.temp.min), f.weather[0].icon));
        counter++;
      } 
    })
    this.tempo.max = list[0].max;
    this.tempo.min = list[0].min;
    list.shift();
    return list;
  }

  erro() {
    this.mensagem = !this.mensagem;
  }
}
