import { AngularFireDatabase } from 'angularfire2/database';
import { SharingService } from './../Services/SharingService.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('depositform') depositForm: NgForm;
  @ViewChild('withdrawform') withdrawForm: NgForm;
  @ViewChild('addressform') addressForm: NgForm;
  @ViewChild('phoneform') phoneForm: NgForm;
  userSubscription: Subscription
  user : User;
  isWalletManaged = false;
  showAddressFrom = false;
  showPhoneFrom = false;
  constructor(public shareService: SharingService, public afDatabase: AngularFireDatabase, public router: Router) { }
  ngOnInit() {
    this.userSubscription = this.afDatabase.object(`Users/Regular/${this.shareService.getData("userId")}`).snapshotChanges().subscribe(userdata => {
      if (userdata.payload.exists()) {
        this.user = <User>userdata.payload.val()
      }
    })
  }
  manageWallet() {
    this.isWalletManaged = !this.isWalletManaged
  }
  Deposit() {
    let walletRef = this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Wallet`)
    walletRef.set(this.user['Wallet'] + Number(this.depositForm.value['deposit value']))
    this.depositForm.reset()
  }
  Withdrawal() {
    if (this.user['Wallet'] >= Number(this.withdrawForm.value['withdraw value'])) {
      let walletRef = this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Wallet`)
      walletRef.set(this.user['Wallet'] - Number(this.withdrawForm.value['withdraw value']))
      this.withdrawForm.reset()
    }
    else {
      this.withdrawForm.reset()
    }
  }
  ViewPhone(purchase) {
    this.afDatabase.database.ref('Smartphones').once('value').then(smartphones => {
      if (smartphones.exists()) {
        smartphones.forEach(smartphone => {
          if (smartphone.child('brand').val() === purchase.brand && smartphone.child('model').val() === purchase.model) {
            this.shareService.setData('selectedSmartphone', smartphone)
            this.router.navigate(['details'])
          }
        })
      }
    })
  }
  toggleAddAddress() {
    this.showAddressFrom = !this.showAddressFrom
  }
  addAddress() {
    this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Address`).set(this.addressForm.value['address'])
  }
  toggleAddPhone() {
    this.showPhoneFrom = !this.showPhoneFrom
  }
  addPhone() {
    this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Phone`).set(this.phoneForm.value['phone'])
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
}
