$(document).ready(function () {
    let amenities = []
    $('.amenities input').change(function (e) {
        const amenity = {
            id: e.target.getAttribute('data-id'),
            name: e.target.getAttribute('data-name')
        }
        if (e.target.checked) {
            amenities.push(amenity);
        } else {
            amenities = amenities.filter(obj => obj.id !== amenity.id)
        }
        $('.amenities h4').text(amenities.map(amenity => amenity.name).join(', '));
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function(res) {
        if (res.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
