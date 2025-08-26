import express from 'express';
const app = express();
app.get('/crash_app',(req,res,next) =>{
    const error = new Error("The Server is Crashed!Pls Try After Some times!");
    error.status  = 500;
    next(error);
});

app.use((err,req,res,next)=>{
    if(err)
    {
        console.log(err); // printing an error
    }else{
        console.log("You are good to go ahead!");
    }
})

app.listen(3000, 'localhost', (err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("Server has been started!");
    }
})