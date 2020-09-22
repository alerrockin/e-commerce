import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public nav: NavController,
  ) {
    this.initializeApp();

    const firebaseConfig = {
    apiKey: "AIzaSyCmMJLiFMpYTVXWCvFxB3AJKeYYJPbQ_5g",
    authDomain: "e-commerce-uni1.firebaseapp.com",
    databaseURL: "https://e-commerce-uni1.firebaseio.com",
    projectId: "e-commerce-uni1",
    storageBucket: "e-commerce-uni1.appspot.com",
    messagingSenderId: "818059095235",
    appId: "1:818059095235:web:23ab893c367d505f344676",
    measurementId: "G-0JV3QVQHXL"
    };
    firebase.initializeApp(firebaseConfig);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.checkUser();
    });
  }

  checkUser() {
    if(localStorage.getItem("uid")){
      this.nav.navigateRoot("/");
    }
    else{
      this.nav.navigateRoot("/login");
    }
  }
}
