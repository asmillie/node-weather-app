const request = require('request')

/**
 * Mapbox API Config
 * https://docs.mapbox.com
 */
const apiKey = process.env.MAPBOX_API_KEY
const MAPBOX_API_BASE_URL = 'https://api.mapbox.com'
const MAPBOX_API_GEOCODING_URL = '/geocoding/v5/'
const MAPBOX_API_ENDPOINT_PARAM = 'mapbox.places/'
const MAPBOX_API_LOCATION_EXT = '.json?'
const MAPBOX_API_KEY_PARAM = 'access_token='
const MAPBOX_API_LIMIT = '&limit=1'

/**
 * 
 * @param {string} address Location string to find geocode data for
 * @param {string, object} callback Error message / undefined, Location data / undefined
 */
const getGeocodeForLocation = (address, callback) => {
    const url = getMapboxReqURLForLocation(address)
    
    request({
        url, 
        json: true,
    }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to geocode service.', undefined)
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find geocode data for location.', undefined)
        } else {
            callback(undefined, {
                place_name: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

/**
 * Returns a proper formatted URL string for making a geocode request to 
 * the Mapbox API
 * @param {string} location Name of location to be included in API Request URL
 */
const getMapboxReqURLForLocation = (location) => {
    return MAPBOX_API_BASE_URL 
    + MAPBOX_API_GEOCODING_URL
    + MAPBOX_API_ENDPOINT_PARAM
    + encodeURIComponent(location)
    + MAPBOX_API_LOCATION_EXT
    + MAPBOX_API_KEY_PARAM
    + apiKey
    + MAPBOX_API_LIMIT
}

module.exports = {
    getGeocodeForLocation
}