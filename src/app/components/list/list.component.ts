import { Component, Input, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/model-api';


// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Autoplay, Navigation, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([ Autoplay, Navigation, Pagination]);

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit  {
  @Input() movies!: Movies;
  @Input() title!: string;
  config: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
    scrollbar: { draggable: true },
    autoplay: {
      delay: 2800
    },
    loop: true,
    breakpoints: {
      220: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 2,
      },
      800: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 6
      },
      1820: {
        slidesPerView: 8
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.config;
  }

}
