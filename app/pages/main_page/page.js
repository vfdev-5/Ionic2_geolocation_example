import {Page, NavController, Toast} from 'ionic-angular';
import {Geolocation} from 'ionic-native';


// let PositionError = {};
let PERMISSION_DENIED = 1;
let POSITION_UNAVAILABLE = 2;
let TIMEOUT = 3;

@Page({
  templateUrl: 'build/pages/main_page/page.html'

})
export class MainPage {
  static get parameters() {
    return [[NavController]];
  }
  constructor(nav) {
    this.map = null;
    this.nav = nav;
    this.options = {
      timeout: 5000,
      enableHighAccuracy: false,
      maximumAge: 60000
    }
  }

  showToast(msg) {
    let toast = Toast.create({
      message: msg,
      duration: 2000
    });
    this.nav.present(toast);
  }


  onPageLoaded() {

    let myLatlng = new google.maps.LatLng(43.07493,-89.381388);
    let mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    this.map = map;

  }

  centerOnMe() {

    console.log('Center on me');
    if (!this.map) {
      return;
    }

    this.showToast("Demand a geolocation with options : timeout=" + this.options.timeout + ", high accuracy=" + this.options.enableHighAccuracy);

    Geolocation.getCurrentPosition(this.options)
      .then((resp) => {
        console.log("Geolocation : " + resp.coords.latitude + ", " + resp.coords.longitude);
        // center on the location
        this.map.setCenter({lat: resp.coords.latitude, lng: resp.coords.longitude});
        this.showToast("Your location is : "+ resp.coords.longitude + ", " + resp.coords.latitude);
      })
      .catch((error) => {
        console.log("Failed to get Geolocation, errors :" + Geolocation.PERMISSION_DENIED + ", " + Geolocation.POSITION_UNAVAILABLE + ", " + Geolocation.TIMEOUT);
        console.log(error);
        if (error.code == PERMISSION_DENIED) {
          console.log("On permission denied -> REPORT TO DEV");
          this.showToast("On permission denied -> REPORT TO DEV");
        } else if ( error.code == POSITION_UNAVAILABLE ) {
          console.log("On position unavailable -> switch on location, activate gps, wifi network");
          this.showToast("On position unavailable -> switch on location, activate gps, wifi network");
        } else if ( error.code == TIMEOUT ) {
          console.log("On timeout -> switch on location, activate gps, wifi network -> wait");
          this.showToast("On timeout -> switch on location, activate gps, wifi network -> wait");
        }
      });
  }



}
