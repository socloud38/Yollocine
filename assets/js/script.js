let key = mykey;
let myinput = document.getElementById('my-input');
let movielist = document.getElementById('my-movie-list');

myinput.addEventListener('keyup', (e) => 
{
        findmovie(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${myinput.value}`)
        return myinput.value;
})

function findmovie(url)
{
    fetch(url)
        .then(function(response)
        {
            return response.json();
        })
        .then(function(transformation){
            console.log(transformation);
        })
}

function addlistmovie()
{
    
}
