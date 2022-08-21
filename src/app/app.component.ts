import { Component, OnInit } from '@angular/core';
import { TempoService } from './services/tempo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private service: TempoService) {}

  ngOnInit(): void {
    this.buscarTempo(); 
  }

  buscarTempo(cidade?: String) {
    this.service.getTempo(cidade).subscribe(reps => {
      console.log(reps);
    });
  }
  
}
