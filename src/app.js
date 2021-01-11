const path = require('path')
// partials allows you to create a little template which is part of a bigger web page
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// express is actually a function
// it has to be an absolute path from the root of our machine
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// this is a way to customize our server
// we call express.static and we get its return value into use
// static takes the path to the server we want to serve up

const app = express();
// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// we tell express which tp we install
// setup handlebars engine and views location
app.set('view engine', 'hbs')  //by default it will takes the views directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// set up static directory to serve
app.use(express.static(publicDirectoryPath))

// let us configure what a server do 
// it takes the route
// app.get('', (req, res) => {

//     res.send('<h1>Weather</h1>')

// }) this will not server us since index.html is read

// template engine to render dynamic web page we will use handle bar
// npm hbs uses handler bar beind the scene which makes it easy to integrate with express
// we need to set up aroute handler
app.get('', (req, res) => {
    //render allows us to render our view
    res.render('index', {
        // this second content the value we want the view to access
        title: 'Weather',
        name: 'Mbaye S Ndiaye'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Me',
        name: 'Mbaye Ndiaye'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help Page',
        name: 'khalifa'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { long, lat, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(long, lat, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})






// app.get('/products', (req, res) => {

//     if (!req.query.search) {

//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     // we cant response twice

//     console.log(req.query)

//     res.send({
//         product: []
//     })
// })
app.get('/help/*', (req, res) => {

    res.render('404page', {
        error: 'Help article not found'
    })
})
// match anything that has not been matched so far
app.get('*', (req, res) => {

    res.render('404page', {

        error: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000.')
})
// app.com
// app.com/help
// app.com/about


