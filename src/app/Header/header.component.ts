import { SharingService } from 'src/app/Services/SharingService.service';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private _location: Location, private router: Router, private shareService: SharingService) { }
  ngOnInit() {    
  }
  onBackClicked() {
    this._location.back();
  }
  showLoginRegister() {
    return !this.router.url.toString().includes('/login-register') && this.shareService.getData('userStatus') !== "loggedin"
  }
  showOptions(){
    return this.shareService.getData('userStatus') == "loggedin"
  }
  onLogout() {
    this.shareService.cleanAll()
    this.router.navigate([''])
  }
}
