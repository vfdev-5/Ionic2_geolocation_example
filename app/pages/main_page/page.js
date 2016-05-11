import {Page} from 'ionic-angular';
import {Geolocation} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/main_page/page.html'
})
export class MainPage {
  constructor() {
    this.map = null;
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

    // let contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    // let compiled = $compile(contentString)($scope);

    this.map = map;

  }

  centerOnMe() {

    console.log('Center on me');
    if (!this.map) {
      return;
    }

    let options = {timeout: 5000, enableHighAccuracy: true, maximumAge: 60000}; // maximumAge in millis (one minute ago)
    Geolocation.getCurrentPosition().then(
      (resp) => {
        console.log("Geolocation : " + resp.coords.latitude + ", " + resp.coords.longitude);
        // center on the location
        this.map.setCenter({lat: resp.coords.latitude, lng: resp.coords.longitude});
      },
      (error) => {
        console.log("Failed to get Geolocation");
        console.log(error);
        // this.geoloc.setPosition({lat: 1000.0, lng: 1000.0});
        // Dialogs.alert("Nirioo a échoué d'obtenir votre position geographique. Essayez d'activer la géolocalisation", "Position géographique", "OK");

      },
      options
    );

  }



}
