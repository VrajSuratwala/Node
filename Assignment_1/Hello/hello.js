import express from 'express';

const hello_route = express();

hello_route.get('/gethello',(req,res)=>{
    res.send("Hello NodeJS!!");
});

export default hello_route;