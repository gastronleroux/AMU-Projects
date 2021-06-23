window.onload = function (){
	for(let i = 1; i <=5; i++){
		document.getElementById("val"+i).innerHTML = lang[currLang]["wrp"]["val"+i];
	}
}

document.ondragstart = function() { return false }
document.onselectstart = function() { return false }
przyciski = document.getElementById('przyciski');
wiek = document.getElementById("wiek");
choroby = document.getElementById("tak");
choroby2 = document.getElementById("nie");
nazwaStanu = document.getElementById("nazwaStanu");
daneStanu = document.getElementById("daneStanu");
info = document.getElementById("info");
stanyDiv = document.getElementById("stany");

idAn = 0;
mPrzejsciaString = "<span id='check' class='przycisk1' onclick='kreujMacierz()' >"+lang[currLang]["wrp"]["val6"]+"</span>";
rozkladString = "<span id='checkR' class='przycisk1 mleft' onclick='pokazRozklad()' >"+lang[currLang]["wrp"]["val7"]+"</span>";
symulujString = "<span id='symuluj' class='przycisk1 mleft' onclick='symuluj()' >"+lang[currLang]["wrp"]["val8"]+"</span>";
sSymulujString = "<span id='sSymuluj' class='przycisk1 mleft' onclick='stopSymuluj()' >"+lang[currLang]["wrp"]["val9"]+"</span>";
mPrzejscia = [];
stany = Array.apply(null, new Array(11)).map((el, i) => lang[currLang]["wrp"]["val"+(++i+9)])
// 0 - Zdrowy, 1 - Bezobjawowy, 2 - Gorączka, 3 - Duszności, 4 - Gorączka i duszności, 5 - Wyzdrowiały, 6 - Bezobjawowy*, 7 - Gorączka*, 8 - Duszności*, 9 - Gorączka i duszności*, 10 - Martwy


function kreujMacierz(){
	let pMartwy = 0.001 + 0.07*(1-(Math.log(110-parseInt(wiek.value)+0.001)/Math.log(110)));
	let mnoznik = 1;
	if(choroby.checked){
		pMartwy += 0.02 + 0.1*pMartwy;
		mnoznik = 10;
	}
	let pObjawy = [0.6, 0.2, 0.15, 0.05];
	let pSmiertelnosc = [0.001*mnoznik, 0.007*mnoznik, 0.01*mnoznik, 0.014*mnoznik];
	let pChoroba = 0.10;
	let pRozwoj = 0.15;
	let pSmiertelnoscPo = [0.0005*mnoznik, 0.004*mnoznik, 0.008*mnoznik, 0.011*mnoznik];
	let pChorobaPo = 0.07;
	let pRozwojPo = 0.10;
	
	mPrzejscia[0] = [1-(pMartwy+pChoroba*(1-pMartwy)), (1-pMartwy)*pObjawy[0]*pChoroba, (1-pMartwy)*pObjawy[1]*pChoroba, (1-pMartwy)*pObjawy[2]*pChoroba, (1-pMartwy)*pObjawy[3]*pChoroba, 0, 0, 0, 0, 0, pMartwy];
	mPrzejscia[1] = [0, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[0]))*pObjawy[0]*pRozwoj, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[0]))*pObjawy[1]*pRozwoj, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[0]))*pObjawy[2]*pRozwoj, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[0]))*pObjawy[3]*pRozwoj, 1-(pMartwy+(1-pMartwy)*pSmiertelnosc[0]+pRozwoj*(1-(pMartwy+(1-pMartwy)*pSmiertelnosc[0]))), 0, 0, 0, 0, pMartwy+(1-pMartwy)*pSmiertelnosc[0]];
	mPrzejscia[2] = [0, 0, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[1]))*(1-pObjawy[3])*pRozwoj, 0, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[1]))*pObjawy[3]*pRozwoj, 1-(pMartwy+(1-pMartwy)*pSmiertelnosc[1]+pRozwoj*(1-(pMartwy+(1-pMartwy)*pSmiertelnosc[1]))), 0, 0, 0, 0, pMartwy+(1-pMartwy)*pSmiertelnosc[1]];
	mPrzejscia[3] = [0, 0, 0, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[2]))*(1-pObjawy[3])*pRozwoj, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[2]))*pObjawy[3]*pRozwoj, 1-(pMartwy+(1-pMartwy)*pSmiertelnosc[2]+pRozwoj*(1-(pMartwy+(1-pMartwy)*pSmiertelnosc[2]))), 0, 0, 0, 0, pMartwy+(1-pMartwy)*pSmiertelnosc[2]];
	mPrzejscia[4] = [0, 0, 0, 0, (1-(pMartwy+(1-pMartwy)*pSmiertelnosc[3]))*pRozwoj, 1-(pMartwy+(1-pMartwy)*pSmiertelnosc[3]+pRozwoj*(1-(pMartwy+(1-pMartwy)*pSmiertelnosc[3]))), 0, 0, 0, 0, pMartwy+(1-pMartwy)*pSmiertelnosc[3]];
	mPrzejscia[5] = [0, 0, 0, 0, 0, 1-(pMartwy+pChorobaPo*(1-pMartwy)), (1-pMartwy)*pObjawy[0]*pChorobaPo, (1-pMartwy)*pObjawy[1]*pChorobaPo, (1-pMartwy)*pObjawy[2]*pChorobaPo, (1-pMartwy)*pObjawy[3]*pChorobaPo, pMartwy];
	mPrzejscia[6] = [0, 0, 0, 0, 0, 1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[0]+pRozwojPo*(1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[0]))), (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[0]))*pObjawy[0]*pRozwojPo, (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[0]))*pObjawy[1]*pRozwojPo, (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[0]))*pObjawy[2]*pRozwojPo, (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[0]))*pObjawy[3]*pRozwojPo, pMartwy+(1-pMartwy)*pSmiertelnoscPo[0]];
	mPrzejscia[7] = [0, 0, 0, 0, 0, 1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[1]+pRozwojPo*(1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[1]))), 0, (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[1]))*(1-pObjawy[3])*pRozwojPo, 0, (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[1]))*pObjawy[3]*pRozwojPo, pMartwy+(1-pMartwy)*pSmiertelnoscPo[1]];
	mPrzejscia[8] = [0, 0, 0, 0, 0, 1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[2]+pRozwojPo*(1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[2]))), 0, 0, (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[2]))*(1-pObjawy[3])*pRozwojPo, (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[2]))*pObjawy[3]*pRozwojPo, pMartwy+(1-pMartwy)*pSmiertelnoscPo[2]];
	mPrzejscia[9] = [0, 0, 0, 0, 0, 1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[3]+pRozwojPo*(1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[3]))), 0, 0, 0, (1-(pMartwy+(1-pMartwy)*pSmiertelnoscPo[3]))*pRozwojPo, pMartwy+(1-pMartwy)*pSmiertelnoscPo[3]];
	mPrzejscia[10] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
	let mTable = document.createElement("table");
	mTable.id = 'mPrzejscia';
	for(let i = 0; i<11; i++){
		let mTr = document.createElement("tr");
		mTr.id = 'm'+i;
		for(let j = 0; j<11; j++){
			let mTd = document.createElement("td");
			if(Math.round(mPrzejscia[i][j]) == mPrzejscia[i][j]) mTd.innerHTML = mPrzejscia[i][j];
			else mTd.innerHTML = mPrzejscia[i][j].toFixed(3);
			if(j==0)mTd.style.cssText = "border-left: 1px solid #786c6e;";
			if(j==10)mTd.style.cssText = "border-right: 1px solid #786c6e;";
			if(i==0&&j==0)mTd.style.cssText += "border-top: 1px solid #786c6e;";
			if(i==0&&j==10)mTd.style.cssText += "border-top: 1px solid #786c6e;";
			if(i==10&&j==10)mTd.style.cssText += "border-bottom: 1px solid #786c6e;";
			if(i==10&&j==0)mTd.style.cssText += "border-bottom: 1px solid #786c6e;";
			mTr.appendChild(mTd);
		}
		mTable.appendChild(mTr);
	}
	nazwaStanu.innerHTML = '';
	nazwaStanu.appendChild(mTable);
	daneStanu.innerHTML = "";
	
	// Wyszukiwanie rozkładu stacjonarnego poprzez algorytm, kończący się wektorem zerowym.
	/*
	let rownania = [];
	let wektor = [];
	for(let i=0;i<11;i++){
		rownania[i]=[];
		for(let j=0;j<11;j++){
			if(j!=i) rownania[i][j] = mPrzejscia[j][i];
			else rownania[i][j] = (mPrzejscia[j][i]-1);
		}
	}
	for(let i=0;i<11;i++){
		wektor[i] = 0;
	}
	alert(math.lusolve(rownania,wektor)); */
	
	przyciski.innerHTML = mPrzejsciaString+rozkladString+symulujString;
}

function wyswietl(stan){
	nazwaStanu.innerHTML = (stan+1) + " - " + stany[stan];
	if(mPrzejscia.length == 0){
		daneStanu.innerHTML = lang[currLang]["wrp"]["val21"];
	}else{
		daneStanu.innerHTML = lang[currLang]["wrp"]["val22"]+":<br>";
		for(let i = 0; i<11; i++){
			if(mPrzejscia[stan][i]!=0) daneStanu.innerHTML += "<span id='st"+i+"'>"+(i+1) + " - " + stany[i] + " [" + (mPrzejscia[stan][i]*100).toFixed(3) + "%]</span><br>";
		}
	}
}
function odwyswietl(){
	nazwaStanu.innerHTML = '';
	daneStanu.innerHTML = '';
}

function pokazRozklad(){
	nazwaStanu.innerHTML = "";
	daneStanu.innerHTML = lang[currLang]["wrp"]["val23"] + ":<br>(0,0,0,0,0,0,0,0,0,0,1)Π = (0,0,0,0,0,0,0,0,0,0,1)<br>";
	daneStanu.innerHTML += lang[currLang]["wrp"]["val24"] + ":<br>";
	daneStanu.innerHTML += "<span style='font-family: Arial, Helvetica, sans-serif; '>(" + symulujRozklad() + ")</span>";
}

function symulujRozklad(){
	let polozenie = 0;
	let wystapienia = [0,0,0,0,0,0,0,0,0,0,0];
	for(let i=0;i<1000;i++){
		for(let j=0;j<1000;j++){
			polozenie = symulujPrzejscie(polozenie);
		}
		wystapienia[polozenie]++;
	}
	for(let i = 0; i<11; i++){
		wystapienia[i] = wystapienia[i]/1000;
		if(Math.round(wystapienia[i])!=wystapienia[i]) wystapienia[i] = wystapienia[i].toFixed(3);
	}
	return wystapienia.join(', ')
}

function symulujPrzejscie(n){
	let los = Math.random();
	let sumaLos = 0;
	for(let i = 0; i<11; i++){
		if(mPrzejscia[n][i]!=0){
			sumaLos += mPrzejscia[n][i];
			if(los<sumaLos) return i;
		}
	}
}

function symuluj(){
	przyciski.innerHTML = sSymulujString;
	wiek.disabled = true;
	choroby.disabled = true;
	choroby2.disabled = true;
	info.style.opacity = 0;
	stanyDiv.onmouseleave = '';
	
	for(let i = 0; i<11; i++){
		document.getElementById("s"+(i+1)).onmouseover = '';
	}
	odwyswietl();
	idAn = setTimeout(function(){symulujKrok(0,0)}, 5);
}

poprzedniWybrany = -1;
function symulujKrok(stan,tyg){
	info.style.transition = "opacity 1s";
	document.getElementById("s"+(stan+1)).style.backgroundColor = '#a4c489';
	if(poprzedniWybrany!=-1 && poprzedniWybrany != stan) document.getElementById("s"+(poprzedniWybrany+1)).style.backgroundColor = '#cfc7c9';
	poprzedniWybrany = stan;
	wyswietl(stan);
	daneStanu.innerHTML += lang[currLang]["wrp"]["val25"]+": " + tyg;
	info.style.opacity = 1;
	for(let i = 0; i<11; i++){
		if(document.getElementById("st"+i) != null){
			document.getElementById("st"+i).style.transition = "opacity 1s, color 2s";
		}
	}
	idAn = setTimeout(function(){symulujWybor(symulujPrzejscie(stan),tyg+1)}, 1000);
}

function symulujWybor(stan,tyg){
	for(let i = 0; i<11; i++){
		if(i != stan && document.getElementById("st"+i) != null) document.getElementById("st"+i).style.opacity = 0;
	}
	document.getElementById("st"+stan).style.color = '#a4c489'
	idAn = setTimeout(function(){symulujWyblak(stan,tyg)}, 1000);
}

function symulujWyblak(stan,tyg){
	info.style.opacity = 0;
	idAn = setTimeout(function(){symulujKrok(stan,tyg)}, 1000);
}

function stopSymuluj(){
	clearTimeout(idAn);
	przyciski.innerHTML = mPrzejsciaString+rozkladString+symulujString;
	wiek.disabled = false;
	choroby.disabled = false;
	choroby2.disabled = false;
	info.style.transition = "";
	info.style.opacity = 1;
	stanyDiv.onmouseleave = function(){ odwyswietl() };
	for(let i = 0; i<11; i++){
		document.getElementById("s"+(i+1)).onmouseover = function(){ wyswietl(i) };
		document.getElementById("s"+(i+1)).style.backgroundColor = '#cfc7c9';
	}
	odwyswietl();
}

setTimeout(function(){
	document.body.style.opacity=1;
	document.body.style.marginTop=0;
	przyciski.innerHTML=mPrzejsciaString
}, 10);