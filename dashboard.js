let username = document.getElementById('username');
let load_more = document.getElementById('load_more');
let show_details = document.getElementById('show_details');
let recipe_item = document.querySelector('.recipe-slider');
let receipes_list = document.querySelector('.receipes_list');
let loader=document.getElementById('loader')

show_details.addEventListener('click',()=>{show_details.style.display="none"})

username.textContent = `Hello ` + `${JSON.parse(sessionStorage.getItem('user'))}` + ` !`

let api_key = '279b1430877a4773957aaf9ef652044d';
let url = 'https://api.spoonacular.com/recipes/random?apiKey='
let searchurl='https://api.spoonacular.com/recipes/complexSearch?apiKey='
let offset = 5

function api() {
    loader.style.display = 'block';
    fetch(`${url}${api_key}&number=10`)
        .then(res => res.json())
        .then(data => {
            data.recipes.forEach(x => imageSilder(x));
            data.recipes.forEach(x => receipes(x))
        })
        .catch(error => alert(error))
        .finally(() => loader.style.display = 'none');
}api()

function imageSilder(n) {
    let section = document.createElement('section');section.className="sec"
    section.innerHTML = `<img src="${n.image}" alt="${n.title}">`;
    recipe_item.append(section);
}

function receipes(m) {
    let section = document.createElement('section'); 
    let div=document.createElement('div');
    section.innerHTML += `<img src=${m.image}><img>`
    receipes_list.append(section)
    section.addEventListener('click', () => display(m))
    section.firstChild.addEventListener('mouseover',()=>{ div.innerText=m.title; section.appendChild(div)})
    section.firstChild.addEventListener('mouseout',()=>{section.removeChild(div)})
}
function display(m) {
    document.getElementById('show_details').style.display = 'block'
    show_details.innerHTML = `<span>${m.title}</span><img src=${m.image}><img>`
}
load_more.addEventListener('click', () => { loader.style.display = 'block';
    offset += 5
    fetch(`${url}${api_key}&offset=${offset}&number=5`)
        .then(res => res.json())
        .then(data => data.recipes.forEach(x => receipes(x)))
        .catch(error => alert(error))
        .finally(() => loader.style.display = 'none');
})

const input = document.querySelector('input[type="search"]');
input.addEventListener("search", () => {
    loader.style.display = 'block';
    fetch(`${searchurl}${api_key}&titleMatch=${input.value}`)
        .then(res => res.json())
        .then(data => data.results.forEach(x=>display(x)))
        .catch(error => alert(error))
        .finally(() => loader.style.display = 'none');
});

document.getElementById('filter').addEventListener('click',(e)=>{ loader.style.display = 'block';
    let filterapi;
    e.target.className=='allreceipes'? filterapi=`https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=15` :filterapi=`https://api.spoonacular.com/recipes/random?apiKey=${api_key}&cuisine=${e.target.className}&number=15` 
    recipe_item.innerHTML="";receipes_list.innerHTML="";slider();
    fetch(`${filterapi}`)
    .then(res=>res.json())
    .then(data=>{
        data.recipes.forEach(x => imageSilder(x));
        data.recipes.forEach(x => receipes(x))
    })
    .catch(error => console.log(error))
    .finally(() => loader.style.display = 'none');
})
function slider(){
    document.getElementById('actionButton').addEventListener('click',(e)=>{
    e.target.className=='fa-solid fa-forward'? recipe_item.scrollLeft -=150:recipe_item.scrollLeft +=150
    })
}slider()


let arr = []
fetch(`${url}${api_key}&number=10`)
.then(res=>res.json())
.then(data=>data.recipes.forEach(x=>{
    x.cuisines.forEach(c=>{
        if(!arr.includes(c)){
            arr.push(c)
            createButton(c)
        }
    })
}))
let filter=document.getElementById('filter')
function createButton(name) {
    let createElement = document.createElement('button');
    createElement.textContent = name;
    filter.append(createElement);
  }