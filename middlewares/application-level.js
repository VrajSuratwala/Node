import express from 'express';
const app  = express();
import router from './routes/route-level.js';

app.use((req,res,next)=>{
    console.log("Hello Vraj Suratwala");
    next();
});

app.use('/api',router);

app.get('/',(req,res)=>{
    res.send("Welcome to Home!");
});

app.listen(3000, 'Localhost', (err) =>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Server is Running now!");
    }
})

