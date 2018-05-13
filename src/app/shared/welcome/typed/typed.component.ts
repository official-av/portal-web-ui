import {Component, OnInit} from '@angular/core';
import * as Typed from 'typed.js';

@Component({
  selector: 'app-typed',
  templateUrl: './typed.component.html',
  styleUrls: ['./typed.component.scss']
})
export class TypedComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      loop: true,
      loopCount: Infinity,
      backSpeed: 30,
      typeSpeed: 50,
      backDelay: 1000
    });
  }

}
