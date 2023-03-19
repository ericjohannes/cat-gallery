import fs from 'fs';
import { apiUrl, apiKey } from './api.js';

const queryUrl =  apiUrl + new URLSearchParams({
    limit: 20,
    api_key: apiKey,
    page: 0,
    has_breeds: 1,
  })

fetch(queryUrl)
  .then(response=>{
    if(response.status !=200){
        // api doesn't give data
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
  .catch(err=>{
    // if fetch cant' work
    console.log(err)
    const fileData = JSON.stringify({
        success: false,
      })
      return fs.writeFile('./data.json', fileData, (err)=>console.log(err))
  })
  