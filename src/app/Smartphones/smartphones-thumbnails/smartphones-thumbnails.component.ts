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
  filteredsmartphones: Array<Smartphone> = [];
  smartphoneSubscription: Subscription
  brands = []
  constructor(public afDatabase: AngularFireDatabase, public router: Router, public shareService: SharingService) { }
  ngOnInit() {
    this.smartphoneSubscription = this.afDatabase.object('Smartphones').snapshotChanges().subscribe(smartphonesSnapshot => {
      this.smartphones = <Smartphone[]>smartphonesSnapshot.payload.val()
      this.smartphones.forEach(smartphone=>{
      })
      this.filteredsmartphones = this.smartphones
    })
    this.brands = [
      {
        name: 'Acer',
        checked: false
      }, {
        name: 'Apple',
        checked: false
      }, {
        name: 'BlackBerry',
        checked: false
      }, {
        name: 'Ericsson',
        checked: false
      }, {
        name: 'HTC',
        checked: false
      }, {
        name: 'Huawei',
        checked: false
      }, {
        name: 'Lenovo',
        checked: false
      }, {
        name: 'LG',
        checked: false
      }, {
        name: 'Microsoft',
        checked: false
      }, {
        name: 'Motorola',
        checked: false
      }, {
        name: 'Nokia',
        checked: false
      }, {
        name: 'OnePlus',
        checked: false
      }, {
        name: 'Oppo',
        checked: false
      }, {
        name: 'Panasonic',
        checked: false
      }, {
        name: 'Samsung',
        checked: false
      }, {
        name: 'Sony',
        checked: false
      }, {
        name: 'Xiaomi',
        checked: false
      },
    ]
  }

  ViewPhone(selectedSmartphone: Smartphone) {
    this.shareService.setData("selectedSmartphone", selectedSmartphone)
    this.router.navigate(['/details'])
  }

  toggle(event: Event) {
    this.filteredsmartphones = []
    this.brands.forEach(brand => {
      if (brand.name === event['source']['name']) {
        brand.checked = event['checked']
      }
    })
    let filtered = false
    this.smartphones.forEach(smartphone => {
      this.brands.forEach(brand => {
        if (smartphone.brand === brand.name && brand.checked === true) {
          filtered = true
          this.filteredsmartphones.push(smartphone)
        }
      })
    })
    if (!filtered) {
      this.filteredsmartphones = this.smartphones
    }
  }

  ngOnDestroy() {
    this.smartphoneSubscription.unsubscribe()
  }
}
