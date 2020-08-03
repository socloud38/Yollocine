import {mykey} from '../../key.js';

//metavar
let metatitle = document.querySelectorAll('.meta-title');
let metadescr = document.querySelectorAll('.meta-descr');

let mybodytxt = document.getElementById('body-txt');
let mytxtdiv = document.getElementById('my-txt-div');

let myimgdiv = document.getElementById('my-img-div');
let mycardimg = document.getElementById('card-img');

let mynavtitle = document.getElementById('my-nav-title');

let myid = localStorage.getItem('id');
let mystyle = localStorage.getItem('movie');

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
			if(mystyle === 'true')
			{
				datamanagemovies(transformation);
			}
			else 
			{
				datamanageseries(transformation);
			}
		});
};

console.log(mystyle);

if(mystyle === 'true')
{
	findid(`https://api.themoviedb.org/3/movie/${myid}?api_key=${mykey}&language=fr`);
}
else if(mystyle === 'false')
{
	findid(`https://api.themoviedb.org/3/tv/${myid}?api_key=${mykey}&language=fr`);
}

const myformat = (mydate) => {
	let mymonths = [null,'Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
	let myday = mydate.slice(-2);
	let mymonth = mydate.slice(5,7);
	mymonth = mymonths[parseInt(mymonth)];
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

const datamanagemovies = (myjson) => {
	mybodytxt.style.backgroundImage = `URL(https://image.tmdb.org/t/p/original/${myjson.backdrop_path})`;
	mynavtitle.innerText = myjson.original_title;
	myimg.src = `https://image.tmdb.org/t/p/original/${myjson.poster_path}`;
	myimg.alt = 'Pas d\'image pour ce film';
	mytitle.innerText = myjson.original_title;
	mytitle.style.textTransform = 'uppercase';
	console.log(myjson.genres.lenght);
	if(myjson.genres[0] != null)
	{
		mygenre.innerText = `${myjson.genres[0].name}`;
		if(myjson.genres[1] != null)
		{
			mygenre.innerText = `${myjson.genres[0].name} ${myjson.genres[1].name}`;
		}
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
	myresume.style.fontSize = '16px';
	myruntime.innerHTML = `Durée : <b>${myformath(myjson.runtime)}</b>`;

	//meta
	console.log(myjson.overview.slice(0, 100));
	for (let i = 0; i < metatitle.length; i++) {

		metatitle[i].content = myjson.original_title;
		metadescr[i].content = myjson.overview.slice(0, 100);

	}
};

const datamanageseries = (myjson) => {
	mybodytxt.style.backgroundImage = `URL(https://image.tmdb.org/t/p/original/${myjson.backdrop_path})`;
	mynavtitle.innerText = myjson.name;
	myimg.src = `https://image.tmdb.org/t/p/original/${myjson.poster_path}`;
	myimg.alt = 'Pas d\'image pour cette série';
	mytitle.innerText = myjson.name;
	mytitle.style.textTransform = 'uppercase';
	if(myjson.genres.lenght > 0)
	{
		mygenre.innerText = `${myjson.genres[0].name}`;
		mygenre.style.fontSize = '20px';
	}
	if(myjson.status === 'Returning Series'){ mystatus.style.color = 'red';}
	mystatus.innerText = myjson.status;
	mydate.innerHTML = `Sortie le : <b>${myformat(myjson.first_air_date)}</b>`;
	mydate.style.fontStyle = 'italic';
	if(myjson.overview === '')
	{
		myresume.innerText = altresume;
	}
	else 
	{
		myresume.innerText = myjson.overview;
	}
	myresume.style.fontSize = '16px';
	myruntime.innerHTML = `Nombre de saisons : <b>${myjson.number_of_seasons}</b> </br> Nombre d'épisodes : <b>${myjson.number_of_episodes}</b>`;
};

myimg.addEventListener('click', () => {
	let imgbool = false;

	mytxtdiv.style.display = 'none';
	myimgdiv.style.width = '50%';
	myimgdiv.style.height = '100vh';
	myimgdiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
	myimgdiv.classList.remove('col-12');
	myimgdiv.classList.remove('col-md-6');
	mycardimg.style.transform = ('scale(1.3)');

	setTimeout( () => {
		imgbool = true;
	}, 100)

	document.addEventListener('click', e => {
		if(imgbool === true)
		{
			console.log(e.target.id);
			if(e.target.id != 'my-img');
			{
				mytxtdiv.style.display = '';
				myimgdiv.style.backgroundColor = '';
				myimgdiv.classList.add('col-12');
				myimgdiv.classList.add('col-md-6');
				mycardimg.style.transform = ('scale(1)');
				imgbool = false;
			}
		}
	})
});