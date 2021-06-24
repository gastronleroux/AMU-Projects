document.getElementById("wrp").addEventListener( "mouseover", () => changeMaxWidth('wrp', ['ana', 'log']) )
document.getElementById("ana").addEventListener( "mouseover", () => changeMaxWidth('ana', ['wrp', 'log']) )
document.getElementById("log").addEventListener( "mouseover", () => changeMaxWidth('log', ['wrp', 'ana']) )
document.getElementById("emp").addEventListener( "mouseover", () => changeMaxWidth('emp', ['wrp', 'ana', 'log']) )

function changeMaxWidth(intoNone, intoInt, n = 150){
    document.getElementById(intoNone).style.width = 'inherit';
    for (let i = 0; i < intoInt.length; i++){
        document.getElementById(intoInt[i]).style.width = n;
    }
}