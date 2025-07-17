import express from 'express';

const static_app = express();
static_app.use(express.static("Static_Resources"));

static_app.get('/getimage',(req,res)=>{
    res.send(`
        <html>
            <body>
                <img src = "./image.png" height = "500px" width = "1000px"/>
            </body>
        </html>`);
});

export default static_app;