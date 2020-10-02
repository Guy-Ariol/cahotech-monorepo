import { Component, OnInit, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

declare var google

@Component({
  selector: 'google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  @Output() onPlaceAvailable = new EventEmitter
  @Input() placeholder = ''

  value

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone

  ) { }

  ngOnInit (): void {
    setTimeout(() => {
      this.initializeGoogleMaps()
    }, 500);
  }


  initializeGoogleMaps () {
    this.mapsAPILoader.load().then(() => {
      try {
        let nativeHomeInputBox = <HTMLInputElement>document.getElementById('address')

        let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
          // types: ["geocode"],
          // componentRestrictions: { 'country': 'cmr' }
        })

        autocomplete.setFields(['address_component']);

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {

            //get the place result
            let place = autocomplete.getPlace();
            // console.log(place)

            //verify result
            if (!place) {
              return;
            }

            let location = place.address_components[0].long_name + ', ' + place.address_components[1].long_name + ', ' + place.address_components[place.address_components.length - 1].long_name
            // console.log(this.value)

            this.onPlaceAvailable.emit(location)
          });
        });
      } catch (error) {

      }
    })
  }

  log(arg){
    console.log(arg);

  }
}
