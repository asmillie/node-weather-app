const request = require('request')
const apiKeys = require('../api-keys')

/**
 * Darksky API Config
 * https://darksky.net
 */
const DARKSKY_API_BASE_URL = 'https://api.darksky.net/'
const DARKSKY_API_FORECAST_URL = 'forecast/'
const apiKey = process.env.DARKSKY_API_KEY | apiKeys.DARKSKY_API_KEY

const getForecastByGeocode = (latitude, longitude, callback) => {
    const url = DARKSKY_API_BASE_URL + DARKSKY_API_FORECAST_URL + apiKey + `/${latitude}, ${longitude}`

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