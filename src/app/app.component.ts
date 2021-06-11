import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from './models/model-api';
import { ServiceApiService } from './services/service-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  subs: Subscription[] = []
  latest!: Movies;
  nowPlaying!: Movies;
  comedy!: Movies;
  horror!: Movies;
  animation!: Movies;
  documentary!: Movies;
  originals!: Movies;
  

  constructor(public movies: ServiceApiService ) {}

  ngOnInit(): void {
    this.subs.push(this.movies.getNowPlayingMovie().subscribe(res => this.nowPlaying  =res));
    this.subs.push(this.movies.getComedy().subscribe(res => this.comedy  =res));
    this.subs.push(this.movies.getHorror().subscribe(res => this.horror  =res));
    this.subs.push(this.movies.getAnimation().subscribe(res => this.animation  =res));
    this.subs.push(this.movies.getDocumentary().subscribe(res => this.documentary  =res));
    this.subs.push(this.movies.getOriginals().subscribe(res => this.originals  =res));
    
  }

  ngOnDestroy(): void {}

  
}
