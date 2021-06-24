if(localStorage.getItem('lang') === null){
    localStorage.setItem('lang', 'en');
}
const currLang = localStorage.getItem('lang');
var lang = {
    pl: {
        wrp: {
            val1: "Łańcuchy Markowa na podstawie Covid-19",
            val2: "Wprowadź wiek zmiennej losowej",
            val3: "Czy zmienna losowa posiada znaczące dla Covid-19 choroby współistniejące?",
            val4: "Tak",
            val5: "Nie",
            val6: "Macierz przejścia",
            val7: "Rozkład stacjonarny",
            val8: "Symuluj",
            val9: "Zatrzymaj symulację",
            val10: "Wolny od Covid-19",
            val11: "Bezobjawowy",
            val12: "Gorączka",
            val13: "Duszności",
            val14: "Gorączka i duszności",
            val15: "Wyzdrowiały po Covid-19",
            val16: "Bezobjawowy po wyzdrowieniu",
            val17: "Gorączka po wyzdrowieniu",
            val18: "Duszności po wyzdrowieniu",
            val19: "Gorączka i duszności po wyzdrowieniu",
            val20: "Martwy",
            val21: "Wprowadź wymagane informacje dla zmiennej losowej",
            val22: "Prawdopodobieństwa przejścia do innych stanów",
            val23: "Z macierzy przejścia (Π) możemy zauważyć, że z dowolnego stanu istnieje prawdopodobieństwo przejścia do stanu 'Martwy', przy czym stan 'Martwy' jako jedyny odwołuje się jedynie do samego siebie. Tym samym wnioskujemy, że rozkład stacjonarny ma postać (0,0,0,0,0,0,0,0,0,0,1). Dowód",
            val24: "Jako ciekawostka, w tle zostało przeprowadzonych 1 000 symulacji błądzenia po tym łańcuchu, każdy przez 1 000 kroków (1 000 tygodni), tak wygląda rozkład prawdopodobieństwa na podstawie końcowych stanów symulacji",
            val25: "Tydzień",
            val26: "Podano niepoprawny wiek"
        },
        log: {
            val1: "Sprawdź, czy twoje zdanie jest tautologią",
            val2: "Zdanie jest tautologią",
            val3: "Zdanie jest kontrtautologią",
        },
        ana: {
            val1: "Własność Darboux",
            val2: "Wprowadź funkcję",
            val3: "Obsługiwane funkcje: pow(baza,potęga), sin(x), cos(x), log(x), abs(x)",
            val4: "Wprowadź przedział",
            val5: "Wprowadź dokładność",
            val6: "od",
            val7: "do",
            val8: "Przedział uniemożliwa znalezienie miejsca zerowego",
            val9: "Miejsce zerowe funkcji w przybliżeniu wynosi",
            val10: "Funkcja jest niepoprawna",
        }
    },
    en: {
        wrp: {
            val1: "Markov chains based on Covid-19",
            val2: "Enter the age of the random variable",
            val3: "Does the random variable have comorbidities significant for Covid-19?",
            val4: "Yes",
            val5: "No",
            val6: "Transition matrix",
            val7: "Stationary schedule",
            val8: "Simulate",
            val9: "Stop the simulation",
            val10: "Covid-19 free",
            val11: "Asymptomatic",
            val12: "Fever",
            val13: "Dyspnea",
            val14: "Fever with dyspnea",
            val15: "Recovered from Covid-19",
            val16: "Asymptomatic after recovery",
            val17: "Fever after recovery",
            val18: "Dyspnea after recovery",
            val19: "Fever with dyspnea after recovery",
            val20: "Dead",
            val21: "Enter the required information for the random variable",
            val22: "The probabilities of transition to other states",
            val23: "From the transition matrix (Π) we can see that from any state there is a probability of transition to the 'Dead' state, with the 'Dead' state as the only one referring only to itself. Thus, we conclude that the stationary distribution has the form (0,0,0,0,0,0,0,0,0,1). Proof",
            val24: "In the background, 1,000 simulations have been run along this chain, each for 1,000 steps (1,000 weeks), and this is the probability distribution based on the final states of the simulations",
            val25: "Week",
            val26: "Wrong age input"
        },
        log: {
            val1: "Check if your formula is a tautology",
            val2: "The formula is a tautology",
            val3: "The formula is a countertautology",
        },
        ana: {
            val1: "Darboux's principle",
            val2: "Input a function",
            val3: "Supported functions: pow(base, power), sin(x), cos(x), log(x), abs(x)",
            val4: "Input the range",
            val5: "Input the precision",
            val6: "from",
            val7: "to",
            val8: "The interval makes it impossible to find the zero of the function",
            val9: "Approximately the zero of the function equals",
            val10: "The function is invalid",
        }
    }
}

document.getElementById("pl").addEventListener("click", function(){
    if (currLang != 'pl'){
        localStorage.setItem("lang", "pl");
        location.reload();
    }
});
document.getElementById("en").addEventListener("click", function(){
    if (currLang != 'en'){
        localStorage.setItem("lang", "en");
        location.reload();
    }
});

window.addEventListener("load", function(){
    document.getElementById(currLang).style.opacity = 0.9; 
    document.getElementById(currLang).style.pointerEvents = "none"; 
});