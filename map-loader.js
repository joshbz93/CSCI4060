"use strict";

var map;
var conn;
var marker;
var geocodeResults;

function initMap() {
  var mark = {lat: 37.0902, lng: -95.7129};
  map = new google.maps.Map(document.getElementById('map'), {
    center: mark,
    zoom: 4
  });
  var geocoder = new google.maps.Geocoder();
  conn = dbConnection();
  connectToDatabase();

  document.getElementById('submit').addEventListener('click', () => geocodeAddress(geocoder, map));
  document.getElementById('next').addEventListener('click', () => saveMarker());
}

function geocodeAddress(geocoder, resultsMap) {
  let address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, (results, status) => {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);

      geocodeResults = results;
      marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function connectToDatabase(){
  conn.connect((err) => {
    if(err){
      console.log('Database connection error');
    }else{
      console.log('Database connection successful');
    }
  });
}

function saveMarker() {
  let address = geocodeResults[0].formatted_address;
  let lat = geocodeResults[0].geometry.location.lat();
  let long = geocodeResults[0].geometry.location.lng();

  conn.query("INSERT INTO markers(address, lat, lng) VALUES(?,?,?)",[address,lat,long], (error, results, fields) => {
    if (error) {
      return console.log("An error occurred with the query", error);
    }
    console.log('The solution is: ');
  });
}
