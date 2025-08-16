import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.get('/Set_data',(req,res)=>{
    res.cookie("username", "Suratwala")
    res.send("Cookie is Settled!");
});


app.get('/View_Data',(req,res)=>{
    const data = req.cookies.username;
    res.send(`Username : ${data}`);
});


app.get('/Clear_Data',(req,res)=>{
    res.clearCookie("username")
    res.send("Cookie Cleared!");
});

app.listen(3000, "Localhost", (backlog)=>{
    console.log("Server has been started!");
})