import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from "firebase";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  categories: Array<any> = [
    {
      name: "Computadores de mesa",
      icon: "desktop-outline",
      color: "danger"
    },
    {
      name: "Portátiles",
      icon: "laptop-outline",
      color: "success"
    }
    ,
    {
      name: "Accesorios",
      icon: "headset-outline",
      color: "warning"
    },
    {
      name: "Componentes de PC",
      icon: "construct-outline",
      color: "secondary"
    }
  ]
  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  exploreCategory(name) {
    sessionStorage.setItem("categoryName", name);
    this.nav.navigateForward("/category");
  }

}
