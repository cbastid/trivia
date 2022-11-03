let btnContinue = document.querySelector(".continue");
btnContinue.addEventListener("click", function () { callcategoria(); });


let categ = document.querySelectorAll(".categ");
let totalpuntos = document.querySelector(".puntos");

let arraycategoria = [10, 15, 30];
let difficulty = ["easy", "medium", "hard"];
let puntaje = [100, 200, 300];
let totalcont = 0;

function callcategoria() {

    totalpuntos.innerHTML = 0;
    totalcont = 0;

    for (let i = 0; i < arraycategoria.length; i++) {
        let cajas = document.querySelectorAll(".col-bloque-" + (i + 1) + " div");

        for (let x = 0; x < cajas.length; x++) {
            cajas[x].innerHTML = "<button onclick=pregunta(" + i + "," + (x + 1) + ",'" + difficulty[x] + "')>" + ((x + 1) * 100) + "</button>";
        }
        $.get("https://opentdb.com/api.php?amount=1&type=multiple&category=" + arraycategoria[i], function (data) {
            fncategoria(data.results, i);
        });
    }
}

function fncategoria(objCategoria, id) {
    categ[id].innerHTML = objCategoria[0].category
}

callcategoria();

let escorrecta = '';

function pregunta(categoria, caja, dificultad) {

    if (escorrecta === '') {
        $.get("https://opentdb.com/api.php?amount=1&difficulty=" + dificultad + "&category=" + arraycategoria[categoria], function (data) {
    
            let caja1easay = document.querySelector(".col-bloque-" + (categoria + 1) + " .caja-bloq-" + caja);

            caja1easay.innerHTML = "";

            caja1easay.innerHTML = data.results[0].question + "<br>"

            escorrecta = data.results[0].correct_answer

            caja1easay.innerHTML += "<a href='#' onclick='fncorrecta(this," + puntaje[caja - 1] + ")'>" + data.results[0].correct_answer + "</a><br>"
            for (let i = 0; i < data.results[0].incorrect_answers.length; i++) {
                caja1easay.innerHTML += "<a href='#' onclick='fncorrecta(this," + puntaje[caja - 1] + ")'>" + data.results[0].incorrect_answers[i] + "</a><br>";
            }
        });
    }
}

function fncorrecta(elemento, ptos) {

    if (escorrecta === elemento.innerText) {
        totalcont += ptos;
        elemento.parentElement.innerText = "Respuesta Correcta";
        totalpuntos.innerHTML = totalcont;
    } else {
        elemento.parentElement.innerText = "Respuesta Incorrecta";
    }
    escorrecta = '';
}