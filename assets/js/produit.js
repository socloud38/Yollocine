//import de la clé API via mon modul key.js
import {mykey} from '../../key.js';

//metavar
let metatitle = document.querySelectorAll('.meta-title');
let metadescr = document.querySelectorAll('.meta-descr');

//
let mybodytxt = document.getElementById('body-txt');
let mytxtdiv = document.getElementById('my-txt-div');

//
let myimgdiv = document.getElementById('my-img-div');
let mycardimg = document.getElementById('card-img');

//var de mon titre d'onglet
let mynavtitle = document.getElementById('my-nav-title');

//recupération de l'ID du film choisis dans mon localstorage
let myid = localStorage.getItem('id');
//recupération du status de mes input radio (films/series) choisis dans mon localstorage
let mystyle = localStorage.getItem('movie');

//var mon image
let myimg = document.getElementById('my-img');
//var mon titre
let mytitle = document.getElementById('my-title');
//var du reseumé
let myresume = document.getElementById('synopsis');
//var du status du film
let mystatus = document.getElementById('status');
//var de ma date
let mydate = document.getElementById('date');
//var de la durée du film
let myruntime = document.getElementById('runtime');
//var du genre du film
let mygenre = document.getElementById('genre');
//var d'une alternative si il n'y a pas de resumé disponible
let altresume = 'Il n\'y a pas d\'informations pour ce films...';

//fetch par rapport a l'ID du film trouvé dans le localstorage
const findid = (url) =>
{
	//fetch
	fetch(url)
		//then
		.then((response) =>
		{
			//transformation en JSON
			return response.json();
		})
		//then
		.then((transformation) =>{
			console.log(transformation);
			//determine si films ou série 
			if(mystyle === 'true')
			{
				//films
				datamanagemovies(transformation);
			}
			else 
			{
				//séries
				datamanageseries(transformation);
			}
		});
};

//test si films ou série
if(mystyle === 'true')
{
	//films
	findid(`https://api.themoviedb.org/3/movie/${myid}?api_key=${mykey}&language=fr`);
}
else if(mystyle === 'false')
{
	//séries
	findid(`https://api.themoviedb.org/3/tv/${myid}?api_key=${mykey}&language=fr`);
}

//fct pour formater la date en "Day Month(en lettre) Year"
const myformat = (mydate) => {
	//création d'un tableau avec tout les mois "null" sert a faire tomber janvier sur 1 et non 0
	let mymonths = [null,'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
	//slice de la date pour récuperer juste le jour de sortie
	let myday = mydate.slice(-2);
	//slice de la date pour récuperer just le mois
	let mymonth = mydate.slice(5,7);
	//le mois = l'index correspondant dans mon tableau parsint pour transformer les 01 en 1 etc...
	mymonth = mymonths[parseInt(mymonth)];
	//recuperation de l'année
	let myyear = mydate.slice(0,4);
	//concatenne la date
	let mynewdate = `${myday} ${mymonth} ${myyear}`;
	//return ma date formaté
	return mynewdate;
};

//fct pour formater le runtime en hh 'H' mm 'M'
const myformath = (mytime) => {
	//recupérer les heures en divisant le runetime par 60
	let myhours = Math.floor(mytime / 60);
	//recupération des minute en utilisant un modulo
	let myminutes = mytime % 60;
	//concatenne le nouveau runtime
	let mynewtime = `${myhours}h${myminutes}min`;
	//return ma runtime formaté
	return mynewtime;
};

//fct qui manage toute les donées du films obtenue
const datamanagemovies = (myjson) => {
	//met l'image2 du film en fond
	mybodytxt.style.backgroundImage = `URL(https://image.tmdb.org/t/p/original/${myjson.backdrop_path})`;
	//met le titre du film en titre de l'onglet
	mynavtitle.innerText = myjson.original_title;
	//SEO schema
	mynavtitle.itemtype = 'https://schema.org/name';
	//met l'image1 du film dans la carte prévu
	myimg.src = `https://image.tmdb.org/t/p/original/${myjson.poster_path}`;
	//SEO schema
	myimg.itemtype = 'https://schema.org/image';
	//met une alternative si il n'y a pas d'images
	myimg.alt = 'Pas d\'image pour ce film';
	//met le titre dans le H1 prevu
	mytitle.innerText = myjson.original_title;
	//SEO schema
	mytitle.itemtype = 'https://schema.org/name';
	//met le titre en capitale
	mytitle.style.textTransform = 'uppercase';
	//test si il y a un genre pour le films obtenue
	if(myjson.genres[0] != null)
	{
		//met le genre trouver en position 0 du tableau du JSON
		mygenre.innerText = `${myjson.genres[0].name}`;
		//test si il y en a un 2eme
		if(myjson.genres[1] != null)
		{
			//l'affiche
			mygenre.innerText = `${myjson.genres[0].name} ${myjson.genres[1].name}`;
		}
		//SEO schema
		mygenre.itemtype = 'https://schema.org/genre';
		//font size du genre a 20px
		mygenre.style.fontSize = '20px';
	}
	//test si le statut est en production pour le mettre en rouge sinon vert
	if(myjson.status === 'In Production'){ mystatus.style.color = 'red';}
	//SEO schema
	mystatus.itemtype = 'https://schema.org/status';
	//met le status du film dans l'HTML
	mystatus.innerText = myjson.status;
	//met la date dans le HTML
	mydate.innerHTML = `Sortie le : <b>${myformat(myjson.release_date)}</b>`;
	//SEO schema
	mydate.itemtype = 'https://schema.org/Date';
	//met la date en italic
	mydate.style.fontStyle = 'italic';
	//test si il y a un resumé ou non
	if(myjson.overview === '')
	{
		//si il y en a pas on met l'alternative crée
		myresume.innerText = altresume;
		//SEO schema
		myresume.texttype = 'https://schema.org/description';
	}
	else 
	{
		//sinon affiché celui disponible
		myresume.innerText = myjson.overview;
		//SEO schema
		myresume.texttype = 'https://schema.org/description';
	}
	//font size du resumé
	myresume.style.fontSize = '16px';

	//SEO schema
	myruntime.itemtype = 'https://schema.org/Duration';
	//met la durée du film formaté dans le HTML
	myruntime.innerHTML = `Durée : <b>${myformath(myjson.runtime)}</b>`;

	//meta
	for (let i = 0; i < metatitle.length; i++) {

		//SEO meta titre et resumé coupé a 100caracteres
		metatitle[i].content = myjson.original_title;
		metadescr[i].content = myjson.overview.slice(0, 100);

	}
};

//fct séries
const datamanageseries = (myjson) => {
	//met l'image2 de la série en fond
	mybodytxt.style.backgroundImage = `URL(https://image.tmdb.org/t/p/original/${myjson.backdrop_path})`;
	//met le titre dans l'onglet
	mynavtitle.innerText = myjson.name;
	//met l'image1 de la série dans la carte prévu
	myimg.src = `https://image.tmdb.org/t/p/original/${myjson.poster_path}`;
	//met une alternative a l'image
	myimg.alt = 'Pas d\'image pour cette série';
	//met le titre de la série
	mytitle.innerText = myjson.name;
	//en capitale
	mytitle.style.textTransform = 'uppercase';
	//test si il y a un genre ou non
	if(myjson.genres.lenght > 0)
	{
		//ajout du 1er genre de la list
		mygenre.innerText = `${myjson.genres[0].name}`;
		//font size 20px
		mygenre.style.fontSize = '20px';
	}
	//test si le status est encore en cour de production alors rouge sinon vert
	if(myjson.status === 'Returning Series'){ mystatus.style.color = 'red';}
	//met le status dans l'HTML
	mystatus.innerText = myjson.status;
	//met la date formatée dans l'HTML
	mydate.innerHTML = `Sortie le : <b>${myformat(myjson.first_air_date)}</b>`;
	//en italic
	mydate.style.fontStyle = 'italic';
	//test si il y a ou non un résumé
	if(myjson.overview === '')
	{
		//non alors je met mon alternative crée
		myresume.innerText = altresume;
	}
	else 
	{
		//oui je met le resumé disponible
		myresume.innerText = myjson.overview;
	}
	//font size 16px
	myresume.style.fontSize = '16px';
	//affiche le nombres de saisons et d'épisodes
	myruntime.innerHTML = `Nombre de saisons : <b>${myjson.number_of_seasons}</b> </br> Nombre d'épisodes : <b>${myjson.number_of_episodes}</b>`;
};

//event au click sur l'image (la carte)
myimg.addEventListener('click', () => {
	//test si l'image est déja scale ou non
	let imgbool = false;

	//cache le TXT
	mytxtdiv.style.display = 'none';
	//reduit la widht de la grid a 50%
	myimgdiv.style.width = '50%';
	//met 100 de viewHeight
	myimgdiv.style.height = '100vh';
	//un backgroundcolor noir opacity 0.7
	myimgdiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
	//enleve les grid bootstrap
	myimgdiv.classList.remove('col-12');
	//pareil
	myimgdiv.classList.remove('col-md-6');
	//fais un scaling de 1.3 sur l'image
	mycardimg.style.transform = ('scale(1.3)');

	//laisse 0,1s avant de pouvoir désactiver le zoom de l'image
	setTimeout( () => {
		//l'image peut etre dezoomer
		imgbool = true;
	}, 100)

	//event click sur tout le document
	document.addEventListener('click', e => {
		//si l'image peut etre dezoomé
		if(imgbool === true)
		{
			console.log(e.target.id);
			//si l'user click partout sauf sur l'image celle ci ce dezoom
			if(e.target.id != 'my-img');
			{
				//affiche le TXT
				mytxtdiv.style.display = '';
				//enleve le background noir opacity 0.7
				myimgdiv.style.backgroundColor = '';
				//grid bootstrap
				myimgdiv.classList.add('col-12');
				//pareil
				myimgdiv.classList.add('col-md-6');
				//remet le scaling a 1 de l'img
				mycardimg.style.transform = ('scale(1)');
				//l'img peut a nouveau etre zoomé
				imgbool = false;
			}
		}
	})
});