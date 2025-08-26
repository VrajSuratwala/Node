import express from 'express';
import users from './MOCK_DATA.json' with { type: "json" };
import fs from 'fs';
import mongoose from 'mongoose';

const app = express();
const PORT  = 8001;

app.listen(PORT, "Localhost", ()=>console.log("API Server is Started!"));


//Let's Create Schema
const User = new mongoose.Schema({
    firstname : {
        type : String,
        require : true,
    },
    lastname :{
        type : String,   
    },
    email : {
        type : String,
        require : true,
        unique : true,
    },

});

const User_Modal =  mongoose.model('User',User);

mongoose.connect("mongodb://127.0.0.1:27017/My_Connection")
.then(() => {
    console.log("✅ Database Connected!");
})
.catch((err) => {
    console.error("❌ Connection Error:", err.message);
});

// Creating all Routes

//Getting all User Data iin JSON Format!
app.get("/api/user_data",(req,res)=>{
    return res.json(users);
});

// Getting The First Name of All The Data

app.get("/user_data",(req,res) =>{
    const html = `<ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    
    res.send(html);
});

// Getting Data using Dynamic Path Variable using ':' sign.
// :id->variable in api/users/:id

app
    .route('/api/user_data/:id')
    .get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user)
    {
        res.json('User Data is not Found!');
    }
    return res.json(user);
})
    .put((req,res)=>{
    return res.json("Task Put is still pending!");
})
    .patch((req,res)=>{
    return res.json("Task Patch is still pending!");
})
    
    .delete((req,res)=>{
    return res.json("Task Delete is still pending!");
});

app.use(express.urlencoded({extended: false})); // Third Party Middleware! 
app.post('/api/user_data',(req,res)=>{
    const body = req.body;
    console.log(body);
    users.push({...body,id:users.length +1});
    
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        if(err){
            console.log(err);
        }

        if(data){
            console.log(data);
        }

        return res.json("Success");
    })
})

app.post('/api/database_insertion',(req,res)=>{
    const Data = req.body;
    console.log(Data);

    if(Data.first_name && Data.last_name && Data.email)
    {
    User_Modal.create({
        firstname : Data.first_name,
        lastname : Data.last_name,
        email : Data.email
    });
    }
    else{
        res.json("The Data Is  not Passed Properly!");
    }

    res.json("Success");
    
});

