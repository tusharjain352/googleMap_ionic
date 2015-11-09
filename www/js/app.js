var exampleApp=angular.module('starter', ['ionic'])

exampleApp.controller('MapController', function($scope, $ionicLoading) {
    $scope.loc="";
    /*google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
            map.setCenter(new google.maps.LatLng(28.4211, 77.3078));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(28.4211, 77.3078),
                map: map,
                title: "My Location"
            });
       
        $scope.map = map;
    });*/
     var map = null;
        var geocoder = null;
        var initialize=function() {
          if (GBrowserIsCompatible()) {
            map = new GMap2(document.getElementById("map_canvas"));
            map.setCenter(new GLatLng(37.4419, -122.1419), 1);
            map.setUIToDefault();
            geocoder = new GClientGeocoder();
          }
        }
        initialize();
    $scope.getLocation=function(address){
      if (geocoder) {
        geocoder.getLatLng(address,function(point) {
            if (!point) {
              alert(address + " not found");
            } else {
              map.setCenter(point, 15);
              var marker = new GMarker(point, {draggable: true});
              map.addOverlay(marker);
              GEvent.addListener(marker, "dragend", function() {
                marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
              });
              GEvent.addListener(marker, "click", function() {
                marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
              });
              GEvent.trigger(marker, "click");
            }
          });
      }
    }

});
