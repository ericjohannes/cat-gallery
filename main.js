import { apiUrl, apiKey } from './api.js';
// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME

const handleBreed = (breedsArray)=>{
  if(breedsArray.length){
    return `Photo of a ${breedsArray[0].name}`
  }
  else{
    return 'Photo of a cat.'
  }
}
const updatePage = (data)=>{
  if(window.pageCtr > 0){
    document.querySelector('#previous').style.display = "block"; 

  }
  else{
    document.querySelector('#previous').style.display = "none"; 
  }
  let innerHTML = '';
  data.forEach(row=>{
    innerHTML += `<article class="cat-info">
    <figure class="cat-photo">
      <img src="${row.url}" loading="lazy"  alt="${handleBreed(row.breeds)}">
      <figcaption>${handleBreed(row.breeds)}</figcaption>
    </figure>
  </article>`
  })
  return document.querySelector('main').innerHTML = innerHTML;

}
const reportError = ()=>{
  return document.querySelector('#error').innerHTML = `
  Could not retrieve more cats!
  `
}
window.pageCtr = 0;
window.getData = (whichWay)=>{
  const ctr = whichWay == 'more' ? 1: -1;
  window.pageCtr += ctr;

  const page = window.pageCtr;
  fetch(apiUrl + new URLSearchParams({
    api_key: apiKey,
    page: page,
    limit: 20,
  }))
  .then(response=>{
    if(response.status !=200){
      return reportError()
    }
    return  response.json()
      .then(result=>{ updatePage(result)});
  })

}
