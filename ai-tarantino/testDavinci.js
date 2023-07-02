const apiKey = "" //Enter your openai API key here, dont commit this to your github/repo
const url = "https://api.openai.com/v1/completions"

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Autherization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': 'who is the first person from India to walk on the Moon?'
    })

}).then(response => response.json()).then(data => console.log())