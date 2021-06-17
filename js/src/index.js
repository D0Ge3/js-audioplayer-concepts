import page from 'page'

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
