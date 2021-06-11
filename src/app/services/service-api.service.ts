import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from 'src/app/models/model-api';


const enum endpoint {
  latest = '/movie/latest',
  now_playing = '/movie/now_playing',
  comedy = '/movie/35/recommendations?&language=pt-BR', //35 Comedy
  horror = '/movie/27/recommendations', //27 Horror
  animation = '/movie/18/recommendations', //18 Drama
  documentary = '/movie/99/recommendations', //99 Documentary
  originals = '/discover/tv',
  movieID = '/movie/${movieID}'
}

const params = new HttpParams()
  .set('api_key', '6dcedab3b452574769cef95cc4791224')

@Injectable({
  providedIn: 'root'
})

export class ServiceApiService implements OnInit  {
  private url = 'https://api.themoviedb.org/3'; 
  
  constructor(private http: HttpClient) { }
  
  getLatest(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.latest}`, { params })
  }
  
  getNowPlayingMovie(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.now_playing}`, { params })
  }
  
  getComedy(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.comedy}`, { params } )
  }
  
  getHorror(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.horror}`, { params })
  }
  
  getAnimation(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.animation}`, { params })
  }
  
  getDocumentary(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.documentary}`, { params })
  }


  getOriginals(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.originals}`, { params })
  }

  getMovieID(): Observable<Movies> {
    return this.http.get<Movies>(`${this.url}${endpoint.originals}`, { params })
  }
  
  

  ngOnInit(): void {}
}