import { Component, Input, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/model-api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit  {
  @Input() movies!: Movies;
  @Input() title!: string;
  height = 300;
  width = 8;

  constructor() { }

  ngOnInit(): void {
    this.heightinner();
    this.widthinner();
  }


  heightinner() {
    if (window.innerWidth < 900) {
      this.width = 3
    }
  }

  widthinner() {
    if (window.innerWidth < 900) {
      this.height = 200
    }
  }
}
