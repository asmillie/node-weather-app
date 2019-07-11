# node-weather-app
Weather forecast website developed in NodeJs utilizing the ExpressJs library. Created as a part of The Complete Node.js Developer Course (3rd Edition) on Udemy.com

## API Keys
An API key from the following two websites are required:

[Mapbox API](https://www.mapbox.com/)

[Darksky API](https://darksky.net)

Both sites offer a free development account that allow for a small amount of daily requests.

Once you have your keys you will need to create **api-keys.js** under the **src/** folder which should look as below:

**api-keys.js**
```
const DARKSKY_API_KEY = 'Darksky key here'
const MAPBOX_API_KEY = 'Mapbox key here'

module.exports = {
    DARKSKY_API_KEY,
    MAPBOX_API_KEY
}
```
