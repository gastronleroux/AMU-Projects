document.getElementById("wrp").addEventListener( "mouseover", () => changeMaxWidth('wrp', ['ana', 'log', 'emp']) )
document.getElementById("ana").addEventListener( "mouseover", () => changeMaxWidth('ana', ['wrp', 'log', 'emp']) )
document.getElementById("log").addEventListener( "mouseover", () => changeMaxWidth('log', ['wrp', 'ana', 'emp']) )
document.getElementById("emp").addEventListener( "mouseover", () => changeMaxWidth('emp', ['wrp', 'ana', 'log']) )

function changeMaxWidth(intoNone, intoInt, n = 150){
    if(document.getElementById(intoNone).style.width != 'inherit'){
        document.getElementById(intoNone).style.width = 'inherit';
        for (let i = 0; i < intoInt.length; i++){
            document.getElementById(intoInt[i]).style.width = n;
        }
    }
}