import {mykey} from '../../key.js';

let mybodyhtml = document.getElementById('body-product');
let mybodytxt = document.getElementById('body-txt');
let mynavtitle = document.getElementById('my-nav-title');
let myid = localStorage.getItem('id');
let myimg = document.getElementById('my-img');
let mytitle = document.getElementById('my-title');
let myresume = document.getElementById('synopsis');
let mystatus = document.getElementById('status');
let mydate = document.getElementById('date');
let myruntime = document.getElementById('runtime');
let mygenre = document.getElementById('genre');

let altresume = 'Il n\'y a pas d\'informations pour ce films...';

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
		});
};

findid(`https://api.themoviedb.org/3/movie/${myid}?api_key=${mykey}&language=fr`);

const myformat = (mydate) => {
	let mymonths = [null,'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
	let myday = mydate.slice(-2);
	let mymonth = mydate.slice(6,7);
	mymonth = mymonths[mymonth];
	let myyear = mydate.slice(0,4);
	let mynewdate = `${myday} ${mymonth} ${myyear}`;
	return mynewdate;
};

const myformath = (mytime) => {
	let myhours = Math.floor(mytime / 60);
	let myminutes = mytime % 60;
	let mynewtime = `${myhours}h${myminutes}min`;
	return mynewtime;
};

const datamanage = (myjson) => {
	mybodytxt.style.backgroundImage = `URL(https://image.tmdb.org/t/p/original/${myjson.backdrop_path})`;
	mynavtitle.innerText = myjson.original_title;
	myimg.src = `https://image.tmdb.org/t/p/original/${myjson.poster_path}`;
	myimg.alt = 'Pas d\'image pour ce film';
	mybodyhtml.style.height = myimg.height;
	mytitle.innerText = myjson.original_title;
	mytitle.style.textTransform = 'uppercase';
	if(myjson.genres.lenght > 0)
	{
		mygenre.innerText = `${myjson.genres[0].name}`;
		mygenre.style.fontSize = '20px';
	}
	if(myjson.status === 'In Production'){ mystatus.style.color = 'red';}
	mystatus.innerText = myjson.status;
	mydate.innerHTML = `Sortie le : <b>${myformat(myjson.release_date)}</b>`;
	mydate.style.fontStyle = 'italic';
	if(myjson.overview === '')
	{
		myresume.innerText = altresume;
	}
	else 
	{
		myresume.innerText = myjson.overview;
	}
	myresume.style.fontSize = '20px';
	myruntime.innerHTML = `Durée : <b>${myformath(myjson.runtime)}</b>`;
};