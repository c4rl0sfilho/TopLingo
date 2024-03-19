'use strict'


function darkTheme(){

    const imagem = document.getElementById('ChangeTheme')
    const body = document.getElementById('body')

    if(imagem.src.endsWith("MOON.svg")){
        imagem.src = "./img/SUN.svg"; 
        body.classList.remove('bg-white')
        body.classList.add('bg-black')
    }else{
        imagem.src = "./img/MOON.svg";
        body.classList.remove('bg-black')
        body.classList.add('bg-white')
    }
}