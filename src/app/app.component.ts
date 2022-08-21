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
      console.log(reps);
    });
  }

  pesquisarCidade() {
    this.buscarTempo(this.busca);
  }
}
