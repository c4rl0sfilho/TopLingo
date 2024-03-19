

let key = '89f9f593ce824acdbcf6271b2a7a8a52'

export async function translate (from, to, text) {
let endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`
    const options = {
        method: "POST",
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': 'brazilsouth',
            'Content-Type':'application/json'
        },
        body: `[ {'text': '${text}'}]`
    }
    const result = await fetch(endpoint, options).then( response => {
        if (!response.ok) {
            console.log(response.status)
        }

        let translation = response.json()
        return translation
    })

    return result
}

export async function getLanguages (){

    let url = 'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0'
    let option = {headers: {
        'Ocp-Apim-Subscription-Key': key
    }}
    let response = await fetch(url, option)
    let result = response.json()

    let languages = result.then(data =>{
        return data.translation
    }).then(object =>{
        return object 
    })
    return languages
}

export async function loadTranslation(from, to, text){
    const translatedText = await translate(from, to, text).then(data => {
        const translated = data[0].translations[0].text
        return translated
    })

    return translatedText
}


getLanguages()

