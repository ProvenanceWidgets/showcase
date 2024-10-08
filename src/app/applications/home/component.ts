import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: "home",
  templateUrl: "./component.html",
  providers: [],
  styleUrls: ["./component.scss"],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private location: Location) {
  }

  ngOnInit(): void { }

  navigateToRoute(route:string){
    const url = `${window.location.origin}/showcase/#/${route}`;
    window.open(url, '_blank');
  }
}
