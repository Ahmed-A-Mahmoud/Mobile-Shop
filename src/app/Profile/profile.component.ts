import { AngularFireDatabase } from 'angularfire2/database';
import { SharingService } from './../Services/SharingService.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('depositform') depositForm: NgForm;
  @ViewChild('withdrawform') withdrawForm: NgForm;
  userSubscription : Subscription
  user = {};
  isWalletManaged = false;
  constructor(private shareService: SharingService, private afDatabase: AngularFireDatabase) { }
  ngOnInit() {
    this.userSubscription = this.afDatabase.object(`Users/Regular/${this.shareService.getData("userId")}`).snapshotChanges().subscribe(userdata => {
      if (userdata.payload.exists()) {
        this.user = userdata.payload.val()
      }
    })
  }
  manageWallet() {
    this.isWalletManaged = !this.isWalletManaged
  }
  onDeposit() {
    let walletRef = this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Wallet`)
    walletRef.set(this.user['Wallet'] + Number(this.depositForm.value['deposit value']))
  }
  onWithdraw() {
    if (this.user['Wallet'] >= Number(this.withdrawForm.value['withdraw value'])) {
      let walletRef = this.afDatabase.database.ref(`Users/Regular/${this.shareService.getData("userId")}/Wallet`)
      walletRef.set(this.user['Wallet'] - Number(this.withdrawForm.value['withdraw value']))
    }
    else{
      this.withdrawForm.reset()
    }
  }
  onPhoneViewed() {

  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }
}
