import {mykey} from '../../key.js';

let myinput = document.getElementById('my-input');
let movielist = document.getElementById('my-movie-list');
let bodymovie = document.getElementById('body-movies');
let mypopularlist = document.getElementById('my-popular-list');

document.addEventListener('click', e => {
    console.log(e.target.id);
    localStorage.setItem('id', e.target.id);
})

myinput.value = '';

myinput.addEventListener('keyup', (e) => 
{
    refreshlist();
    if(myinput.value.length > 0)
    {
        findmovie(`https://api.themoviedb.org/3/search/movie?api_key=${mykey}&language=en-US&page=1&include_adult=false&query=${myinput.value}`);
    }
})

const findmovie = (url) =>
{
    fetch(url)
        .then((response) =>
        {
            return response.json();
        })
        .then((transformation) =>{
            refreshlist();
            addlistmovie(transformation);
        })
}

const popularmovies = (url) =>
{
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((transformation) => {
            console.log(transformation);
            addpopularmovie(transformation);
        })
}

popularmovies(`https://api.themoviedb.org/3/movie/popular?api_key=${mykey}&language=en-US&page=1`);

const addpopularmovie = (myjson) => {

    for (let i = 0; i < myjson.results.length; i++) {
        let myli = document.createElement('li');
        myli.innerHTML = `<a href="produit.html"><img id='${myjson.results[i].id}' alt="" src="https://image.tmdb.org/t/p/w500/${myjson.results[i].poster_path}"></a>`
        mypopularlist.append(myli);
    }
}

const addlistmovie = (myjson) =>
{
    refreshlist();

    if(myjson.results.length >= 4)
    {
        let myjsonsliced = myjson.results.slice(0, 3);
        for (let i = 0; i < myjsonsliced.length; i++) {
            let mytitle = document.createElement('div');
            mytitle.innerHTML = `<a id='${myjsonsliced[i].id}' href="produit.html"><img alt="" src="https://image.tmdb.org/t/p/w500/${myjsonsliced[i].poster_path}"></img> <p>${myjsonsliced[i].title}</p></a>`;
            movielist.append(mytitle);
        }

        for (let i = 0; i < myjson.results.length; i++) {
            if(myjson.results[i].poster_path != null)
            {

                if(myjson.results[i].overview.length >= 200)
                {
                    let newoverview = myjson.results[i].overview.slice(0, 300)
                    let mymovies = document.createElement('div');
                    mymovies.innerHTML = `<a id='${myjson.results[i].id}' href="produit.html"><img id='${myjson.results[i].id}' alt="" src="https://image.tmdb.org/t/p/w500/${myjson.results[i].poster_path}"></img> <div id='${myjson.results[i].id}'><h1 id='${myjson.results[i].id}'>${myjson.results[i].title} :</h1><p id='${myjson.results[i].id}'>${myjson.results[i].release_date}</p><p id='${myjson.results[i].id}'>${newoverview}...</p></div></a>`;                    bodymovie.append(mymovies);
                }
                else 
                {
                let mymovies = document.createElement('div');
                mymovies.innerHTML = `<a id='${myjson.results[i].id}' href="produit.html"><img id='${myjson.results[i].id}' alt="" src="https://image.tmdb.org/t/p/w500/${myjson.results[i].poster_path}"></img> <div id='${myjson.results[i].id}'><h1 id='${myjson.results[i].id}'>${myjson.results[i].title} :</h1><p id='${myjson.results[i].id}'>${myjson.results[i].release_date}</p><p id='${myjson.results[i].id}'>${myjson.results[i].overview}</p></div></a>`;
                bodymovie.append(mymovies);
                }
            }
        }
    }
    else if(myjson.results.length <= 0)
    {
        let mytitle = document.createElement('div');
        mytitle.innerHTML = `<p>Aucun resultats trouvé...</p>`;
        movielist.append(mytitle);
        bodymovie.append(mytitle);
    }
}


const refreshlist = () => 
{
    for (let i = movielist.children.length -1; i >= 0 ; i--) 
    {
        movielist.removeChild(movielist.children[i]);
    }
    for (let i = bodymovie.children.length -1; i >= 0 ; i--)
    {
        bodymovie.removeChild(bodymovie.children[i]);
    }
}

document.addEventListener('click', e => {

    if(e.target.id === 'my-input')
    {
        movielist.style.display = 'inline-block';
    }
    else 
    {
        movielist.style.display = 'none';
    }

})