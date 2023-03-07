const express = require('express')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const path = require('path')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../partials')

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        description: "Use this site to get your weather"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        description: "Help description"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        description: "About description"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forcast:"it is showing",
    //     location:"Philadophia",
    //     address:req.query.address
    // })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 page not found",
    })
})

app.listen(3000, () => {
    console.log('port in running on 3000')
})