import page from 'page'
import './styles/index.scss'

let showPlayerBtn
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
      this.audioEl.src = this.playlist[numTrack]
      this.audioEl.currentTime = 0
      this.audioEl.play()
    }
  play() {
    console.log(this);
    this.audioEl.src = this.playlist[this.curentTrackInd]
    this.audioEl.play()
    this.btnPause.className += "audio-btn audio-btn__pause audio-btn__pause--show"
    this.btnPlay.className = "audio-btn audio-btn__play audio-btn__play--hide"
    this.audioPlay = setInterval(() => {
      const audioTime = Math.round(this.audioEl.currentTime)
      const audioLength = Math.round(this.audioEl.duration)
      this.thumb.style.width = (audioTime * 100) / audioLength + '%'
      if (audioTime == audioLength && this.curentTrackInd < this.playlist.length - 1) {
        this.curentTrackInd++
        this.switchTrack(this.curentTrackInd)
      } else if (audioTime == audioLength && this.curentTrackInd >= this.playlist.length - 1) {
        this.curentTrackInd = 0
        this.switchTrack(this.curentTrackInd)
      }
    }, 10)
  }
  pause() {
      this.audioEl.pause()
      clearInterval(this.audioPlay)
      this.btnPlay.className = "audio-btn audio-btn__play audio-btn__play"
      this.btnPause.className += "audio-btn audio-btn__pause audio-btn__pause"
  }
  stop() {
    this.audioEl.pause()
    this.audioEl.currentTime = 0
    clearInterval(this.audioPlay)
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
    if (this.curentTrackInd < this.playlist.length - 1) {
      this.curentTrackInd++
      this.switchTrack(this.curentTrackInd) 
    } else {
      this.curentTrackInd = 0
      this.switchTrack(this.curentTrackInd)
    }
  }
  prevTrack() {
    if (this.curentTrackInd > 0) {
      this.curentTrackInd--
      this.switchTrack(this.curentTrackInd)
    } else {
      this.curentTrackInd = this.playlist.length - 1
      this.switchTrack(this.curentTrackInd)
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

  const rootDiv = document.querySelector('#root')
  const parser = new DOMParser()
  const loadContent = (uri) => {
    return fetch(uri)
      .then((response) => response.text())
      .then((data) => {
        const htmlDoc = parser.parseFromString(data, 'text/html')

        rootDiv.innerHTML = htmlDoc.querySelector('#root').innerHTML
      })
  }
  page('/', () => {
    loadContent('./index.html').then(() => {
      addListenersToHeader()
    })
  })
  page('/artist', () => {
    loadContent('./artist.html').then(() => {
      const tracksPlayBtns = document.querySelectorAll("#play-pause-track")
      const allTracks = Array.from(tracksPlayBtns).map((trackPlayBtn) => trackPlayBtn.parentElement.getAttribute("data-url"))
      addListenersToHeader()
      tracksPlayBtns.forEach((trackPlayBtn, ind) => 
        trackPlayBtn.addEventListener("click", () => {
          playerInstance.pause()
          if (playerInstance.playerEl.className !== "player") {
            playerInstance.init()
          }
          playerInstance.playlist = allTracks
          playerInstance.curentTrackInd = ind
          playerInstance.play()
        }))
    })
  
  })
  page('/about', () => {
    loadContent('./about.html').then(() => {
      addListenersToHeader()
    })
  })
  page()

  let defaultPlaylist = [
    'https://rss.art19.com/episodes/858792d0-856a-42a3-a8f6-f1590ae44616.mp3?rss_browser=BAhJIglKYXZhBjoGRVQ%3D--631732772f14ff418ee41471e1d52549d5878e4a',
    'https://rss.art19.com/episodes/b243d284-1b4f-4b15-99f1-e2a5d1fe8c86.mp3?rss_browser=BAhJIglKYXZhBjoGRVQ%3D--631732772f14ff418ee41471e1d52549d5878e4a',
    'https://rss.art19.com/episodes/2106301c-0a16-40a5-91e5-ab428cdbbe5a.mp3'
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

  const playerInstance = new Player({audioEl: audio, playerEl: player, btnPlay, btnPause, btnPrev, btnNext, btnVolMinus, btnVolPlus, thumb, playlist: defaultPlaylist })

  const addListenersToHeader = () => {
    showPlayerBtn = document.querySelector("#show-player")
    showPlayerBtn.addEventListener("click", () => {
      playerInstance.init()
    });
  }
}