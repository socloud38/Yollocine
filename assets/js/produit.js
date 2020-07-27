import {mykey} from '../../key.js';

let myid = localStorage.getItem('id')

const findid = (url) =>
{
    fetch(url)
        .then((response) =>
        {
            return response.json();
        })
        .then((transformation) =>{
            console.log(transformation);
        })
}

findid(`https://api.themoviedb.org/3/movie/${myid}?api_key=${mykey}&language=en-US`);