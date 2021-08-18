//jshint esversion:6

const express = require("express");
const { Http2ServerRequest } = require("http2");
const https = require("https");
const { urlToHttpOptions } = require("url");

const app =express();

app.get("/", function(req,res){

    const url= "https://api.openweathermap.org/data/2.5/weather?q=Houston,TX,us&units=imperial&appid=8745cc9d6234bfe94de5ee7541857254";

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feels_like = weatherData.main.feels_like;
            const highTemp = weatherData.main.temp_max;
            const weatherDescription = weatherData.weather[0].description

            res.write("The weather is currently " + weatherDescription);
            res.write("The temperature in Houston is " + temp + " degrees F");
            res.send();


            console.log("The temperature is: " + temp);
            console.log("It feels  like: " + feels_like);
            console.log("Today's high temperature: "+ highTemp);  
        
            
            });
            
        });
    });
    app.listen(3000,function(){
        console.log("Server is running on port 3000");
});
