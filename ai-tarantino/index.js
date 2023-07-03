import { process } from '/env'
import { Configuration, OpenAIApi } from 'openai'


const setupTextarea = document.getElementById('setup-textarea') 
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
   if (setupTextarea.value) {
    const userInput = setupTextarea.value
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    fetchBotReply(userInput)
    fetchSynopsis(userInput)
   }
  
})

async function fetchBotReply(outline){
  const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Be creative with "${outline}" and say that is a good idea! mention one of the aspect of the sentence.`,
      max_tokens: 60,
      //temparature: 1.5
  })
  movieBossText.innerText = response.data.choices[0].text.trim()
  console.log(response)
}

//The prompt should ask for a synopsis for a movie based on the outline supplied by the user.

async function fetchSynopsis(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate an engaging, professional and marketable movie synopsis based on the following idea: ${outline}`,
    max_tokens: 700
  })
  console.log(response)
  document.getElementById('output-text').innerText = response.data.choices[0].text.trim()
}
