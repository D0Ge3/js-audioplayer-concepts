const link = "https://content.production.cdn.art19.com/validation=1623950355,47064fd8-8490-578a-9485-bcc303c9bf49,_BNaWHWUUrJRCGeXC7ivvlF56cU/episodes/2106301c-0a16-40a5-91e5-ab428cdbbe5a/f5260f980e1aac63bfe1191148c42de2a3d5defb0bbaa50e66b3478a6e16a5ac9b1212c1a23c735a3a06ffb970e9aef1cfcd5f4888317c891a50673ef7f10d1e/TheTimFerrissShow_Naval%20and%20Vitalik_.mp3"

export const Player = () => {
  return (
    <div>
      	
      {/* <audio id="audio" src={link} controls></audio> */}
      <audio controls>
        {/* <source src="audio/music.ogg" type="audio/ogg; codecs=vorbis"> */}
        <source src={link} type="audio/mpeg" />
        Тег audio не поддерживается вашим браузером. 
        <a href={link}>Скачайте музыку</a>.
      </audio>
    </div>
  )
}