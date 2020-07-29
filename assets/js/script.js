import {mykey} from '../../key.js';

let myinput = document.getElementById('my-input');
let movielist = document.getElementById('my-movie-list');
let bodymovie = document.getElementById('body-movies');
let mypopularbody = document.getElementById('my-popular-body');
let mypopularlist = document.getElementById('my-popular-list');
let myindexpage = document.getElementById('my-page-index');

document.addEventListener('click', e => {
	localStorage.setItem('id', e.target.id);
});

myinput.value = '';

myinput.addEventListener('keyup', () => 
{
    refreshlist();
	if(myinput.value.length > 0)
	{
		findmovie(`https://api.themoviedb.org/3/search/movie?api_key=${mykey}&language=fr&page=1&include_adult=false&query=${myinput.value}`);
	}

	if(myinput.value != '')
	{
		mypopularbody.style.display = 'none';
        myindexpage.style.display = 'block';
	}
	else 
	{
		mypopularbody.style.display = 'inline-block';
        myindexpage.style.display = 'none';
	}
});

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
		});
};

const popularmovies = (url) =>
{
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((transformation) => {
			console.log(transformation);
			addpopularmovie(transformation);
		});
};

popularmovies(`https://api.themoviedb.org/3/movie/popular?api_key=${mykey}&language=fr&page=1`);

const addpopularmovie = (myjson) => {

	for (let i = 0; i < myjson.results.length; i++) {
		let myli = document.createElement('li');
		myli.innerHTML = `<a href="produit.html"><img id='${myjson.results[i].id}' alt="" src="https://image.tmdb.org/t/p/original/${myjson.results[i].poster_path}"></a>`;
		mypopularlist.append(myli);
	}
};

const addlistmovie = (myjson) =>
{
	refreshlist();

	if(myjson.results.length >= 4)
	{
		let myjsonsliced = myjson.results.slice(0, 3);
		for (let i = 0; i < myjsonsliced.length; i++) {
			let mytitle = document.createElement('div');
			mytitle.innerHTML = `<a id='${myjsonsliced[i].id}' href="produit.html"><img id='${myjsonsliced[i].id}' alt="" src="https://image.tmdb.org/t/p/original/${myjsonsliced[i].poster_path}"></img> <p id='${myjsonsliced[i].id}'>${myjsonsliced[i].title}</p></a>`;
			movielist.append(mytitle);
		}

		for (let i = 0; i < myjson.results.length; i++) {
			if(myjson.results[i].poster_path != null)
			{
				let mymovies = document.createElement('a');
				mymovies.classList.add('col-12');
				mymovies.classList.add('col-sm-4');
				mymovies.classList.add('col-md-3');
				mymovies.classList.add('col-lg-2');
				mymovies.href = 'produit.html';
				mymovies.style.backgroundImage = `URL('https://image.tmdb.org/t/p/original/${myjson.results[i].poster_path}')`;
				mymovies.innerHTML = `<span id='${myjson.results[i].id}'><div id='${myjson.results[i].id}'><h1 id='${myjson.results[i].id}'>${myjson.results[i].title}(${myjson.results[i].release_date.slice(0,4)})</h1></div></span>`;
				bodymovie.append(mymovies);
			}
        }
	}
	else if(myjson.results.length <= 0)
	{
		let mytitle = document.createElement('div');
		mytitle.style.color = 'white';
		mytitle.style.marginTop = '50px';
		mytitle.innerHTML = '<p>Aucun resultats trouvés...</p>';
		movielist.append(mytitle);
		bodymovie.append(mytitle);
    }
    if(p1)
{
    for (let i = 0; i < bodymovie.children.length; i++) 
            {
                if(i >= 5)
                {
                    const elements1 = bodymovie.children[i];
                    elements1.style.display = 'none';
                }
            }
}
};

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
};

document.addEventListener('click', e => {

	if(e.target.id === 'my-input')
	{
		movielist.style.display = 'inline-block';
	}
	else 
	{
		movielist.style.display = 'none';
	}

});

let mybtnpge1 = document.getElementById('btn-page1');
let mybtnpge2 = document.getElementById('btn-page2');
let mybtnpge3 = document.getElementById('btn-page3');
let mybtnpge4 = document.getElementById('btn-page4');

let p1 = true;

mybtnpge1.addEventListener('click', () => {
    for (let i = 0; i < bodymovie.children.length; i++) 
            {
                if(i < 5)
                {
                    const elements1 = bodymovie.children[i];
                    elements1.style.display = 'inline';
                }
                else 
                {
                    bodymovie.children[i].style.display = 'none';
                }
            }
})
mybtnpge2.addEventListener('click', () => {
    for (let i = 0; i < bodymovie.children.length; i++) 
            {
                if(i >= 5 && i < 10)
                {
                    bodymovie.children[i].style.display = 'inline';
                }
                else 
                {
                    bodymovie.children[i].style.display = 'none';
                }
            }
})
mybtnpge3.addEventListener('click', () => {
    for (let i = 0; i < bodymovie.children.length; i++) 
            {
                if(i >= 10 && i < 15)
                {
                    bodymovie.children[i].style.display = 'inline';
                }
                else 
                {
                    bodymovie.children[i].style.display = 'none';
                }
            }
})
mybtnpge4.addEventListener('click', () => {
    for (let i = 0; i < bodymovie.children.length; i++) 
            {
                if(i >= 15 && i <= bodymovie.children.length)
                {
                    bodymovie.children[i].style.display = 'inline';
                }
                else 
                {
                    bodymovie.children[i].style.display = 'none';
                }
            }
})