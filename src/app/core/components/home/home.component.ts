import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit() {
  }

  direct(){
    console.log("sggg");
    this.http.post("http://localhost:3000/products/some", {body: "anything"})
      .subscribe(res => {
        console.log(res);
      })
  }
 
}
