import { Smartphone } from '../../Models/smartphone.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/Services/SharingService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-smartphones-thumbnails',
  templateUrl: './smartphones-thumbnails.component.html',
  styleUrls: ['./smartphones-thumbnails.component.css']
})
export class SmartphonesThumbnailsComponent implements OnInit, OnDestroy {
  smartphones: Array<Smartphone> = [];
  smartphoneSubscription: Subscription
  constructor(private afDatabase: AngularFireDatabase, private router: Router, private shareService: SharingService) { }
  ngOnInit() {
    this.smartphoneSubscription = this.afDatabase.object('Smartphones').snapshotChanges().subscribe(smartphonesSnapshot => {
      this.smartphones = <Smartphone[]>smartphonesSnapshot.payload.val()
    })
  }

  onPhoneViewed(selectedSmartphone: Smartphone) {
    this.shareService.setData("selectedSmartphone", selectedSmartphone)
    this.router.navigate(['/details'])
  }

  ngOnDestroy(){
    this.smartphoneSubscription.unsubscribe()
  }
}
