import {zip} from 'zip-a-folder';

const source_folder= "../Hello";
const path  = "./Hello.zip";
zip(source_folder,path)
    .then(console.log("Folder Zipped"))
