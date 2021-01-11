const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWJheWVzYW1ibmRpYXllIiwiYSI6ImNrZDVjaTI1ZDA2dHYyc3F2ZWtoaW03YzMifQ.40S5htdpvpoBO8FsVlgyLg&limit=1'

    request({ url, json: true }, (error, response) => {

        if (error) {

            callback('Unable to connect to location services', undefined)

        } else if (response.body.features.length === 0) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {

                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    }
    )
}


module.exports = geocode