import { SharingService } from './../Services/SharingService.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase'
import { User } from '../Models/user.model';

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.css']
})
export class LoginRegisterFormComponent implements OnInit {
  @ViewChild('loginform') loginForm: NgForm;
  @ViewChild('registrationform') registrationForm: NgForm;
  user : User;
  isLoggedin = false;
  isSubmitted = false;
  errorMessage = ''
  constructor(public route: ActivatedRoute, public afDatabase: AngularFireDatabase, public shareService: SharingService, public router: Router) { }
  ngOnInit() {
  }
  Login() {
    this.isSubmitted = true;
    this.user.Email = this.loginForm.value["login email"]
    firebase.auth().signInWithEmailAndPassword(this.loginForm.value['login email'], this.loginForm.value['login password'])
      .then(UserCredential => {
        this.shareService.setData('userId', UserCredential.user.uid)
        this.shareService.setData('userStatus', 'loggedin')
        this.isLoggedin = true;
        this.router.navigate([''])
      })
      .catch(error => {
        if (error.code === "auth/user-not-found") {
          this.errorMessage = "Wrong E-mail"
        }
        else if (error.code === "auth/wrong-password") {
          this.errorMessage = "Wrong Password"
        }
      });
    this.loginForm.reset();
  }
  Registration() {
    this.isSubmitted = true;
    this.user.Firstname = this.registrationForm.value["firstname"]
    this.user.Lastname = this.registrationForm.value["lastname"]
    this.user.Address = this.registrationForm.value["address"] !== null ? this.registrationForm.value["address"] : ''
    this.user.Phone = this.registrationForm.value["phone"] !== null ? this.registrationForm.value["phone"] : ''
    this.user.Email = this.registrationForm.value["registration email"]
    firebase.auth().createUserWithEmailAndPassword(this.registrationForm.value['registration email'], this.registrationForm.value['registration password'])
      .then(UserCredential => {
        this.afDatabase.database.ref(`Users/Regular/${UserCredential.user.uid}`).set(this.user)
        this.shareService.setData('userId', UserCredential.user.uid)
        this.shareService.setData('userStatus', 'loggedin')
        this.isLoggedin = true;
        this.router.navigate([''])
      })
      .catch(error => {
        console.log(error);
      });
    this.registrationForm.reset();
  }
}
