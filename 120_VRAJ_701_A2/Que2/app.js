const express=require('express');
const app=express();
const session=require('express-session');
const file=require('session-file-store')(session);
const bodyParser=require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./static'));

const fileStoreOptions = {
  reapInterval: 60, // seconds, how often to clean expired session files (default is 1 minute)
}

app.use(session({
  store: new file({fileStoreOptions}), 
  secret: 'login',        
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 } 
}));

app.get('/',(req,res)=>
{
    if(req.session.user)
    {
        res.send(`Welcome ${req.session.user.email} <br> <a href="/logout">Logout</a>`);
    }
    else
    {
        res.sendFile(path.join(__dirname, 'static', 'login.html'));    
    }

})

app.post('/login',(req,res)=>{
    const email=req.body.email;
    if(email)
    {
        req.session.user={email};
        res.send(`Login Successful!!<a href="/">Home</a>`);
    }
    else
    {
        res.send('Invalid credentials. <a href="/">Try again</a>')
    }
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});