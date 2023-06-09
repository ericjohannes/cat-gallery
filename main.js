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

const handleBreedName = (breedsArray)=>{
  if(breedsArray.length){
    return `${breedsArray[0].name}`
  }
  else{
    return 'A cat'
  }
  
}
const handleDescription = (breedsArray)=>{
  if(breedsArray.length){
    return `${breedsArray[0].description}`
  }
  else{
    return 'No description provided.'
  }
  
}
const updatePage = (data)=>{
  document.querySelector('.error').classList.add('hidden');
  if(window.pageCtr > 0){
    document.querySelector('#previous').style.display = "block"; 

  }
  else{
    document.querySelector('#previous').style.display = "none"; 
  }
  let innerHTML = '';
  data.forEach(row=>{
    innerHTML += `<article class="cat-info">
    <h2 class="breed">${handleBreedName(row.breeds)}</h2>
    <figure class="cat-photo">
      <img height="${row.height}" width="${row.width}" src="${row.url}" loading="lazy"  alt="${handleBreed(row.breeds)}">
      <figcaption>${handleBreed(row.breeds)}</figcaption>
    </figure>
    <p class="description">${handleDescription(row.breeds)}</p>
  </article>`
  })
  return document.querySelector('main').innerHTML = innerHTML;

}
const reportError = ()=>{
  document.querySelector('.error').classList.remove('hidden');
  return document.querySelector('.error').innerHTML = `
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
    has_breeds: 1,
    order: 'ASC'

  }))
  .then(response=>{
    if(response.status !=200){
      return reportError()
    }
    return  response.json()
      .then(result=>{ return updatePage(result)});
  })
  .then(()=>{
    window.scrollTo(0,0); // scroll to top after getting new data or if there's an error
  })
  .catch((err)=>{
    console.log(err)
    return reportError()
  })

}
