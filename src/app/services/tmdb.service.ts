import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from 'src/app/models/model-api';


const enum endpoint {
  now_playing = '/movie/now_playing',
  animation = '/movie/12/recommendations', //35
  adventure = '/movie/74/recommendations',
  upComing = '/movie/upcoming',
  fantasy = '/movie/22/recommendations',
  family = '/movie/35/recommendations',

  series = '/tv/top_rated',
  serieID = '/tv/',
  movieID = '/movie/'
}

const params = new HttpParams()
  .set('api_key', '6dcedab3b452574769cef95cc4791224')

@Injectable({
  providedIn: 'root'
})

export class tmdbService implements OnInit  {
  private url = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getNowPlayingMovie(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.now_playing}`, { params })
  }

  getAnimation(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.animation}`, { params } )
  }

  getAdventure(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.adventure}`, { params })
  }

  getUpComing(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.upComing}`, { params })
  }

  getFantasy(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.fantasy}`, { params })
  }

  getFamily(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.family}`, { params })
  }


  getSimilar(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}${endpoint.movieID}${id}/similar`, { params })
  }

  getMovie(id: any): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.movieID}${id}?&language=pt-BR`, { params })
  }

  getMovieVideo(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}${endpoint.movieID}${id}/videos`, { params })
  }

  getSeries(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.series}?&language=pt-BR`, { params })
  }

  getSeriesVideo(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}${endpoint.serieID}${id}/videos`, { params })
  }

  ngOnInit(): void {}

}
