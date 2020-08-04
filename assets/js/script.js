//clé API obtenue via le module key.js
import {mykey} from '../../key.js';

//mes variables getID

//input
let myinput = document.getElementById('my-input');
//div movielist (list déroulante en dessous de l'input)
let movielist = document.getElementById('my-movie-list');
//div des films a l'affichage dans la page
let bodymovie = document.getElementById('body-movies');
//div carroussel
let mypopularbody = document.getElementById('my-popular-body');
//UL carroussel
let mypopularlist = document.getElementById('my-popular-list');
//Nav de la pagination
let myindexpage = document.getElementById('my-page-index');
//input radio films
let radiomovies = document.getElementById('radio-movies');
//input radio movie
let radioserie = document.getElementById('radio-series');
//text au dessus du carroussel
let mytxtcarou = document.getElementById('carou-txt');
//text pagination
let pagenumbertxt = document.getElementById('page-number');
//pagenumber = la page actuel entre 1 et 999
let pagenumber = 1;
//boolean si film(true) ou series(false)
let movies = true;

//event au click sur le document (içi pour récuperer l'ID au click et le stocker)
document.addEventListener('click', e => {
	localStorage.setItem('id', e.target.id);
	console.log(e.target.id);

	//si film ou serie
	if(radioserie.checked)
	{
		movies = false;
		localStorage.setItem('movie', movies);
	}
	else
	{
		movies = true;
		localStorage.setItem('movie', movies);
	}
});

//s'assurer que l'input est vide au chargement de la page
myinput.value = '';
//check l'input radio film au chargement
radiomovies.checked = true;

//mes URL des films/series populaire pour les caroussels
let myurlpopularmovie = `https://api.themoviedb.org/3/movie/popular?api_key=${mykey}&language=fr&page=1`;
let myurlpopularseries = `https://api.themoviedb.org/3/tv/popular?api_key=${mykey}&language=fr&page=1`;

//event quand j'appuye sur n'importe quel touche dans l'input
myinput.addEventListener('keyup', () => 
{
	//fct refresh
	refreshlist();
	//initialisation de la page 1
	pagenumber = 1;
	//écrire le numéro de page dans le txt
	pagenumbertxt.innerText = pagenumber;
	//si il y a quelque chose dans l'input
	if(myinput.value.length > 0)
	{
		//URL pour fetch film/serie
		let myurlmovies = `https://api.themoviedb.org/3/search/movie?api_key=${mykey}&language=fr&page=${pagenumber}&include_adult=false&query=${myinput.value}`;
		let myurlseries = `https://api.themoviedb.org/3/search/tv?api_key=${mykey}&language=fr&page=${pagenumber}&query=${myinput.value}&include_adult=false`;

		//check si films ou séries et fetch
		if(radiomovies.checked)
		{
			findmovie(myurlmovies);
		}
		else if(radioserie.checked)
		{
			findmovie(myurlseries);
		}
	}

	//fais disparaitre le carroussel si l'input n'est pas vide
	//et les bouton pagination si il est vide
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

//fct fetch pour les films
const findmovie = (url) =>
{
	//fetch
	fetch(url)
		//then response
		.then((response) =>
		{
			//transforme en JSON
			return response.json();
		})
		//then du JSON
		.then((transformation) =>{
			console.log(transformation);
			//refresh ma list deroulante
			refreshlist();
			//check si film ou séries
			if(radiomovies.checked)
			{
				addlistmovie(transformation);
			}
			else 
			{
				addlistserie(transformation);
			}
		});
};

//fetch des films populaires
const popularmovies = (url) =>
{
	//fetch
	fetch(url)
		//then
		.then((response) => {
			//transforme en JSON
			return response.json();
		})
		//then
		.then((transformation) => {
			console.log(transformation);
			//add les bonne img dans le carrou
			addpopularmovie(transformation);
		});
};

//event au click de l'input radio films
radiomovies.addEventListener('click', () => {
	//actualise le txt au dessus du carrou
	mytxtcarou.innerText = 'Films Populaires :';
	//supprime les carrou actuel
	for (let i = mypopularlist.children.length -1; i >= 0 ; i--) {
		mypopularlist.removeChild(mypopularlist.children[i]);
	}
	//ajoute les nouveau carrou (mise a jour des images)
	popularmovies(myurlpopularmovie);
});

//event au click du radio serie
radioserie.addEventListener('click', () => {
	//mise a jour du txt au dessus du carrou
	mytxtcarou.innerText = 'Séries Populaires :';
	//supprime le carrou actuel (films)
	for (let i = mypopularlist.children.length -1; i >= 0 ; i--) {
		mypopularlist.removeChild(mypopularlist.children[i]);
	}
	//mise a jour des imgs du carrou
	popularmovies(myurlpopularseries);
});

//fct carrou met les images des films populaire dans le carrou
popularmovies(myurlpopularmovie);

//fct qui crée les li des films populaire et les ajoute dans le ul du carrou
const addpopularmovie = (myjson) => {

	//boucle for qui créer les li pour chaque film populaire fetch en JSON
	for (let i = 0; i < myjson.results.length; i++) {
		//création des li
		let myli = document.createElement('li');
		//ajout d'un a avec sont Href qui mene a la page produit
		myli.innerHTML = `<a href="produit.html"><img id='${myjson.results[i].id}' alt="" src="https://image.tmdb.org/t/p/original/${myjson.results[i].poster_path}"></a>`;
		//append du li dans la list ul du carrou
		mypopularlist.append(myli);
	}
};

//fct qui ajoute les films dans la movielist et dans la page
const addlistmovie = (myjson) =>
{
	//refresh de la list et de la page
	refreshlist();

	//partie de la liste en dessous de l'input
	if(myjson.results.length >= 4)
	{
		//découpe du nombre de resultats au 3premier pour la liste
		let myjsonsliced = myjson.results.slice(0, 3);
		//boucle for dans le JSON coupé
		for (let i = 0; i < myjsonsliced.length; i++) {
			//check si une image et disponible sinon pas d'affichage
			if(myjson.results[i].poster_path != null)
			{
				//création d'une div pour chaque element de la liste
				let mytitle = document.createElement('div');
				//on lui met sa balise A et son HREF
				mytitle.innerHTML = `<a id='${myjsonsliced[i].id}' href="produit.html"><img id='${myjsonsliced[i].id}' alt="" src="https://image.tmdb.org/t/p/original/${myjsonsliced[i].poster_path}"></img> <p id='${myjsonsliced[i].id}'>${myjsonsliced[i].title}</p></a>`;
				//append dans la list
				movielist.append(mytitle);
			}
		}

		//boucle for pour la list de film de la page
		for (let i = 0; i < myjson.results.length; i++) {
			//check si il y a une image sinon ne pas afficher
			if(myjson.results[i].poster_path != null)
			{
				//recupération de la date de sortie et découpe pour avoir juste l'année
				let daterel = myjson.results[i].release_date.slice(0,4);
				//création de la div principale
				let mymovies = document.createElement('div');
				//SEO schema
				mymovies.itemtype= "http://schema.org/Movie";
				//création d'un A
				let mymoviesa = document.createElement('a');
				//ajout de la class
				mymovies.classList.add('div-movie-link');
				//class
				mymoviesa.classList.add('my-links-movies');
				//class bootstrap responsive grid
				mymovies.classList.add('col-12');
				//class bootstrap responsive grid
				mymovies.classList.add('col-sm-4');
				//class bootstrap responsive grid
				mymovies.classList.add('col-md-3');
				//class bootstrap responsive grid
				mymovies.classList.add('col-lg-2');
				//ajout d'un Href dans le A créé precedement
				mymoviesa.href = 'produit.html';
				//je stock l'ID du film cliqué dans l'ID de la balise A
				mymoviesa.id = myjson.results[i].id;
				//ajout de l'image du film en background de ma div
				mymovies.style.backgroundImage = `URL('https://image.tmdb.org/t/p/original/${myjson.results[i].poster_path}')`;
				//edition du HTML de ma div (titre + date entre parantheses)
				mymovies.innerHTML = `<div><h1>${myjson.results[i].title} (${daterel})</h1></div>`;
				//append du A dans ma div
				mymovies.append(mymoviesa);
				//append de la div dans la div prévu en HTML
				bodymovie.append(mymovies);
			}
		}
	}
	//si il n'y a pas de resultat de la recherche
	else if(myjson.results.length <= 0)
	{
		//création d'une div
		let mytitle = document.createElement('div');
		//color text de la div = blanc
		mytitle.style.color = 'white';
		//margin top de la div 50px
		mytitle.style.marginTop = '50px';
		//edition de l'html de la div
		mytitle.innerHTML = '<p>Aucun resultats trouvés...</p>';
		//append de ma div dans la list et dans la page
		movielist.append(mytitle);
		bodymovie.append(mytitle);
	}
};

//fct pour les séries
const addlistserie = (myjson) =>
{
	//refresh de la list
	refreshlist();

	//test si il y a plus de 4 resultats
	if(myjson.results.length >= 4)
	{
		//decoupe des resultats
		let myjsonsliced = myjson.results.slice(0, 3);
		//boucle for de la list pour les serie (en dessous de l'input)
		for (let i = 0; i < myjsonsliced.length; i++) {
			//test si img sinon pas affiché
			if(myjson.results[i].poster_path != null)
			{
			//boucle for pour remove la list d'avant
			for (let i = movielist.children.length -1; i >= 0 ; i--) 
			{
				//remove les enfants de la list
				movielist.removeChild(movielist.children[i]);
			}
				//création d'une div principale
				let mytitle = document.createElement('div');
				//edition de son HTML
				mytitle.innerHTML = `<a id='${myjsonsliced[i].id}' href="produit.html"><img id='${myjsonsliced[i].id}' alt="" src="https://image.tmdb.org/t/p/original/${myjsonsliced[i].poster_path}"></img> <p id='${myjsonsliced[i].id}'>${myjsonsliced[i].name}</p></a>`;
				//append de la div dans la list
				movielist.append(mytitle);
			}
		}

		//bucle for pour la page principale des séries
		for (let i = 0; i < myjson.results.length; i++) {
			//test si img sinon pas afficher
			if(myjson.results[i].poster_path != null)
			{
				//recuperation de l'année
				let daterel = myjson.results[i].first_air_date.slice(0,4);
				//création d'une div
				let myseries = document.createElement('div');
				//création d'un A
				let myseriesa = document.createElement('a');
				//SEO schea serie
				myseries.itemtype=("https://schema.org/TVSeries");
				//class
				myseries.classList.add('div-movie-link');
				//class
				myseriesa.classList.add('my-links-movies');
				//class bootstrap responsive
				myseries.classList.add('col-12');
				//class bootstrap responsive
				myseries.classList.add('col-sm-4');
				//class bootstrap responsive
				myseries.classList.add('col-md-3');
				//class bootstrap responsive
				myseries.classList.add('col-lg-2');
				//Href pour le A vers page produit
				myseriesa.href = 'produit.html';
				//mettre l'ID du film dans l'ID du A
				myseriesa.id = myjson.results[i].id;
				//image du film en background
				myseries.style.backgroundImage = `URL('https://image.tmdb.org/t/p/original/${myjson.results[i].poster_path}')`;
				//edition du HTML de ma div
				myseries.innerHTML = `<div><h1>${myjson.results[i].name} (${daterel})</h1></div>`;
				//append du A dans la div
				myseries.append(myseriesa);
				//append de la div
				bodymovie.append(myseries);  
			}
		}
	}
	//si aucun resultats
	else if(myjson.results.length <= 0)
	{
		//création d'une div
		let mytitle = document.createElement('div');
		//text color = blanc
		mytitle.style.color = 'white';
		//margin top 50px
		mytitle.style.marginTop = '50px';
		//edition du HTML
		mytitle.innerHTML = '<p>Aucun resultats trouvés...</p>';
		//append dans la liste
		movielist.append(mytitle);
		//append dans la page
		bodymovie.append(mytitle);
	}
};

//fct refresh list
const refreshlist = () => 
{
	//boucle for qui parcours ma list (en dessous de l'input)
	for (let i = movielist.children.length -1; i >= 0 ; i--) 
	{
		//supprime tout les enfant de ma list
		movielist.removeChild(movielist.children[i]);
	}
	//boucle for qui parcours ma page de recherche 
	for (let i = bodymovie.children.length -1; i >= 0 ; i--)
	{
		//supprime tout les enfant (films precedement recherché)
		bodymovie.removeChild(bodymovie.children[i]);
	}
};

//event click sur le document pour afficher ou non la list
document.addEventListener('click', e => {

	//test si l'user click sur l'input ou non
	if(e.target.id === 'my-input')
	{
		//l'user click sur l'input list = affiché
		movielist.style.display = 'inline-block';
	}
	//sinon
	else 
	{
		//l'user click n'importe ou mais pas sur l'input list = caché
		movielist.style.display = 'none';
	}

});

//variable de mes boutons pagination right
let mybtnpge1 = document.getElementById('btn-page-Up');
//left
let mybtnpge2 = document.getElementById('btn-page-Down');

//event au click sur mon bouton right pagination
mybtnpge1.addEventListener('click', () => {

	//incremente la variable page
	pagenumber ++;
	//test si la variable atteint 1000 alors = 999
	if(pagenumber >= 1000)
	{
		pagenumber = 999;
	}
		
	//test si film
	if(radiomovies.checked)
	{
		//url du fetch pour mes films
		let myurlmovies = `https://api.themoviedb.org/3/search/movie?api_key=${mykey}&language=fr&page=${pagenumber}&include_adult=false&query=${myinput.value}`;
            
		//la paginationTXT prend le numéro de la variable
		pagenumbertxt.innerText = pagenumber;
		//lance le fetch des films
		findmovie(myurlmovies);
	}
	//séries
	else
	{
		//URL de mes séries
		let myurlseries = `https://api.themoviedb.org/3/search/tv?api_key=${mykey}&language=fr&page=${pagenumber}&query=${myinput.value}&include_adult=false`;
			
		//la paginationTXT prend le numéro de la variable
		pagenumbertxt.innerText = pagenumber;
		//lance le fetch des séries
		findmovie(myurlseries);
	}
});

//boutton left
mybtnpge2.addEventListener('click', () => {

	//décrementation de la variable
	pagenumber--;
	//test si la variable arrive a 0 alors = 1 (il n'y a pas de page 0)
	if(pagenumber === 0)
	{
		pagenumber = 1;
	}
	//test si film
	if(radiomovies.checked)
	{
		//url du fetch de mes films
		let myurlmovies = `https://api.themoviedb.org/3/search/movie?api_key=${mykey}&language=fr&page=${pagenumber}&include_adult=false&query=${myinput.value}`;
		
		//la paginationTXT prend le numéro de la variable
		pagenumbertxt.innerText = pagenumber;
		
		//lance le fetch des films
		findmovie(myurlmovies);
	}
	//serie
	else
	{
		//url pour le fetch de mes séries
		let myurlseries = `https://api.themoviedb.org/3/search/tv?api_key=${mykey}&language=fr&page=${pagenumber}&query=${myinput.value}&include_adult=false`;
		
		//la paginationTXT prend le numéro de la variable
		pagenumbertxt.innerText = pagenumber;
		
		//lance le fetch des séries
		findmovie(myurlseries);
	}
});