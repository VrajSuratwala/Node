// FS MODULE IN THE NODE.

import fs from 'fs';

// Appending any File using Syn. function.
var Data  = "ABCDEFGHIJ";
fs.appendFile("./Data/hello.txt", Data, 'utf-8', (error,data)=>{
    if(error)
    {
        console.log(error);
    }else
    {
        console.log("The Data is Written into File : TXT !!");
    }
});

// Appending any File using ASyn. function
console.log(fs.appendFileSync("./Data/hello_1.txt", Data));


// Reading File into Sync Mode!
console.log(fs.readFileSync("./Data/hello_1.txt",'utf-8'))

// Reading File into Async Mode!
console.log(fs.readFile('./Data/hello.txt', "utf-8", (err,data)=>{
    if(err)
    {
        console.log(err);
    }else{
        console.log("Data Fetched Successfully!");
    }
}));

// Unlink - For Deletion!

console.log(fs.unlink('./Data/hello.txt', (err)=>{
    console.log(err);
}))