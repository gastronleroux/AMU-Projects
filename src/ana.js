window.onload = function (){
	for(let i = 1; i <=5; i++){
		document.getElementById("val"+i).innerHTML = lang[currLang]["ana"]["val"+i];
	}
	document.getElementById("p_od").placeholder = lang[currLang]["ana"]["val6"];
	document.getElementById("p_do").placeholder = lang[currLang]["ana"]["val7"];
}
setTimeout(function(){
	document.body.style.opacity=1;
	document.body.style.marginTop=0;
}, 10);
document.ondragstart = function() { return false }
document.onselectstart = function() { return false }
formula = document.getElementById("formula");

document.getElementById("check").onclick = function(){ if(formula.value.length>0&&p_od.value.length>0&&p_do.value.length>0&&epsilon.value.length>0) check(formula.value, p_od.value, p_do.value, parseFloat(epsilon.value)) }

function check(funkcja, p_od, p_do, eps){
	tab.style.transition=''; tab.style.opacity=0;
	fun = funkcja.replace(/pow/g,'Math.pow');
	fun = fun.replace(/abs/g,'Math.abs');
	fun = fun.replace(/log/g,'Math.log');
	fun = fun.replace(/cos/g,'Math.cos');
	fun = fun.replace(/sin/g,'Math.sin');
	try{
		eval(fun.replace(/x/g,parseFloat(p_od))); eval(fun.replace(/x/g,parseFloat(p_do)));
		
		przedfunk = [parseFloat(p_od), parseFloat(p_do)];
		pofunk = [parseFloat(eval(fun.replace(/x/g,p_od))), parseFloat(eval(fun.replace(/x/g,p_do)))];
		
		if(pofunk[0]*pofunk[1]>=0){
			tab.innerHTML="<p class='big-title smaller'>"+lang[currLang]["ana"]["val8"]+"</p>";
		}else{
			while(Math.abs(przedfunk[0]-przedfunk[1])/2>eps){
				nowy_przedzial = parseFloat((przedfunk[0]+przedfunk[1])/2);
				if(parseFloat(eval(fun.replace(/x/g,nowy_przedzial)))>=0){
					if(pofunk[0]>=0){
						przedfunk[0] = nowy_przedzial;
						pofunk[0] = parseFloat(eval(fun.replace(/x/g,nowy_przedzial)));
					}else{
						przedfunk[1] = nowy_przedzial;
						pofunk[1] = parseFloat(eval(fun.replace(/x/g,nowy_przedzial)));
					}
				}else{
					if(pofunk[0]<0){
						przedfunk[0] = nowy_przedzial;
						pofunk[0] = parseFloat(eval(fun.replace(/x/g,nowy_przedzial)));
					}else{
						przedfunk[1] = nowy_przedzial;
						pofunk[1] = parseFloat(eval(fun.replace(/x/g,nowy_przedzial)));
					}
				}
			}
			delta = parseFloat((przedfunk[0]+przedfunk[1])/2);
			tab.innerHTML="<p class='big-title smaller'>"+lang[currLang]["ana"]["val9"]+" d = "+delta+" </p>";		
		}
	}catch{
		tab.innerHTML="<p class='big-title smaller'>"+lang[currLang]["ana"]["val10"]+"</p>";
	}
	
	setTimeout(function(){ tab.style.transition="opacity 1s"; tab.style.opacity=1; }, 20);
}