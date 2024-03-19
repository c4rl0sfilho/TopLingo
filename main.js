import { getLanguages, loadTranslation } from "./api/tradutor.js";


const traduzir = async () =>{

    const texto = document.getElementById('text').value
    const result = document.getElementById('result')
    const fromLanguage = 'pt'
    const toLanguage = 'en'

    const traduzido = await loadTranslation(fromLanguage, toLanguage, texto)

    result.textContent = traduzido
   
}

const button = document.getElementById('btn')
button.addEventListener('click', traduzir)