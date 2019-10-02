import {Component, ViewChild, ElementRef, NgZone} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {isUndefined} from "ionic-angular/util/util";
import {Geolocation} from "@ionic-native/geolocation";
declare var google;



@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  Destination: any = '';
  MyLocation: any;
  From:any = '';
  map: any;
  content: any;
  markers: any;
  gmarkers: Array<any>;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  loading: any;
  public directionsRender = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController,public zone: NgZone,
              public geolocation: Geolocation,
              public loadingCtrl: LoadingController) {this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadingCtrl.create();
  }

  DisplayAndAnimateRoute() {
    let here = this;
   
    this.clearMarkers();
    let directionsProvider = new google.maps.DirectionsService;
    let directionsRender = new google.maps.DirectionsRenderer;
    directionsRender.setMap(null); // clear direction from the map
    directionsRender.setPanel(null); // clear directionpanel from the map          
    directionsRender = new google.maps.DirectionsRenderer(); // this is to render again, otherwise your route wont show for the second time searching
    directionsRender.setPanel(document.getElementById('right-panel'));
    document.getElementById("right-panel").innerHTML = "";
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 53.350140, lng: -6.266155},
      draggable:false,
      // tilt:true,
      // scroll:true
    });
     directionsRender.setMap(map); 
    
    console.log("From :",this.From);

    if(this.From == null || this.From=='' ||this.From == isUndefined || this.From == 'My Location' || this.From == 'my location' || this.From == 'My location'){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          here.MyLocation = new google.maps.LatLng(pos);
          //alert(JSON.stringify(pos) );
        }, function() {

        });
      } else {
        // Browser doesn't support Geolocation
        // Give Notifications or your actions
      }
    }else{
      here.MyLocation = this.From;
    }

    //Animate Function maybe use for location
    function animateCircle(line) {
      let count = 0;
      window.setInterval(function() {
        count = (count + 1) % 200;
        let icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
      }, 60);
    }

    directionsProvider.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'BICYCLING'

    }, function(response, status) {

      if (status === 'OK') {
        
        directionsRender.setDirections(response);
        

        //In Response Draw polyline
        let polypath = response.routes[0].overview_polyline;

        //Just a circle with red background you can modify on your own/images
        let symbolOne = {
          path: 'M -2,0 0,-2 2,0 0,2 z',
          strokeColor: '#F00',
          fillColor: '#F00',
          fillOpacity: 1
        };


        let polyline = new google.maps.Polyline({

          path: google.maps.geometry.encoding.decodePath(polypath),
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          icons: [{
            icon: symbolOne,
            offset: '100%'
          }],
          map: map
        });
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < polyline.getPath().getLength(); i++) {
          bounds.extend(polyline.getPath().getAt(i));
        }

        animateCircle(polyline);
        map.fitBounds(bounds);
        console.log(response);

      } else {
        window.alert('Directions request failed. Please enter a more detailed address as address entered was not ' + status);
      }
    });
    
  }

  NightMode(){
    let here = this;
    let directionsProvider = new google.maps.DirectionsService;
    let directionsRender = new google.maps.DirectionsRenderer;
    //directionsRender.setPanel(this.directionsPanel.nativeElement);
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 53.350140, lng: -6.266155},
      draggable:false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
    directionsRender.setMap(map);
    console.log("From :",this.From);

    if(this.From == null || this.From=='' ||this.From == isUndefined || this.From == 'My Location' || this.From == 'my location' || this.From == 'My location'){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          here.MyLocation = new google.maps.LatLng(pos);

        }, function() {

        });
      } else {
        // Browser doesn't support Geolocation
        // Give Notifications or your actions
      }
    }else{
      here.MyLocation = this.From;
    }

    //Animate Function
    function animateCircle(line) {
      let count = 0;
      window.setInterval(function() {
        count = (count + 1) % 200;
        let icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
      }, 60);
    }

    directionsProvider.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'BICYCLING'

    }, function(response, status) {

      if (status === 'OK') {
        directionsRender.setDirections(response);
        //In Response Draw polyline
        let polypath = response.routes[0].overview_polyline;

        //Just a circle with red background you can modify on your own/images
        let symbolOne = {
          path: 'M -2,0 0,-2 2,0 0,2 z',
          strokeColor: '#F00',
          fillColor: '#F00',
          fillOpacity: 1
        };


        let polyline = new google.maps.Polyline({

          path: google.maps.geometry.encoding.decodePath(polypath),
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          icons: [{
            icon: symbolOne,
            offset: '100%'
          }],
          map: map
        });
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < polyline.getPath().getLength(); i++) {
          bounds.extend(polyline.getPath().getAt(i));
        }

        animateCircle(polyline);
        map.fitBounds(bounds);
        console.log(response);

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
DayMode(){
  let here = this;
  let directionsProvider = new google.maps.DirectionsService;
  let directionsRender = new google.maps.DirectionsRenderer;
  //directionsRender.setPanel(this.directionsPanel.nativeElement);
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 53.350140, lng: -6.266155},
    draggable:false,
  });
  directionsRender.setMap(map);
  console.log("From :",this.From);

  if(this.From == null || this.From=='' ||this.From == isUndefined || this.From == 'My Location' || this.From == 'my location' || this.From == 'My location'){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        here.MyLocation = new google.maps.LatLng(pos);

      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation
      // Give Notifications or your actions
    }
  }else{
    here.MyLocation = this.From;
  }

  //Animate Function
  function animateCircle(line) {
    let count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;
      let icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
    }, 60);
  }

  directionsProvider.route({
    origin: this.MyLocation,
    destination: this.Destination,
    travelMode: 'BICYCLING'

  }, function(response, status) {

    if (status === 'OK') {
      directionsRender.setDirections(response);
      //In Response Draw polyline
      let polypath = response.routes[0].overview_polyline;

      //Just a circle with red background you can modify on your own/images
      let symbolOne = {
        path: 'M -2,0 0,-2 2,0 0,2 z',
        strokeColor: '#F00',
        fillColor: '#F00',
        fillOpacity: 1
      };


      let polyline = new google.maps.Polyline({

        path: google.maps.geometry.encoding.decodePath(polypath),
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons: [{
          icon: symbolOne,
          offset: '100%'
        }],
        map: map
      });
      let bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < polyline.getPath().getLength(); i++) {
        bounds.extend(polyline.getPath().getAt(i));
      }

      animateCircle(polyline);
      map.fitBounds(bounds);
      console.log(response);

    } else {
      window.alert('Directions request failed due to:' + status);
    }
  });
}

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
      this.markers[i].setPanel(null);
    }
    this.markers = [];
  
  }

}
