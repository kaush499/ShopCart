import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-navbar',
  templateUrl: './show-navbar.component.html',
  styleUrls: ['./show-navbar.component.css']
})

// this component is for navbar where all the options are present
// this is created so that the router link is easy to build with different navbars
export class ShowNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
