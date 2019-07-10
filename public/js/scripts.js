const locationForm = document.querySelector('#locationForm')
const locationInput = document.querySelector('#location')
const locationSubmit = document.querySelector('#locationSubmit')
const formError = document.querySelector('#formError')

const forecastCard = document.querySelector('#forecastCard')

const cardLocation = document.querySelector('#cardLocation')
const cardTemp = document.querySelector('#cardTemp')
const cardSummary = document.querySelector('#cardSummary')
const cardPrecip = document.querySelector('#cardPrecip')

locationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    hideElement(formError)
    hideElement(forecastCard)

    locationSubmit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Searching...'

    const location = locationInput.value
    const searchUrl = `http://localhost:3000/forecast?location=${location}`

    if (location === '') {
        locationSubmit.innerHTML = 'Search'
    } else {
        fetch(searchUrl).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    formError.innerHTML = `<div class="col-md" ><p>${data.error}</p></div>`
                    showElement(formError)
                } else {
                    cardLocation.innerHTML = `${data.place_name}`
                    cardSummary.innerHTML = `${data.summary}`
                    cardTemp.innerHTML = `${data.current_temp.toFixed(0)}`
                    cardPrecip.innerHTML = `${data.current_precip}% chance of precipitation`

                    showElement(forecastCard)
                }
                locationSubmit.innerHTML = 'Search'
            })
        })  
    }     
})

const hideElement = (element) => {
    element.classList.add('d-none')
}

const showElement = (element) => {
    element.classList.remove('d-none')
}