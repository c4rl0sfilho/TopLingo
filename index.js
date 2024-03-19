'use strict'

import { getLanguages, loadTranslation } from "./api/tradutor.js";

const textoInput = document.getElementById('texto')
const result = document.getElementById('resultado')

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


   
const traduzir = async () =>{

    const texto = textoInput.value
    
    const fromLanguage = 'pt'
    const toLanguage = 'en'

    const traduzido = await loadTranslation(fromLanguage, toLanguage, texto)

    result.value = traduzido
   
}

textoInput.addEventListener('keypress', function (e) {
    if (e.key ==='Enter'){
        traduzir()
    }
})
const changeTheme = document.getElementById('ChangeTheme')
changeTheme.addEventListener('click', darkTheme)

console.log(getLanguages())