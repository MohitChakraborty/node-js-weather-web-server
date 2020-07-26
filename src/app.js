const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup the handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{

    res.render('index', {
        title: 'Weather',
        name: 'Anatol Creigh'
    });
});

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Anatol Creigh'
    });
});

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        message: 'This is an example help message',
        name: 'Anatol Creigh'
    });
});

app.get('/weather',(req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide an address'});
    }

    geocode(req.query.address, (error, {latitude, longitutde, location} = {})=>{
        if(error)
        {
            return res.send(error);
        }
    
        forecast(latitude, longitutde, (error, forecastData) => {
            if(error)
            {
                return res.send(error);
            }
    
            res.send({
                location,
                forecastData,
                address: req.query.address
        })
          });
    });
});

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404-page',{
        name: 'Anatol Creigh',
        title: 'Help',
        message: 'Help article not found!'
    });
});

app.get('*',(req,res)=>{
    res.render('404-page',{
        title: '404 error',
        name: 'Anatol Creigh',
        message: 'Page not found!'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});