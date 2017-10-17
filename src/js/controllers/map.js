angular
  .module('App', ['uiGmapgoogle-maps']).config(
    ['uiGmapgoogle-mapsProvider', function(GoogleMapApiProviders){
    GoogleMapApiProviders.configure({
      china = true
    });
  }]
);
