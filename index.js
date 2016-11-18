var apikey1="AIzaSyCJGnqOlGPCI9Eudvn-G3xmOBBxijRFgLE";//projecte sigueAltren Api1 NOVAAAAAAWEB
var apikey3="AIzaSyCOoWRux0uuTpcyxj-B4Y_4ECEJP7LCu4E";//projecte sigueAltren Api2 NOVAAAAAAWEB
var apikey2="AIzaSyC5s74_AK1O9FSErM4hmZgMLaXEEeWJTzI";//projecte geolocalization

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("b2").addEventListener("click", function(){
    //alert("Entrando en b2");
    importaJson();
});
/*$("#one").load(function() {
      importaJson();
});*/

function importaJson(){
    $(function(){

$.ajax({ 
  type : 'GET', 
  url : 'listaParadas.json', 
  async : false, 
  beforeSend : function(){/*loading*/},
  dataType : 'json', 
  success : function(result){
   var buffer="";
    $.each(result, function(index, val){ 

      for(var i=0; i < val.length; i++){ 
        var item = val[i]; 
        console.log(item.name);
        buffer+=" <li><a href='#"+item.name+"'>"+item.name+"</a></li> <li><a href='#"+item.command+"'>"+item.command+"</a></li>"; 
      } 
      $('#ul1').html(buffer);
    });
  }
 });
});
}


var latBcn=41.4024337; 
var longBcn=2.175109;
        
function initMap() {
  var bcn = new google.maps.LatLng(latBcn, longBcn);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: bcn,
    zoom: 16
  });
    
  var coordInfoWindow = new google.maps.InfoWindow();
  //coordInfoWindow.setContent(createInfoWindowContent(bcn, map.getZoom()));
  coordInfoWindow.setPosition(bcn);
  coordInfoWindow.open(map);

  map.addListener('zoom_changed', function() {
    coordInfoWindow.setContent(createInfoWindowContent(bcn, map.getZoom()));
    coordInfoWindow.open(map);
  });
    
    
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

        //coordInfoWindow.setPosition(pos);
        
        var marker = new google.maps.Marker({
        position: pos,
        map: map,
        });

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, coordInfoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, coordInfoWindow, map.getCenter());
  }

    /////////////////////////////////////////////////////////////////////
    
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  coordInfoWindow.setPosition(pos);
  coordInfoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}