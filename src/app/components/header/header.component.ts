import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/models/model-api';
import { ServiceApiService } from 'src/app/services/service-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  color: ThemePalette = 'warn';


  subs: Subscription[] = []
  comedy!: Movies;
  sticky!: boolean;
  randomNumber!: number;
  overview!: any;

  @ViewChild('stickHeader') header!: ElementRef;
  headerBGUrl!: any;
  
  constructor(public movies: ServiceApiService) { }

  ngOnInit(): void {
    this.subs.push(this.movies.getComedy().subscribe(data => {
      this.comedy = data;
      const min = 0;
      const max = this.comedy.results.length - 1;
      this.randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.comedy.results[this.randomNumber].backdrop_path;
      let description = this.comedy.results[this.randomNumber].overview;
      if (description.length > 300) {
        description = description.substring(0, 300)+'...';
      };
      this.overview = description
    }));
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }  
}
