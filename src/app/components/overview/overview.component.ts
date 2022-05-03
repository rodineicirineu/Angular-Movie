import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import { tmdbService } from 'src/app/services/tmdb.service';
import { ThemePalette } from '@angular/material/core';
import { Movies } from 'src/app/models/model-api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @ViewChild('stickHeader') header!: ElementRef;
  color: ThemePalette = 'warn';
  headerBGUrl!: string;
  overview!: string;
  name!: string;
  key!: string;
  similar!: Movies;
  sticky!: boolean;
  videoUrl: any;
  movie: any;
  video: any;
  id: any;

  constructor(
    private tmdb: tmdbService,
    private route: ActivatedRoute,
    private sanitazer: DomSanitizer){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.similar = {} as Movies;
      this.tmdb.getMovie(params.id).subscribe(res => {
        this.movie = res;
        this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path;
        let description = this.movie.overview;
        if (description.length > 200) {
          description = description.substring(0, 200)+'...';
        };
        this.overview = description
      })

      this.tmdb.getMovieVideo(params.id).subscribe(data => {
        this.video = data;
        this.name = this.video?.results[0]?.name
        this.key = this.video?.results[0]?.key
        this.videoUrl = this.sanitazer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.key + '?showinfo=0&rel=0');
      })

      this.tmdb.getSimilar(params.id).subscribe(res => this.similar  = res);
      this.scrollTop();

    })
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

  scrollTop() {
    window.scrollTo({top: 0});
  }
}
