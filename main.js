import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { apiUrl, apiKey } from './api.js';


// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME

const updatePage = ()=>{
  return document.querySelector('#app').innerHTML = `
  <p>Hello world!<p>
  `
}
const reportError = ()=>{
  return document.querySelector('#app').innerHTML = `
  <p>Could not retrieve any cats!<p>
  `
}
fetch(apiUrl + new URLSearchParams({
  api_key: apiKey,
}))
.then(response=>{
  if(response.status !=200){
    return reportError()
  }
  return updatePage();
})

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

