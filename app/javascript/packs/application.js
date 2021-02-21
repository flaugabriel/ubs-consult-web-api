// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
require('jquery')
Rails.start()
Turbolinks.start()
ActiveStorage.start()


document.addEventListener("turbolinks:load", () => {
  $(document).ready(function () {
    initMap()

    $('#search').keyup(function () {
      var nomeFiltro = $(this).val().toUpperCase();

      $('.card-flex').find('div').each(function () {
        var conteudoCelula = $(this).find('h5').text();

        var corresponde = conteudoCelula.toUpperCase().indexOf(nomeFiltro) >= 0;
        $(this).css('display', corresponde ? '' : 'none');
      });
    });
  });
});



function initMap() {
  var mapCanvas = document.getElementById('map');

  $.ajax({
    dataType: 'JSON',
    method: 'get',
    url: 'api/v1/find_ubs?query=-23.604936,-46.692999&page=1&per_page=10',
    success: function (json) {
      var infoWindow = new google.maps.InfoWindow();

      var mapOptions = {
        center: new google.maps.LatLng(-23.604936, -46.692999),
        zoom: 13,
      }
     
      buildCard(json)

      var map = new google.maps.Map(mapCanvas, mapOptions);
      var infoWindow = new google.maps.InfoWindow();
      
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-23.604936, -46.692999),
        center: new google.maps.LatLng(-23.604936, -46.692999),
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        title: "Estou aqui",
        draggable: true,
        map: map
      });
    
      for (let i = 0; i < json.entries.length; i++) {
        var data = json.entries[i],
          latLng = new google.maps.LatLng(data.geocode.lat, data.geocode.long);

        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: data.name
        });

        const contentString =
          '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          "<h5 id='firstHeading' class='firstHeading text-info'>" + data.name + "</h5>" +
          '<div id="bodyContent">' +
          "<p>" + data.address + "<b></b>,</p>" +
          "</div>" +
          "</div>";

        (function (marker, data) {
          google.maps.event.addListener(marker, "click", function (e) {
            infoWindow.setContent(contentString);
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);
          });
        })(marker, data);
      }
    },
    error: function (err) {
      console.warn('Error: %s', err);
    }
  })
}

function buildCard(data) {
  for (let index = 0; index < data.entries.length; index++) {
    var templatecard = "<div id='card_elements'><div class='card-body'><h5 class='card-title text-info'>" + data.entries[index].id + '-' + data.entries[index].name + "</h5><p class='card-text'>" + data.entries[index].address + " - " + data.entries[index].city + "</p></div><div class='card-body'><a class='card-link'>Telefone</a><a class='card-link'>" + data.entries[index].phone + "</a></div><hr></div>";

    $('#template_elements').append(templatecard);
  }
}
