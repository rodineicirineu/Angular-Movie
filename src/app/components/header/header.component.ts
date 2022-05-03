import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movies } from 'src/app/models/model-api';
import { tmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('stickHeader') header!: ElementRef;
  color: ThemePalette = 'warn';
  randomNumber!: number;
  headerBGUrl!: string;
  overview!: string;
  videoUrl!: string;
  image!: string;
  name!: string;
  key!: string;
  sticky!: boolean;
  comedy!: Movies;
  id!: number;
  series!: any;
  video: any;

  constructor(
    public tmdb: tmdbService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tmdb.getSeries().subscribe(data => {
      this.series = data;
      const min = 0;
      const max = this.series.results.length - 1;
      this.randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.series.results[this.randomNumber].backdrop_path;
      this.image = 'https://image.tmdb.org/t/p/w100' + this.series.results[this.randomNumber].poster_path;
      let description = this.series.results[this.randomNumber].overview;
      if (description.length > 300) {
        description = description.substring(0, 300)+'...';
      };
      this.overview = description
      this.id = this.series.results[this.randomNumber].id
    })

    this.getSeriesVideo();

  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 30) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  getSeriesVideo(){
    setTimeout(() => {
      this.tmdb.getSeriesVideo(this.id).subscribe(res => {
        this.video = res
        this.name = this.video?.results[0]?.name
        this.key = 'https://www.youtube.com/watch?v=' + this.video?.results[0]?.key
      });
    },800)
  }
}
