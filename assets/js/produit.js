import {mykey} from '../../key.js';

let mynavtitle = document.getElementById('my-nav-title');
let myid = localStorage.getItem('id')
let myimg = document.getElementById('my-img');
let mytitle = document.getElementById('my-title');
let myresume = document.getElementById('synopsis');
let mystatus = document.getElementById('status');
let mydate = document.getElementById('date');
let myruntime = document.getElementById('runtime');
let mygenre = document.getElementById('genre');

const findid = (url) =>
{
    fetch(url)
        .then((response) =>
        {
            return response.json();
        })
        .then((transformation) =>{
            console.log(transformation);
            datamanage(transformation);
        })
}

findid(`https://api.themoviedb.org/3/movie/${myid}?api_key=${mykey}&language=fr`);

const myformat = (mydate) => {
    let mymonths = [null,'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
    let myday = mydate.slice(-2);
    let mymonth = mydate.slice(6,7);
    mymonth = mymonths[mymonth];
    let myyear = mydate.slice(0,4);
    let mynewdate = `${myday} ${mymonth} ${myyear}`
    return mynewdate;
}

const myformath = (mytime) => {
    let myhours = Math.floor(mytime / 60);
    let myminutes = mytime % 60;
    let mynewtime = `${myhours}h${myminutes}min`
    return mynewtime;
}

const datamanage = (myjson) => {
    mynavtitle.innerText = myjson.original_title;
    myimg.src = `https://image.tmdb.org/t/p/w500/${myjson.poster_path}`;
    mytitle.innerText = myjson.original_title;
    mygenre.innerText = `${myjson.genres[0].name} ${myjson.genres[1].name}`;
    mygenre.style.fontSize = '20px';
    mystatus.innerText = myjson.status;
    mydate.innerHTML = `Sortie le : <b>${myformat(myjson.release_date)}</b>`;
    mydate.style.fontStyle = 'italic';
    myresume.innerText = myjson.overview;
    myresume.style.fontSize = '20px';
    myruntime.innerHTML = `Durée : <b>${myformath(myjson.runtime)}</b>`;
}