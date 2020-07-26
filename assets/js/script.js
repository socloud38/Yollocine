let key = mykey;
let myinput = document.getElementById('my-input');
let movielist = document.getElementById('my-movie-list');

myinput.value = '';

myinput.addEventListener('keyup', (e) => 
{
        findmovie(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${myinput.value}`);
        
})

const findmovie = (url) =>
{
    fetch(url)
        .then(function(response)
        {
            return response.json();
        })
        .then(function(transformation){
            console.log(transformation);
            refreshlist();
            addlistmovie(transformation);
        })
}

const addlistmovie = (myjson) =>
{
    for (let i = 0; i < myjson.results.length; i++) {
        const element = myjson.results[i];
        let mytitle = document.createElement('div');
        mytitle.innerHTML = `<p>${myjson.results[i].title}</p>`;
        movielist.append(mytitle);
    }
}

const refreshlist = () => 
{
    for (let i = 0; i < movielist.children.length; i++) 
    {
        movielist.removeChild(movielist.children[i]);
    }
}
