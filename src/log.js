window.onload = function (){
	document.getElementById("val1").innerHTML = lang[currLang]["log"]["val1"];
}

setTimeout(function(){
	document.body.style.opacity=1;
	document.body.style.marginTop=0;
}, 10);
document.ondragstart = function() { return false }
document.onselectstart = function() { return false }
formula = document.getElementById("formula");

let ostatni=[-1]; let nawiasy=0; let wartosci=[];
document.getElementById("p").onclick = function(){ if(ostatni[ostatni.length-1]!=1&&ostatni[ostatni.length-1]!=5){ formula.value+="p"; ostatni.push(1); } }
document.getElementById("q").onclick = function(){ if(ostatni[ostatni.length-1]!=1&&ostatni[ostatni.length-1]!=5){ formula.value+="q"; ostatni.push(1); } }
document.getElementById("neg").onclick = function(){ if(ostatni[ostatni.length-1]!=1&&ostatni[ostatni.length-1]!=5){ formula.value+="¬"; ostatni.push(2); } }
document.getElementById("kon").onclick = function(){ if(ostatni[ostatni.length-1]==1||ostatni[ostatni.length-1]>4){ formula.value+="∧"; ostatni.push(3); } }
document.getElementById("alt").onclick = function(){ if(ostatni[ostatni.length-1]==1||ostatni[ostatni.length-1]>4){ formula.value+="∨"; ostatni.push(3); } }
document.getElementById("imp").onclick = function(){ if(ostatni[ostatni.length-1]==1||ostatni[ostatni.length-1]>4){ formula.value+="⇒"; ostatni.push(3); } }
document.getElementById("row").onclick = function(){ if(ostatni[ostatni.length-1]==1||ostatni[ostatni.length-1]>4){ formula.value+="⇔"; ostatni.push(3); } }
document.getElementById("otworz").onclick = function(){ if(ostatni[ostatni.length-1]!=1&&ostatni[ostatni.length-1]!=5){ formula.value+="("; ostatni.push(4); nawiasy++ } }
document.getElementById("zamknij").onclick = function(){ if(ostatni[ostatni.length-1]!=2&&ostatni[ostatni.length-1]!=3&&ostatni[ostatni.length-1]!=4&&nawiasy>0){ formula.value+=")"; ostatni.push(5); nawiasy--; } }
document.addEventListener('keydown', function(event){
	if((event.keyCode==8||event.keyCode==46)&&formula.value.length>0){
		formula.value = formula.value.slice(0,formula.value.length-1);
		if(ostatni[ostatni.length-1]==4) nawiasy--;
		if(ostatni[ostatni.length-1]==5) nawiasy++;
		ostatni.pop();
	}
})
document.getElementById("check").onclick = function(){ if(nawiasy==0&&formula.value.length!=0&&ostatni[ostatni.length-1]!=3&&ostatni[ostatni.length-1]!=2) check(formula.value) }

function check(zdanie){
	tab.style.transition=''; tab.style.opacity=0;
	formula.value=''; ostatni=[-1]; nawiasy=0;
	zdanieOr = zdanie; zdanie = "("+zdanie+")";
	zdanie = zdanie.replace(/¬/g, "!"); zdanie = zdanie.replace(/∧/g, "*"); zdanie = zdanie.replace(/∨/g, "||");
	zdanie = zdanie.replace(/⇒/g, "<="); zdanie = zdanie.replace(/⇔/g, ")==(");
	for(let i=1;i>=0;i--){
		if(zdanie.includes('p')&&zdanie.includes('q')){
			for(let j=1;j>=0;j--){
				let box=zdanie; box = box.replace(/p/g,i); box = box.replace(/q/g,j);
				wartosci.push(eval("+(("+box+")&&1)"));
			}
		}else{
			let box=zdanie; box = box.replace(/p/g,i); box = box.replace(/q/g,i);
			wartosci.push(eval("+(("+box+")&&1)"));
		}
	}
	
	let x;
	if(zdanie.includes('p')){
		if(zdanie.includes('q')) x=['p','q']; else x='p';
	}else{ x='q' }
	let y=true;
	for(let i=0; i<=wartosci.length-2; i++){
		if(wartosci[i]!=wartosci[i+1]){ y=false; break}
	}
	tab.innerHTML="";
	if(y&&wartosci[0])tab.innerHTML="<p style='cursor:default;text-align:center; margin:0; margin-bottom:10px; font-size:40px'>"+lang[currLang]["log"]["val2"]+"</p>";
	if(y&&!wartosci[0])tab.innerHTML="<p style='cursor:default;text-align:center; margin:0; margin-bottom:10px; font-size:40px'>"+lang[currLang]["log"]["val3"]+"</p>";
	if(document.getElementById("tab").querySelector('p'))document.getElementById("tab").querySelector('p').style.fontFamily="'Amatic SC', sans-serif";
	
	if(typeof x == "string"){
		tab.innerHTML+="<table style='font-size: 25px; text-align:center; width:80%; margin-left:10%;'><tr><td style='border-radius: 10px 0px 0px 0px;background-color:#cfc7c9;width:15%'>"+x+"</td><td style='border-radius: 0px 10px 0px 0px;background-color:#cfc7c9;width:85%'>"+zdanieOr+"</td></tr><tr><td style='width:15%;background-color:#dbd5d7'>0</td><td style='width:85%;background-color:#dbd5d7'>"+wartosci.pop()+"</td></tr><tr><td style='border-radius: 0px 0px 0px 10px;width:15%;background-color:#dbd5d7'>1</td><td style='border-radius: 0px 0px 10px 0px;width:85%;background-color:#dbd5d7'>"+wartosci.pop()+"</td></tr></table>";
	}else{
		tab.innerHTML+="<table style='font-size: 25px; text-align:center; width:90%; margin-left:5%;'><tr><td style='border-radius: 10px 0px 0px 0px;background-color:#cfc7c9;width:10%'>"+x[0]+"</td><td style='background-color:#cfc7c9;width:10%'>"+x[1]+"</td><td style='border-radius: 0px 10px 0px 0px;background-color:#cfc7c9;width:80%'>"+zdanieOr+"</td></tr><tr><td style='width:10%;background-color:#dbd5d7'>0</td><td style='width:10%;background-color:#dbd5d7'>0</td><td style='width:80%;background-color:#dbd5d7'>"+wartosci.pop()+"</td></tr><tr><td style='width:10%;background-color:#dbd5d7'>0</td><td style='width:10%;background-color:#dbd5d7'>1</td><td style='width:80%;background-color:#dbd5d7'>"+wartosci.pop()+"</td></tr><tr><td style='width:10%;background-color:#dbd5d7'>1</td><td style='width:10%;background-color:#dbd5d7'>0</td><td style='width:80%;background-color:#dbd5d7'>"+wartosci.pop()+"</td></tr><tr><td style='border-radius: 0px 0px 0px 10px;width:10%;background-color:#dbd5d7'>1</td><td style='width:10%;background-color:#dbd5d7'>1</td><td style='border-radius: 0px 0px 10px 0px;width:80%;background-color:#dbd5d7'>"+wartosci.pop()+"</td></tr></table>";
	}
	setTimeout(function(){ tab.style.transition="opacity 1s"; tab.style.opacity=1; }, 20);
}