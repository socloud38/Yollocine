/* @import '../../key.js'; */

const url = 'http://api.themoviedb.org/3/person/51576/movie_credits?api_key=e05c3a1077bd3e7c5bf305329f6c2d9a';

fetch(url)
.then(function(response)
{
    return response.json();
})
.then(function(transformation){
    console.log(transformation);
})
