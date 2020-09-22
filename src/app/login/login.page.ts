import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { NavController, PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  code: string = "+1"; //default
  spin: boolean = false; //spinner
  otpSent: boolean = false; //OTP status

  recaptchaVerifier;
  confirmationResult: firebase.auth.ConfirmationResult;

  phoneNumber: string; //set value si OTP enviado

  constructor(public nav: NavController, public popoverController: PopoverController) {
    //guardar codigo pais
    setInterval(() => {
      if (sessionStorage.getItem("code")) {
        this.code = sessionStorage.getItem("code");
      }
    }, 100);
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }

  //Acceder a country-codes
  showCodes() {
    this.nav.navigateForward("/country-codes");
  }

  sendOTP() {
    var phNo = this.code + (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    this.spin = true;

    firebase.auth().signInWithPhoneNumber(phNo, this.recaptchaVerifier).then(result => {
      this.phoneNumber = phNo;
      this.otpSent = true;
      this.confirmationResult = result;
      this.spin = false;
    }).catch(err => {
      this.spin = false;
      alert(err);
    })
  }

  verifyOTP() {
    var otp = (<HTMLInputElement>document.getElementById("otp")).value;
    this.spin = true;

    this.confirmationResult.confirm(otp).then((data) => {
      this.spin = false;
      //guardar user uid en localStorage
      localStorage.setItem("uid", data.user.uid);
      //guardar phoneNumber en localStorage
      localStorage.setItem("phoneNumber", data.user.phoneNumber);

      //si user tiene nombre
      //ir a pagina home
      if (data.user.displayName) {
        this.nav.navigateRoot("/");
      }
      //ir a pagina setup
      else {
        this.nav.navigateRoot("/setup");
      }
    }).catch(err => {
      alert(err);
      this.spin = false;
    })
  }
}
