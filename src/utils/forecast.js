const request = require('request')

/**
 * Darksky API Config
 * https://darksky.net
 */
const DARKSKY_API_BASE_URL = 'https://api.darksky.net/'
const DARKSKY_API_FORECAST_URL = 'forecast/'
const DARKSKY_API_SECRET_KEY = '6805fd018c7624ec09cfa0a670ff62bc'

const getForecastByGeocode = (latitude, longitude, callback) => {
    const url = DARKSKY_API_BASE_URL + DARKSKY_API_FORECAST_URL + DARKSKY_API_SECRET_KEY + `/${latitude}, ${longitude}`

    request({
        url,
        json: true,
    }, (error, res, body) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {            
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                current_temp: body.currently.temperature,
                current_precip: body.currently.precipProbability
            })
        }        
    })
}

module.exports = {
    getForecastByGeocode
}