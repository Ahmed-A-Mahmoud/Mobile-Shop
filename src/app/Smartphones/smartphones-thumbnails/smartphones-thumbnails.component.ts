import { Smartphone } from '../../Models/smartphone.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/Services/SharingService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-smartphones-thumbnails',
  templateUrl: './smartphones-thumbnails.component.html',
  styleUrls: ['./smartphones-thumbnails.component.css']
})
export class SmartphonesThumbnailsComponent implements OnInit {
  smartphones: Array<Smartphone> = [];
  filteredsmartphones: Array<Smartphone> = [];
  smartphoneSubscription: Subscription
  brands = [];
  p: number = 1;
  searchValue = '';
  constructor(public afDatabase: AngularFireDatabase, public router: Router, public shareService: SharingService) { }
  ngOnInit() {
    this.smartphoneSubscription = this.afDatabase.object('Smartphones').snapshotChanges().subscribe(smartphonesSnapshot => {
      this.smartphones = <Smartphone[]>smartphonesSnapshot.payload.val()
      this.filteredsmartphones = this.smartphones
    })
    this.brands = [
      {
        name: 'Acer',
        checked: false
      },
      {
        name: 'alcatel',
        checked: false
      },
      {
        name: 'Allview',
        checked: false
      },
      {
        name: 'Amazon',
        checked: false
      },
      {
        name: 'Amoi',
        checked: false
      },
      {
        name: 'Apple',
        checked: false
      },
      {
        name: 'Archos',
        checked: false
      },
      {
        name: 'Asus',
        checked: false
      },
      {
        name: 'AT&T',
        checked: false
      },
      {
        name: 'Benefon',
        checked: false
      },
      {
        name: 'BenQ',
        checked: false
      },
      {
        name: 'BenQ-Siemens',
        checked: false
      },
      {
        name: 'Bird',
        checked: false
      },
      {
        name: 'BlackBerry',
        checked: false
      },
      {
        name: 'BLU',
        checked: false
      },
      {
        name: 'Bosch',
        checked: false
      },
      {
        name: 'BQ',
        checked: false
      },
      {
        name: 'Casio',
        checked: false
      },
      {
        name: 'Cat',
        checked: false
      },
      {
        name: 'Celkon',
        checked: false
      },
      {
        name: 'Chea',
        checked: false
      },
      {
        name: 'Coolpad',
        checked: false
      },
      {
        name: 'Dell',
        checked: false
      },
      {
        name: 'Emporia',
        checked: false
      },
      {
        name: 'Energizer',
        checked: false
      },
      {
        name: 'Ericsson',
        checked: false
      },
      {
        name: 'Eten',
        checked: false
      },
      {
        name: 'Fujitsu Siemens',
        checked: false
      },
      {
        name: 'Garmin-Asus',
        checked: false
      },
      {
        name: 'Gigabyte',
        checked: false
      },
      {
        name: 'Gionee',
        checked: false
      },
      {
        name: 'Google',
        checked: false
      },
      {
        name: 'Haier',
        checked: false
      },
      {
        name: 'HP',
        checked: false
      },
      {
        name: 'HTC',
        checked: false
      },
      {
        name: 'Huawei',
        checked: false
      },
      {
        name: 'i-mate',
        checked: false
      },
      {
        name: 'i-mobile',
        checked: false
      },
      {
        name: 'Icemobile',
        checked: false
      },
      {
        name: 'Innostream',
        checked: false
      },
      {
        name: 'iNQ',
        checked: false
      },
      {
        name: 'Intex',
        checked: false
      },
      {
        name: 'Jolla',
        checked: false
      },
      {
        name: 'Karbonn',
        checked: false
      },
      {
        name: 'Kyocera',
        checked: false
      },
      {
        name: 'Lava',
        checked: false
      },
      {
        name: 'LeEco',
        checked: false
      },
      {
        name: 'Lenovo',
        checked: false
      },
      {
        name: 'LG',
        checked: false
      },
      {
        name: 'Maxon',
        checked: false
      },
      {
        name: 'Maxwest',
        checked: false
      },
      {
        name: 'Meizu',
        checked: false
      },
      {
        name: 'Micromax',
        checked: false
      },
      {
        name: 'Microsoft',
        checked: false
      },
      {
        name: 'Mitac',
        checked: false
      },
      {
        name: 'Mitsubishi',
        checked: false
      },
      {
        name: 'Modu',
        checked: false
      },
      {
        name: 'Motorola',
        checked: false
      },
      {
        name: 'MWg',
        checked: false
      },
      {
        name: 'NEC',
        checked: false
      },
      {
        name: 'Neonode',
        checked: false
      },
      {
        name: 'NIU',
        checked: false
      },
      {
        name: 'Nokia',
        checked: false
      },
      {
        name: 'Nvidia',
        checked: false
      },
      {
        name: 'O2',
        checked: false
      },
      {
        name: 'OnePlus',
        checked: false
      },
      {
        name: 'Oppo',
        checked: false
      },
      {
        name: 'Orange',
        checked: false
      },
      {
        name: 'Palm',
        checked: false
      },
      {
        name: 'Panasonic',
        checked: false
      },
      {
        name: 'Pantech',
        checked: false
      },
      {
        name: 'Parla',
        checked: false
      },
      {
        name: 'Philips',
        checked: false
      },
      {
        name: 'Plum',
        checked: false
      },
      {
        name: 'Posh',
        checked: false
      },
      {
        name: 'Prestigio',
        checked: false
      },
      {
        name: 'QMobile',
        checked: false
      },
      {
        name: 'Qtek',
        checked: false
      },
      {
        name: 'Sagem',
        checked: false
      },
      {
        name: 'Samsung',
        checked: false
      },
      {
        name: 'Sendo',
        checked: false
      },
      {
        name: 'Sewon',
        checked: false
      },
      {
        name: 'Sharp',
        checked: false
      },
      {
        name: 'Siemens',
        checked: false
      },
      {
        name: 'Sonim',
        checked: false
      },
      {
        name: 'Sony',
        checked: false
      },
      {
        name: 'Sony Ericsson',
        checked: false
      },
      {
        name: 'Spice',
        checked: false
      },
      {
        name: 'T-Mobile',
        checked: false
      },
      {
        name: 'Tel.Me.',
        checked: false
      },
      {
        name: 'Telit',
        checked: false
      },
      {
        name: 'Thuraya',
        checked: false
      },
      {
        name: 'Toshiba',
        checked: false
      },
      {
        name: 'Unnecto',
        checked: false
      },
      {
        name: 'Vertu',
        checked: false
      },
      {
        name: 'verykool',
        checked: false
      },
      {
        name: 'vivo',
        checked: false
      },
      {
        name: 'VK Mobile',
        checked: false
      },
      {
        name: 'Vodafone',
        checked: false
      },
      {
        name: 'Wiko',
        checked: false
      },
      {
        name: 'WND',
        checked: false
      },
      {
        name: 'XCute',
        checked: false
      },
      {
        name: 'Xiaomi',
        checked: false
      },
      {
        name: 'XOLO',
        checked: false
      },
      {
        name: 'Yezz',
        checked: false
      },
      {
        name: 'Yota',
        checked: false
      },
      {
        name: 'YU',
        checked: false
      },
      {
        name: 'ZTE',
        checked: false
      }
    ]
  }

  ViewPhone(selectedSmartphone: Smartphone) {
    this.shareService.setData("selectedSmartphone", selectedSmartphone)
    this.router.navigate(['/details'])
  }

  toggle(event: Event) {
    this.searchValue = ''
    this.brands.forEach(brand => {
      if (brand.name === event['source']['name']) {
        brand.checked = event['checked']
      }
    })
    this.filteredsmartphones = []
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
  searchPhones() {
    this.filteredsmartphones = []
    let filtered = false
    this.smartphones.forEach(smartphone => {
      if ((smartphone.brand + ' ' + smartphone.model).toLowerCase().includes(this.searchValue.toLowerCase())) {
        filtered = true
        this.filteredsmartphones.push(smartphone)
      }
    })
    if (!filtered) {
      this.filteredsmartphones = this.smartphones
    }
  }
  checkBrands() {
    let checked = false
    this.brands.forEach(brand => {
      if (brand.checked && !checked) {
        checked = true
      }
    })
    if (checked) {
      return true
    }
    else {
      return false
    }
  }
}
