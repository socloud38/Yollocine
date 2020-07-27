import {mykey} from '../../key.js';

let myid = localStorage.getItem('id')
let myimg = document.getElementById('my-img');
let mytitle = document.getElementById('my-title');
let myresume = document.getElementById('synopsis');
let mystatus = document.getElementById('status');
let mydate = document.getElementById('date');

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

findid(`https://api.themoviedb.org/3/movie/${myid}?api_key=${mykey}&language=en-US`);

const datamanage = (myjson) => {
    myimg.src = `https://image.tmdb.org/t/p/w500/${myjson.poster_path}`;
    mytitle.innerText = myjson.original_title;
    mystatus.innerText = myjson.status;
    mydate.innerText = myjson.release_date;
    myresume.innerText = myjson.overview;
}