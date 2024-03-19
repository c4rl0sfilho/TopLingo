'use strict'

import { getLanguages, loadTranslation } from "./api/tradutor.js";

//inputs importantes
const textoInput = document.getElementById('texto')
const result = document.getElementById('resultado')

//TRADUZIR
const traduzir = async () =>{

    const texto = textoInput.value
    const fromLanguage = 'pt'
    const toLanguage = 'en'
    const traduzido = await loadTranslation(fromLanguage, toLanguage, texto)

    result.value = traduzido 
}

const dropdowns = document.querySelectorAll('.seta')



const listaCima = document.querySelector('.lista-cima')
const listarIdiomasOriginais = (idioma) =>{
    const idiomaListado = document.createElement('p')
    idiomaListado.classList.add('idioma-lista')
    idiomaListado.textContent = idioma[1].name
    listaCima.appendChild(idiomaListado)

    idiomaListado.addEventListener('click', () =>{
        pegarIdiomaOriginal(idioma)
    })
}
dropdowns[0].addEventListener('click', () =>{
    listaCima.classList.toggle('mostrar')
    listabaixo.classList.remove('mostrar')
})

const listaBaixo = document.querySelector('.lista-baixo')
const listarIdiomasFinais = (idioma) =>{
    const idiomaListado = document.createElement('p')
    idiomaListado.classList.add('idioma-lista')
    idiomaListado.textContent = idioma[1].name
    listaBaixo.appendChild(idiomaListado)

    idiomaListado.addEventListener('click', () =>{
        pegarIdiomaFinal(idioma)
    })
}
dropdowns[1].addEventListener('click', () => {
    listaBaixo.classList.toggle('mostrar')
    listaCima.classList.remove('mostrar')
})

const pegarIdiomaOriginal = (idioma) => {

    let idiomaOriginal = idioma[0]
    return idiomaOriginal
}
const pegarIdiomaFinal = (idioma) =>{
    const idiomaFinal = idioma[0]
    return idiomaFinal
}

const inverterIdiomas = () =>{
}
   

//EVENT LISTENER
textoInput.addEventListener('keypress', function (e) {
    if (e.key ==='Enter'){
        traduzir()
    }
})
const changeTheme = document.getElementById('ChangeTheme')
changeTheme.addEventListener('click', darkTheme)


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



    if(imagem.src.endsWith("MOON.svg")){
        imagem.src = "./img/SUN.svg"; 
        body.classList.remove('bg-white')
        body.classList.add('bg-black')
        textoInput.classList.add('txt-white')
        result.classList.add('txt-white')
    }else{
        imagem.src = "./img/MOON.svg";
        body.classList.remove('bg-black')
        body.classList.add('bg-white')
        textoInput.classList.remove('txt-white')
        result.classList.remove('txt-white')

    }
}