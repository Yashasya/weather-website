const path = require('path')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'Yashasya'
    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        title: "About me",
        name: "Yashasya Shah"
    })
})

app.get("/help",(req,res)=>{
    res.render('help',{
        title: "help",
        message: "How can i help you?",
        name: "Yashasya Shah"        
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:"You must provide an Address"
        })
    }

    geocode(req.query.address,(error,{latitute,longitute,location} = {}) => {
        if(error){
          return res.send({error})
        }
        forecast(longitute,latitute,(error,forecastdata)=>{
            if(error){
               return res.send({error})
            }

            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })
    // 
    
})

app.get("/help/*",(req,res)=>{
    res.render("error",{
        title: "Help Error",
        name: "Yashasya",
        message: "Help Article Not Found"
    })
})

app.get("*",(req,res)=>{
    res.render("error",{
        title: "404 Error",
        name: "Yashasya",
        message: "Page Not Found"
    })
})

app.listen(port,()=>{
    console.log("Server started")
})