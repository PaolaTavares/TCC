let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#ffcc11";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "MICO LEAO DOURADO",
            categoria:"ANIMAIS"
        },
        palavra002 = {
            nome: "ONÇA PINTADA",
            categoria:"ANIMAIS"
        },
        palavra003 = {
            nome: "LOBO GUARA",
            categoria:"ANIMAIS"
        },
        palavra004 = {
            nome: "ARARA AZUL",
            categoria:"ANIMAIS"
        },
        palavra005 = {
            nome: "ANTA",
            categoria:"ANIMAIS"
        },
        palavra006 = {
            nome: "PICA PAU AMARELO",
            categoria:"ANIMAIS"
        },
        palavra007 = {
            nome: "PEIXE BOI",
            categoria:"ANIMAIS"
        },
        palavra008 = {
            nome: "ARIRANHA",
            categoria:"ANIMAIS"
        },
        palavra009 = {
            nome: "MACACO PREGO",
            categoria:"ANIMAIS"
        },
        palavra010 = {
            nome: "TAMANDUA BANDEIRA",
            categoria:"ANIMAIS"
        },
        palavra011 = {
            nome: "ACRE",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra012 = {
            nome: "AMAZONAS",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra013 = {
            nome: "BAHIA",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra014 = {
            nome: "PERNAMBUCO",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra015 = {
            nome: "MOTOCICLETA",
            categoria:"RORAIMA"
        },
        palavra016 = {
            nome: "PARA",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra017 = {
            nome: "MATO GROSSO",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra018 = {
            nome: "MINAS GERAIS",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra019 = {
            nome: "RIO GRANDE DO SUL",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra020 = {
            nome: "SAO PAULO",
            categoria:"ESTADO BRASILEIRO"
        },
        palavra021 = {
            nome: "MOCHILA",
            categoria:"OBJETOS"
        },
        palavra022 = {
            nome: "GARRAFA",
            categoria:"OBJETOS"
        },
        palavra023 = {
            nome: "CHAVEIRO",
            categoria:"OBJETOS"
        },
        palavra024 = {
            nome: "BONE",
            categoria:"OBJETOS"
        },
        palavra025 = {
            nome: "CANECA",
            categoria:"OBJETOS"
        },
        palavra026 = {
            nome: "CAMISETA",
            categoria:"OBJETOS"
        },
        palavra027 = {
            nome: "LANCHEIRA",
            categoria:"OBJETOS"
        },
        palavra028 = {
            nome: "OCULOS",
            categoria:"OBJETOS"
        },
        palavra029 = {
            nome: "CHAVE",
            categoria:"OBJETOS"
        },
        palavra030 = {
            nome: "LAPIS",
            categoria:"OBJETOS"
        },
        palavra031 = {
            nome: "MELANCIA",
            categoria:"ALIMENTOS"
        },
        palavra032 = {
            nome: "BROCOLIS",
            categoria:"ALIMENTOS"
        },
        palavra033 = {
            nome: "ARROZ",
            categoria:"ALIMENTOS"
        },
        palavra034 = {
            nome: "FEIJAO",
            categoria:"ALIMENTOS"
        },
        palavra035 = {
            nome: "BATATA",
            categoria:"ALIMENTOS"
        },
        palavra036 = {
            nome: "ALFACE",
            categoria:"ALIMENTOS"
        },
        palavra037 = {
            nome: "TOMATE",
            categoria:"ALIMENTOS"
        },
        palavra038 = {
            nome: "ABOBRINHA",
            categoria:"ALIMENTOS"
        },
        palavra039 = {
            nome: "MACARRAO",
            categoria:"ALIMENTOS"
        },
        palavra040 = {
            nome: "SOPA",
            categoria:"ALIMENTOS"
        },
        palavra041 = {
            nome: "DESMATAMENTO ",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra042 = {
            nome: "QUEIMADAS",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra043 = {
            nome: "LIXO",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra044 = {
            nome: "DESPERDICIO",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra045 = {
            nome: "POLUIÇAO",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra046 = {
            nome: "FUMAÇA",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra047 = {
            nome: "EXTINÇAO DE ESPECIES",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra048 = {
            nome: "MUDANÇAS CLIMATICAS",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra049 = {
            nome: "AGROTOXICOS",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra050 = {
            nome: "DEGRADAÇÃO DO SOLO",
            categoria:"FAZEM MAL AO PLANETA"
        },
        palavra051 = {
            nome: "A ERA DO GELO",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra052 = {
            nome: "HOMEM ARANHA",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra053 = {
            nome: "PICA-PAU",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra054 = {
            nome: "TOM E JERRY",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra055 = {
            nome: "JOVENS TITANS",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra056 = {
            nome: "AS MENINAS SUPER-PODEROSAS",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra057 = {
            nome: "AS TARTARUGAS NINJA",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra058 = {
            nome: "FROZEN",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra059 = {
            nome: "BOB ESPONJA",
            categoria:"DESENHOS ANIMADOS"
        },
        palavra060 = {
            nome: "PEPPA PIG",
            categoria:"DESENHOS ANIMADOS"
        }
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}