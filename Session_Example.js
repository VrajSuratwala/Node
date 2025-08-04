import express from 'express';
const app = express();
import session from 'express-session';
app.use(session({
    secret :"enc-type",
    saveUninitialized : false,
    resave : false
}));

app.get('/session_cookie_count',(req,res)=>{
        
        if(req.session.count_variable)
        {
            req.session.count_variable++;
            res.send("Count of Session Variable : "  + req.session.count_variable);
        }else{
            req.session.count_variable = 1;
            res.send("The Count Variable is not Settled!");
        }
});

app.listen(8000, "Localhost", (error)=>{
    if(error)
    {
        console.log("Server cannot start because of this error : " , error);
    }else{
        console.log("Server has been started on PORT 8000 !");
    }
})