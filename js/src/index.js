import page from 'page'
// import '@/styles/index.scss'
import './styles/index.scss'

const rootDiv = document.querySelector('#root')
const parser = new DOMParser()
const loadContent = (uri) => {
  fetch(uri)
    .then((response) => response.text())
    .then((data) => {
      const htmlDoc = parser.parseFromString(data, 'text/html')

      rootDiv.innerHTML = htmlDoc.querySelector('#root').innerHTML
    })
}
page('/', () => {
  loadContent('./index.html')
})
page('/artist', () => {
  loadContent('./artist.html')
})
page('/about', () => {
  loadContent('./about.html')
})
page()

const audio = document.getElementById("audio")    // Берём элемент audio
const thumb = document.querySelector("#player-thumb")      // Берём аудио дорожку
const btnPlay = document.querySelector("#player-play")   // Берём кнопку проигрывания
const btnPause = document.querySelector("#player-pause") // Берём кнопку паузы
const btnPrev = document.querySelector("#player-prev")   // Берём кнопку переключения предыдущего трека
const btnNext = document.querySelector("#player-next")   // Берём кнопку переключение следующего трека
const btnVolMinus = document.querySelector("#volume__minus")
const btnVolPlus = document.querySelector("#volume__plus")


const player = document.querySelector("#player")




let audioPlay

const playlist = [
  'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
  'https://rss.art19.com/episodes/b243d284-1b4f-4b15-99f1-e2a5d1fe8c86.mp3?rss_browser=BAhJIglKYXZhBjoGRVQ%3D--631732772f14ff418ee41471e1d52549d5878e4a',
  'https://rss.art19.com/episodes/2106301c-0a16-40a5-91e5-ab428cdbbe5a.mp3',
  'https://rss.art19.com/episodes/e6527fc1-cf49-438a-af03-032d48d09251.mp3'
]

let treck // Переменная с индексом трека

// Событие перед загрузкой страницы
window.onload = function() {
  treck = 0 // Присваиваем переменной ноль
  const showPlayerBtn = document.querySelector("#show-player")
  showPlayerBtn.addEventListener("click", () => {
    player.className = "player"
  })
}

function switchTreck (numTreck) {
  // Меняем значение атрибута src
  audio.src = playlist[numTreck]
  // Назначаем время песни ноль
  audio.currentTime = 0
  // Включаем песню
  audio.play()
}


btnPlay.addEventListener("click", () => {
  audio.play() // Запуск песни
  btnPause.className += "audio-btn audio-btn__pause audio-btn__pause--show"
  btnPlay.className = "audio-btn audio-btn__play audio-btn__play--hide"
  // Запуск интервала 
  audioPlay = setInterval(() => {
    // Получаем значение на какой секунде песня
    const audioTime = Math.round(audio.currentTime)
    // Получаем всё время песни
    const audioLength = Math.round(audio.duration)
    // Назначаем ширину элементу time
    thumb.style.width = (audioTime * 100) / audioLength + '%'
    // Сравниваем, на какой секунде сейчас трек и всего сколько времени длится
    // И проверяем что переменная treck меньше четырёх
    if (audioTime == audioLength && treck < 3) {
      treck++ // То Увеличиваем переменную 
      switchTreck(treck) // Меняем трек
      // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
    } else if (audioTime == audioLength && treck >= 3) {
      treck = 0 // То присваиваем treck ноль
      switchTreck(treck) // Меняем трек
    }
  }, 10)
})

btnPause.addEventListener("click", () => {
  audio.pause() // Останавливает песню
  clearInterval(audioPlay) // Останавливает интервал
  btnPlay.className = "audio-btn audio-btn__play audio-btn__play"
  btnPause.className += "audio-btn audio-btn__pause audio-btn__pause"
})

btnPrev.addEventListener("click", () => {
  // Проверяем что переменная treck больше нуля
  if (treck > 0) {
    treck-- // Если верно, то уменьшаем переменную на один
    switchTreck(treck) // Меняем песню.
  } else { // Иначе
    treck = 3 // Присваиваем три
    switchTreck(treck) // Меняем песню
  }
})

btnNext.addEventListener("click", () => {
  // Проверяем что переменная treck больше трёх
  if (treck < 3) { // Если да, то
    treck++ // Увеличиваем её на один
    switchTreck(treck) // Меняем песню 
  } else { // Иначе
    treck = 0 // Присваиваем ей ноль
    switchTreck(treck) // Меняем песню
  }
})

btnVolPlus.addEventListener("click", () => {
  if (audio.volume < 1) {
    audio.volume += 0.1
  }
})

btnVolMinus.addEventListener("click", () => {
  if (audio.volume > 0.1) {
    audio.volume -= 0.1
  }
})
