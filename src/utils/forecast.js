const request = require('request')



const forecast = (long, lat, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c5837c62bc6d74b3ebdd0d00af18267b&query=' + lat + ',' + long + '&units=f'

    request({ url, json: true }, (error, response) => {

        if (error) {

            callback('unabble to access to the weatherstack api', undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined)
        } else {

            callback(undefined, {
                data: ` ${response.body.current.weather_descriptions[0]} It is currently ${response.body.current.temperature} degrees out. and there is a ${response.body.current.feelslike} chance of raining`
            })
        }

    })


}



module.exports = forecast