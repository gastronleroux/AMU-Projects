setTimeout(function(){ document.getElementById("up").style.opacity=1; document.getElementById("up").style.marginTop=0; }, 10);
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
			tab.innerHTML="<p style='cursor:default;text-align:center; margin:0; margin-bottom:10px; font-size:25px'>Przedział uniemożliwa znalezienie miejsca zerowego</p>";
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
			tab.innerHTML="<p style='cursor:default;text-align:center; margin:0; margin-bottom:10px; font-size:25px'>Miejsce zerowe funkcji w przybliżeniu wynosi d = "+delta+" </p>";		
		}
	}catch{
		tab.innerHTML="<p style='cursor:default;text-align:center; margin:0; margin-bottom:10px; font-size:25px'>Funkcja jest niepoprawna</p>";
	}
	
	setTimeout(function(){ tab.style.transition="opacity 1s"; tab.style.opacity=1; }, 20);
}