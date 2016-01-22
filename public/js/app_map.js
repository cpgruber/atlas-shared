// L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
// var map = L.mapbox.map('map', 'mapbox.streets');
//
// var geocoderOptions = {
//   bounds: true,
//   markers: false,
//   layers: 'coarse',
//   expanded:true
// }
//
// var geocoder = L.control.geocoder('search-R7-i3bQ',geocoderOptions).addTo(map);
// var geocontainer = document.getElementById("geocontainer")
// geocontainer.appendChild(geocoder.getContainer());
//
// geocoder.on("results", function(e){
//   console.log(e)
// })
//
// geocoder.on("select", function(e){
//   var geo = this;
//   $.getJSON("http://localhost:3000/checkPlace?q="+e.feature.properties.label)
//     .then(function(result){
//       var sw = result.bounds.southwest;
//       var ne = result.bounds.northeast;
//       var southWest = L.latLng(sw.lat, sw.lng),
//            northEast = L.latLng(ne.lat, ne.lng),
//            bounds = L.latLngBounds(southWest, northEast);
//       map.fitBounds(bounds)
//       geo.options.bounds = bounds;
//     })
// })
//
// var feats = L.featureGroup().addTo(map);
// var pending = L.featureGroup().addTo(map);
//
// map.on("click", function(evt){
//   pending.clearLayers();
//   var coords = [evt.latlng.lat,evt.latlng.lng];
//   var popup = makeForm(coords);
//   var marker = L.marker(coords, {draggable:true})
//                   .bindPopup(popup)
//                   .addTo(pending);
//   marker.openPopup();
// })
//
// function makeForm(latlng){
//   var form = document.createElement("div");
//   form.className = "popup-form";
//   var createdBy = document.createElement("input");
//   createdBy.type = "text";
//   createdBy.name = "createdBy";
//   form.appendChild(createdBy);
//   var desc = document.createElement("input");
//   desc.type = "text";
//   desc.name = "desc";
//   form.appendChild(desc);
//   var button = document.createElement("button")
//   button.type="submit";
//   button.textContent = "submit";
//   button.className="popup-form-submit";
//   form.appendChild(button);
//
//   button.addEventListener("click", function(){
//     var params = {
//       coords: latlng,
//       createdBy: createdBy.value,
//       desc: desc.value
//     }
//     popupSubmit(params);
//   })
//   return form;
// }
//
// function addToFeats(point){
//   var marker = L.marker(point.coords)
//                   .bindPopup(point.desc)
//                   .addTo(feats);
// }
//
// function getAllPoints(){
//   $.getJSON("http://localhost:3000/locations.json")
//     .then(function(points){
//       feats.clearLayers();
//       points.forEach(function(point){
//         addToFeats(point);
//       })
//     })
// }
//
// function addToTripList(trip){
//   var trips = document.querySelector(".trips");
//   var container = document.createElement("div");
//   var tID = document.createAttribute("data-trip-id");
//   tID.value = trip._id;
//   container.setAttributeNode(tID);
//   container.className = "trip";
//   container.className = 'trip-container';
//   container.innerHTML = trip.title+"<br>"+trip.locale+"<br>"+trip.desc;
//   container.addEventListener("click", function(){
//     if ($(this).hasClass("selected")){
//       $(this).removeClass("selected");
//       getAllPoints();
//     }else{
//       $(".selected").removeClass("selected");
//       $(this).addClass("selected");
//       getTripPoints(trip._id)
//     }
//   })
//   trips.appendChild(container);
// }
//
// function getAllTrips(){
//   $.getJSON("http://localhost:3000/trips.json")
//     .then(function(trips){
//       trips.forEach(function(trip){
//         addToTripList(trip);
//       })
//     })
// }
//
// function getTripPoints(tripId){
//   $.getJSON("http://localhost:3000/trips/"+tripId+".json")
//     .then(function(points){
//       feats.clearLayers();
//       points.forEach(function(point){
//         addToFeats(point);
//       })
//     })
// }
//
// function popupSubmit(params){
//   var tripId = $(".selected").attr("data-trip-id");
//   params.tripId = tripId;
//   return $.ajax({
//     method:"post",
//     data:params,
//     dataType:"json",
//     url:"http://localhost:3000/locations.json"
//   }).then(function(data){
//     addToFeats(data);
//     pending.clearLayers();
//   })
// }
//
// function tripSubmit(params){
//   return $.ajax({
//     method:"post",
//     data:params,
//     dataType:"json",
//     url:"http://localhost:3000/trips.json"
//   }).then(function(data){
//     addToTripList(data);
//    $(".trip-form input").val("");
//  })
// }
//
// $(".trip-form button").on("click", function(){
//   var params = {
//     locale: $(".trip-form input[name=locale]").val(),
//     title: $(".trip-form input[name=title]").val(),
//     desc: $(".trip-form input[name=desc]").val()
//   }
//   tripSubmit(params);
// })
//
// $(document).ready(function(){
//   getAllPoints();
//   getAllTrips();
// })
