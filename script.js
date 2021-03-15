const button = document.getElementById('button');
const audioElement = document.
  getElementById('audio');

//Disable / Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'bf521de213d4463c98f7831f88d84c39',
    src: joke,
    hl: 'en-ca',
    v: 'Rose',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text-to-Spech
    tellMe(joke);
    //Disable Button
    toggleButton();
  } catch (error) {
    console.log('whoops', error);
  }
}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);