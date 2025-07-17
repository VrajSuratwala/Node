import fs from 'fs';
import { promisify } from 'util';

// var data = "Vraj Suratwala - IT 7 - MSCIT - 2025";
// fs.appendFile('../public/data.txt', data, 'utf-8', (err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("File Created!");
//     }    
// });


const unlinkAsync = promisify(fs.unlink);

unlinkAsync('../public/data.txt')
  .then(() => {
    console.log(" File Deleted using promisify");
  })
  .catch(err => {
    console.error(" Error:", err.message);
  });