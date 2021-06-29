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



class Player {
  constructor({ audioEl, playerEl, btnPlay, btnPause, btnPrev, btnNext, btnVolMinus, btnVolPlus, thumb, playlist }) {
    this.audioEl = audioEl
    this.playerEl = playerEl
    this.btnPlay = btnPlay
    this.btnPause = btnPause
    this.btnPrev = btnPrev
    this.btnNext = btnNext
    this.btnVolMinus = btnVolMinus
    this.btnVolPlus = btnVolPlus
    this.thumb = thumb
    this.playlist = playlist
  }
  curentTrackInd = 0
  switchTrack(numTrack) {
      // Меняем значение атрибута src
      this.audioEl.src = this.playlist[numTrack]
      // Назначаем время песни ноль
      this.audioEl.currentTime = 0
      // Включаем песню
      this.audioEl.play()
    }
  play() {
    console.log(this);
    this.audioEl.src = this.playlist[this.curentTrackInd]
    this.audioEl.play()
    this.btnPause.className += "audio-btn audio-btn__pause audio-btn__pause--show"
    this.btnPlay.className = "audio-btn audio-btn__play audio-btn__play--hide"
    this.audioPlay = setInterval(() => {
      // Получаем значение на какой секунде песня
      const audioTime = Math.round(this.audioEl.currentTime)
      // Получаем всё время песни
      const audioLength = Math.round(this.audioEl.duration)
      // Назначаем ширину элементу time
      this.thumb.style.width = (audioTime * 100) / audioLength + '%'
      // Сравниваем, на какой секунде сейчас трек и всего сколько времени длится
      // И проверяем что переменная treck меньше четырёх
      if (audioTime == audioLength && treck < 3) {
        treck++ // То Увеличиваем переменную 
        switchTrack(treck) // Меняем трек
        // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
      } else if (audioTime == audioLength && treck >= 3) {
        treck = 0 // То присваиваем treck ноль
        switchTrack(treck) // Меняем трек
      }
    }, 10)
  }
  pause() {
      this.audioEl.pause() // Останавливает песню
      clearInterval(this.audioPlay) // Останавливает интервал
      this.btnPlay.className = "audio-btn audio-btn__play audio-btn__play"
      this.btnPause.className += "audio-btn audio-btn__pause audio-btn__pause"
  }
  changeVol(mode) {
    if (mode === "minus") {
        if (this.audioEl.volume > 0.1) {
          this.audioEl.volume -= 0.1
        }
    } else {
        if (this.audioEl.volume < 1) {
           this.audioEl.volume += 0.1
         }
    }
  }
  nextTrack() {
      // Проверяем что переменная treck больше трёх
    if (this.curentTrackInd < this.playlist.length) { // Если да, то
      this.curentTrackInd++ // Увеличиваем её на один
      this.switchTrack(this.curentTrackInd) // Меняем песню 
    } else { // Иначе
      this.curentTrackInd = 0 // Присваиваем ей ноль
      this.switchTrack(this.curentTrackInd) // Меняем песню
    }
  }
  prevTrack() {
    if (this.curentTrackInd > 0) {
      this.curentTrackInd-- // Если верно, то уменьшаем переменную на один
      this.switchTrack(this.curentTrackInd) // Меняем песню.
    } else { // Иначе
      this.curentTrackInd = 3 // Присваиваем три
      this.switchTrack(this.curentTrackInd) // Меняем песню
    }
  }
  init() {
    const { btnPlay, btnPause, btnVolMinus, btnVolPlus, playerEl, btnPrev, btnNext } = this;
    btnPlay.addEventListener("click", () => this.play())
    btnPause.addEventListener("click", () => this.pause())

    btnVolMinus.addEventListener("click", () => this.changeVol("minus"))
    btnVolPlus.addEventListener("click", () => this.changeVol("plus"))

    btnPrev.addEventListener("click", () => this.prevTrack())
    btnNext.addEventListener("click", () => this.nextTrack())

    playerEl.className = "player"
  }
}

window.onload = () => {

  let playlist = [
    'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
    'https://rss.art19.com/episodes/b243d284-1b4f-4b15-99f1-e2a5d1fe8c86.mp3?rss_browser=BAhJIglKYXZhBjoGRVQ%3D--631732772f14ff418ee41471e1d52549d5878e4a',
    'https://rss.art19.com/episodes/2106301c-0a16-40a5-91e5-ab428cdbbe5a.mp3',
    'https://rss.art19.com/episodes/e6527fc1-cf49-438a-af03-032d48d09251.mp3'
  ]

  const audio = document.querySelector("#audio")
  const thumb = document.querySelector("#player-thumb")
  const btnPlay = document.querySelector("#player-play")
  const btnPause = document.querySelector("#player-pause")
  const btnPrev = document.querySelector("#player-prev")
  const btnNext = document.querySelector("#player-next")
  const btnVolMinus = document.querySelector("#volume__minus")
  const btnVolPlus = document.querySelector("#volume__plus")


  const player = document.querySelector("#player")

  const showPlayerBtn = document.querySelector("#show-player")
  const playerInstance = new Player({audioEl: audio, playerEl: player, btnPlay, btnPause, btnPrev, btnNext, btnVolMinus, btnVolPlus, thumb, playlist })
  showPlayerBtn.addEventListener("click", () => playerInstance.init());
  //console.log(playerInstance);
}

// let audioPlay

// let playlist = [
//   'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
//   'https://rss.art19.com/episodes/b243d284-1b4f-4b15-99f1-e2a5d1fe8c86.mp3?rss_browser=BAhJIglKYXZhBjoGRVQ%3D--631732772f14ff418ee41471e1d52549d5878e4a',
//   'https://rss.art19.com/episodes/2106301c-0a16-40a5-91e5-ab428cdbbe5a.mp3',
//   'https://rss.art19.com/episodes/e6527fc1-cf49-438a-af03-032d48d09251.mp3'
// ]

// let treck // Переменная с индексом трека

// const playAudio = () => {
//   audio.play() // Запуск песни
//   btnPause.className += "audio-btn audio-btn__pause audio-btn__pause--show"
//   btnPlay.className = "audio-btn audio-btn__play audio-btn__play--hide"
//   // Запуск интервала 
//   audioPlay = setInterval(() => {
//     // Получаем значение на какой секунде песня
//     const audioTime = Math.round(audio.currentTime)
//     // Получаем всё время песни
//     const audioLength = Math.round(audio.duration)
//     // Назначаем ширину элементу time
//     thumb.style.width = (audioTime * 100) / audioLength + '%'
//     // Сравниваем, на какой секунде сейчас трек и всего сколько времени длится
//     // И проверяем что переменная treck меньше четырёх
//     if (audioTime == audioLength && treck < 3) {
//       treck++ // То Увеличиваем переменную 
//       switchTreck(treck) // Меняем трек
//       // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
//     } else if (audioTime == audioLength && treck >= 3) {
//       treck = 0 // То присваиваем treck ноль
//       switchTreck(treck) // Меняем трек
//     }
//   }, 10)
// }

// // Событие перед загрузкой страницы
// window.onload = function() {
//   treck = 0 // Присваиваем переменной ноль
//   const showPlayerBtn = document.querySelector("#show-player")
//   showPlayerBtn.addEventListener("click", () => {
//     player.className = "player"
//   })

//   const tracksPlayBtns = document.querySelectorAll("#play-pause-track")
//   const allTracks = Array.from(tracksPlayBtns).map((trackPlayBtn) => trackPlayBtn.parentElement.getAttribute("data-url"))

//   tracksPlayBtns.forEach((trackPlayBtn) => 
//     trackPlayBtn.addEventListener("click", () => {
//       const currTrackInd = allTracks.indexOf(trackPlayBtn.parentElement.getAttribute("data-url"))
//       playlist = allTracks.filter((val, ind) => ind >= currTrackInd)
//       player.className = "player"
//       playAudio()
//     })
//   )
// }

// function switchTreck (numTreck) {
//   // Меняем значение атрибута src
//   audio.src = playlist[numTreck]
//   // Назначаем время песни ноль
//   audio.currentTime = 0
//   // Включаем песню
//   audio.play()
// }



// btnPlay.addEventListener("click", () => playAudio)

// btnPause.addEventListener("click", () => {
//   audio.pause() // Останавливает песню
//   clearInterval(audioPlay) // Останавливает интервал
//   btnPlay.className = "audio-btn audio-btn__play audio-btn__play"
//   btnPause.className += "audio-btn audio-btn__pause audio-btn__pause"
// })

// btnPrev.addEventListener("click", () => {
//   // Проверяем что переменная treck больше нуля
//   if (treck > 0) {
//     treck-- // Если верно, то уменьшаем переменную на один
//     switchTreck(treck) // Меняем песню.
//   } else { // Иначе
//     treck = 3 // Присваиваем три
//     switchTreck(treck) // Меняем песню
//   }
// })

// btnNext.addEventListener("click", () => {
//   // Проверяем что переменная treck больше трёх
//   if (treck < 3) { // Если да, то
//     treck++ // Увеличиваем её на один
//     switchTreck(treck) // Меняем песню 
//   } else { // Иначе
//     treck = 0 // Присваиваем ей ноль
//     switchTreck(treck) // Меняем песню
//   }
// })

// btnVolPlus.addEventListener("click", () => {
//   if (audio.volume < 1) {
//     audio.volume += 0.1
//   }
// })

// btnVolMinus.addEventListener("click", () => {
//   if (audio.volume > 0.1) {
//     audio.volume -= 0.1
//   }
// })
