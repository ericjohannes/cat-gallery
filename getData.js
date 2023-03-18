import fs from 'fs';
import { apiUrl, apiKey } from './api.js';

const foo = "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=" + apiKey;
const queryUrl =  apiUrl + new URLSearchParams({
    limit: 20,
    api_key: apiKey,
  })

fetch(queryUrl)
  .then(response=>{
    if(response.status !=200){
      const fileData = JSON.stringify({
        success: false,
    })
        return fs.writeFile('./data.json', fileData, (err)=>console.log(err))
    }
    return response.json().then(result=>{
        const fileData =  JSON.stringify({
            success: true,
            data: result
        });
        return fs.writeFile('./data.json', fileData, (err)=>console.log(err))
      });
  })
  