const express=require('express');
const app=express();
const cors=require('cors');
const request=require('request');

app.use(express.static('./static'));
app.use(cors());

const API_KEY='9338fd463f4f2d4eb8c138108f8fca76';

app.get('/weather/:city',(req,res)=>
{
    const city=req.params.city;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    request(url,(error,response,body)=>
    {
        if(error)
        {
            return res.status(500).send("API request Failed");
        }
        const data=JSON.parse(body);
        const weather = {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
        };
        res.send(weather);
    })
})

app.listen(3001, () => {
    console.log('server running on http://localhost:3001');
})