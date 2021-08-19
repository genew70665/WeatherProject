//jshint esversion:6

const express = require("express");
const { Http2ServerRequest } = require("http2");
const https = require("https");
const { urlToHttpOptions } = require("url");

const app =express();

app.get("/", function(req,res){
    const query = "Albany, NY"
    const url= "https://api.openweathermap.org/data/2.5/weather?q=query,US,us&units=imperial&appid=8745cc9d6234bfe94de5ee7541857254";

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
           
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feels_like = weatherData.main.feels_like;
            const highTemp = weatherData.main.temp_max;
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("The weather is currently " +  weatherDescription + " in " + query + "\n");
            res.write("The temperature in " + query + " is" + temp + " degrees F" + "\n");
            res.write("The heat index in Houston is " + feels_like + " degrees F" + "\n");
            res.write("The high temperature today will be " + highTemp + " degrees F" + "\n");
            res.write("<img src=" + imageURL + ">");
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
