$(document).ready(function () {
  let amenities = [];
  $('.amenities input').change(function (e) {
    const amenity = {
      id: e.target.getAttribute('data-id'),
      name: e.target.getAttribute('data-name')
    };
    if (e.target.checked) {
      amenities.push(amenity);
    } else {
      amenities = amenities.filter(obj => obj.id !== amenity.id);
    }
    $('.amenities h4').text(amenities.map(amenity => amenity.name).join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (res) {
    if (res.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
      response.forEach(place => {
        $.get('http://0.0.0.0:5001/api/v1/users/' + place.user_id, function (user) {
          $('section.places').append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                         <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="user">
                            <b>Owner:</b> ${user.first_name} ${user.last_name}
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                    `);
        });
      });
    }
  });
  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({'amenities': Object.keys(checkedAmenities)}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          $('.places').append(`
            <article>
              <h2>${place.name}</h2>
              <div class="price_by_night">
                <p>$${place.price_by_night}</p>
              </div>
              <div class="information">
                <div class="max_guest">
                  <div class="guest_image"></div>
                  <p>${place.max_guest}</p>
                </div>
                <div class="number_rooms">
                  <div class="bed_image"></div>
                  <p>${place.number_rooms}</p>
                </div>
                <div class="number_bathrooms">
                  <div class="bath_image"></div>
                  <p>${place.number_bathrooms}</p>
                </div>
              </div>
              <div class="description">
                <p>${place.description}</p>
              </div>
            </article>
          `);          
        }
      }
    });
  });
});
