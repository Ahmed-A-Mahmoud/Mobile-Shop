import { AngularFireDatabase } from 'angularfire2/database';
import { Smartphone } from './../../Models/smartphone.model';
import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/Services/SharingService.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-smartphone-details',
  templateUrl: './smartphone-details.component.html',
  styleUrls: ['./smartphone-details.component.css']
})
export class SmartphoneDetailsComponent implements OnInit {
  smartphone: Smartphone;
  userWallet: number;
  userstatus: string;
  constructor(public shareService: SharingService, public afDatabase: AngularFireDatabase, public router: Router, public snack: MatSnackBar) { }

  ngOnInit() {
    this.smartphone = this.shareService.getData("selectedSmartphone")
    this.userstatus = this.shareService.getData("userStatus")
    this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Wallet`).once('value').then(wallet => {
      if (wallet.exists()) {
        this.userWallet = wallet.val()
      }
    })
  }
  Purchase() {
    this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Wallet`).once('value').then(wallet => {
      let snackConfig = new MatSnackBarConfig()
      snackConfig.panelClass = ['black-snackbar']
      snackConfig.duration = 5000
      if (this.smartphone.approx_price_EUR <= wallet.val()) {
        wallet.ref.set(wallet.val() - parseInt(this.smartphone.approx_price_EUR))
        let purchase = {
          brand: this.smartphone.brand,
          img_url: this.smartphone.img_url,
          model: this.smartphone.model,
          price: this.smartphone.approx_price_EUR
        }
        wallet.ref.parent.child("Purchases").once('value').then(purchases => {
          if (purchases.exists()) {
            purchases.ref.child(`${purchases.numChildren()}`).set(purchase)
          }
          else {
            purchases.ref.child("0").set(purchase)
          }
        })
        this.snack.open(`Congratulations! You just bought ${this.smartphone.brand + ' ' + this.smartphone.model}`, null, snackConfig)
        this.router.navigate(['/'])
      }
      else {
        this.snack.open(`Oops! Looks like you don't have enough money to buy ${this.smartphone.brand + ' ' + this.smartphone.model}`, null, snackConfig)
      }
    })
  }
}
