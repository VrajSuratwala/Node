import express from 'express';
import hello_route from './Hello/hello.js';
import get_image from './Static_Resources/static_resources.js';


const app = express();
app.listen(1011, "Localhost", (err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("The Server has been started!");
    }
});

app.use(express.static("public")); // The Path Settlement for The Public Directory to render any page!
app.use('/',hello_route);
app.use('/',get_image);

