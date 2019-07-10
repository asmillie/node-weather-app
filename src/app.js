const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Express Instance & Config
const app = express()
app.set('view engine', 'hbs')

//Define paths for Express config
const BASE_PATH = path.join(__dirname, '../public/')
const VIEWS_PATH = path.join(__dirname, '../templates/views')
const PARTIALS_PATH = path.join(__dirname, '../templates/partials')

//Handlebars config
hbs.registerPartials(PARTIALS_PATH)

//Routing
app.use(express.static(BASE_PATH))
app.set('views', VIEWS_PATH)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    })
})

app.get('/forecast', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Location is a required field'
        })
    }  
    
    geocode.getGeocodeForLocation(req.query.location, (error, { place_name, latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }    

        forecast.getForecastByGeocode(latitude, longitude, (err, { summary, current_temp, current_precip } = {}) => {
            if (err) {
                return res.send({
                    error: err
                })
            } 

            return res.send({
                search_location: req.query.location,
                place_name,
                latitude,
                longitude,
                summary,
                current_temp,
                current_precip
            })            
        })        
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-help')
})

app.get('*', (req, res) => {
    res.render('404')
})

//Start server and run on provided port
app.listen(3000, () => {
    console.log('Express server running on port 3000')
})