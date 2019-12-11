import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hide-navbar',
  templateUrl: './hide-navbar.component.html',
  styleUrls: ['./hide-navbar.component.css']
})

// this component is for navbar where there are no options
// this is created so that the router link is easy to build with different navbars
export class HideNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
