'use strict'

//importar as funções
import { getLanguages, loadTranslation } from "./api/tradutor.js";

//inputs importantes -> o do texto escrito e do resultado da tradução
const textoInput = document.getElementById('texto')
const result = document.getElementById('resultado')

//variáveis pra definir os idiomas padrão
let idiomaOriginal = 'pt'
let idiomaFinal = 'en'

//////////////////
//texto para voz
const synth = window.speechSynthesis;
function setSpeech() {
    return new Promise(
        function (resolve) {
            let id;
            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                } }, 10);
        }
    )
}
async function getVoiceList(){
    let speechs = setSpeech();
    let voices = speechs.then((voices) => {
    return voices
    });    
    return voices
}
let languageVoice

/////////////

//TRADUZIR
const traduzir = async () =>{

    const texto = textoInput.value
    const fromLanguage = idiomaOriginal
    const toLanguage = idiomaFinal
    const traduzido = await loadTranslation(fromLanguage, toLanguage, texto)

    result.value = traduzido 
}
const mudarBandeiras = () =>{

    const bandeiras = document.querySelectorAll('.bandeira')
    const bandeiraEntrada = bandeiras[0]
    const bandeiraSaida = bandeiras[1]

    bandeiraEntrada.src = `./img/${idiomaOriginal}.svg`
    bandeiraSaida.src = `./img/${idiomaFinal}.svg`

}
//pega as duas setas para baixo
const dropdowns = document.querySelectorAll('.seta')

//lista os idiomas disponíveis para o input de tradução
const listaCima = document.querySelector('.lista-cima')
const listarIdiomasOriginais = (idioma) =>{
    const idiomaListado = document.createElement('p')
    idiomaListado.classList.add('idioma-lista')
    idiomaListado.textContent = idioma[1].name
    listaCima.appendChild(idiomaListado)

    //ao clicar no idioma da lista, executa a função que pega a sigla e guarda em uma variável
    idiomaListado.addEventListener('click', () =>{
        pegarIdiomaOriginal(idioma)
        listaCima.classList.remove('mostrar')
        mudarBandeiras()
    })
}

//quando clicar na seta do input de cima, irá mostrar a lista de idiomas de entrada e esconder a lista de baixo, caso esteja mostrando
dropdowns[0].addEventListener('click', () =>{
    listaCima.classList.toggle('mostrar')
    listaBaixo.classList.remove('mostrar')
})

//lista os idiomas disponíveis para o resultado
const listaBaixo = document.querySelector('.lista-baixo')
const listarIdiomasFinais = (idioma) =>{
    const idiomaListado = document.createElement('p')
    idiomaListado.classList.add('idioma-lista')
    idiomaListado.textContent = idioma[1].name
    listaBaixo.appendChild(idiomaListado)
    

    //ao clicar no idioma da lista, executa a função que pega a sigla e guarda em uma variável
    idiomaListado.addEventListener('click', async () =>{

        let voices = await getVoiceList()
        const audio = document.querySelector('.audio')
        voices.forEach(voice =>{
            // console.log(voice.name)
            if(voice.name.toLowerCase().includes(idioma[1].nativeName.toLowerCase()) ){
                audio.classList.add('mostrar')
                languageVoice = voice
                console.log(voice)
            }else{
                audio.classList.remove('mostrar')
            }
        })
        pegarIdiomaFinal(idioma)
        listaBaixo.classList.remove('mostrar')
        mudarBandeiras()
    })
}
//quando clicar na seta do input de cima, irá mostrar a lista de idiomas de saída e esconder a lista de cima, caso esteja mostrando
dropdowns[1].addEventListener('click', () => {
    listaBaixo.classList.toggle('mostrar')
    listaCima.classList.remove('mostrar')
})

//funções para pegar os idiomas escolhidos
const pegarIdiomaOriginal = (idioma) => {

    idiomaOriginal = idioma[0]
    return idiomaOriginal
}
const pegarIdiomaFinal = (idioma) =>{
    idiomaFinal = idioma[0]
    return idiomaFinal
}

//inverter idiomas
const inverterIdiomas = () =>{
    
    //variável para guardar o valor originakl do idioma de entrada
    let idioma1 = idiomaOriginal
    //inverter
    idiomaOriginal = idiomaFinal
    idiomaFinal = idioma1

    mudarBandeiras()
    console.log(idiomaOriginal, idiomaFinal)
}
//inverte os idiomas ao clicar no botão de inverter
const botaoInverter = document.getElementById('inverter')
botaoInverter.addEventListener('click', inverterIdiomas)

   


//lista os idiomas
const listaDeIdiomas = await getLanguages().then(data =>{
    const listaIdiomas = Object.entries(data)
    return listaIdiomas
})

listaDeIdiomas.forEach(idioma =>{
   listarIdiomasOriginais(idioma)
   listarIdiomasFinais(idioma)
})





///// MUDANÇA DE TEMA

function darkTheme () {

    const imagem = document.getElementById('ChangeTheme')
    const body = document.getElementById('body')
    const setas = document.querySelectorAll('.seta')
    

    if(imagem.src.endsWith("MOON.svg")){
        imagem.src = "./img/SUN.svg"; 
        body.classList.remove('bg-white')
        body.classList.add('bg-black')
        textoInput.classList.add('txt-white')
        result.classList.add('txt-white')
        setas[0].src = './img/seta.svg'
        setas[1].src = './img/seta.svg'
        botaoInverter.src = './img/inverter-claro.svg'
    }else{
        imagem.src = "./img/MOON.svg";
        body.classList.remove('bg-black')
        body.classList.add('bg-white')
        textoInput.classList.remove('txt-white')
        result.classList.remove('txt-white')
        setas[0].src = './img/dropdown.svg'
        setas[1].src = './img/dropdown.svg'
        botaoInverter.src = './img/inverter.svg'
    }
}

//muda o tema 
const changeTheme = document.getElementById('ChangeTheme')
changeTheme.addEventListener('click', darkTheme)


const getSpeech = async () =>{
    event.preventDefault();
  
    const voices = await getVoiceList()
    const sendSpeech = new SpeechSynthesisUtterance(result.value);
    const selectedVoice = languageVoice;
    for (const voice of voices) {
      if (voice.name === selectedVoice.name) {
        sendSpeech.voice = voice;
      }
    }
    synth.speak(sendSpeech);

}

//EVENT LISTENER para chamar o resultado com enter
textoInput.addEventListener('keypress', function (e) {
    const conteudoDoTexto = textoInput.value
    if (e.key ==='Enter'){
        if(conteudoDoTexto == 'alice'){
            darkTheme()
        } else {
            traduzir()
            getSpeech()
        }
    }
})    