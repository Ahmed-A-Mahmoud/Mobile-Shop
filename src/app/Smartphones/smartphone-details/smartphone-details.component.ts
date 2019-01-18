import { AngularFireDatabase } from 'angularfire2/database';
import { Smartphone } from './../../Models/smartphone.model';
import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/Services/SharingService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-smartphone-details',
  templateUrl: './smartphone-details.component.html',
  styleUrls: ['./smartphone-details.component.css']
})
export class SmartphoneDetailsComponent implements OnInit {
  smartphone: Smartphone;
  userWallet: number;
  userstatus: string;
  constructor(private shareService: SharingService, private afDatabase: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.smartphone = this.shareService.getData("selectedSmartphone")
    this.userstatus = this.shareService.getData("userStatus")
    this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Wallet`).once('value').then(wallet=>{
      if(wallet.exists()){
        this.userWallet = wallet.val()
      }
    })
  }
  onPurchase() {
    this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Wallet`).once('value').then(wallet => {
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
          else{
            purchases.ref.child("0").set(purchase)
          }
        })
        console.log("Purchase complete");
        this.router.navigate(['/'])
      }
      else {
        console.log("Purchase failed");
      }
    })
  }
}
