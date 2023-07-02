import { process } from "./env"
import { Configuration, OpenAIApi } from "openai"

const setupTextarea = document.getElementById('setup-textarea') 
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')
const configuration = new Configuration({
  apikey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
  if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
  }
  fetchBotReply();
})


function fetchBotReply(){
    const text = "who are you in 7 words or less "
    fetch(url, {
      'method': 'POST',
      'headers': {
        'content-type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
        },
      body: JSON.stringify ({
        'model': 'text-davinci-003',
        'prompt': `${text}`,
        'max_tokens': 10
      })
      } 
    ).then(response => response.json()).then(data => movieBossText.innerText = data.choices[0].text)
}