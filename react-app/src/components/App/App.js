import { BrowserRouter as Router } from 'react-router-dom'
import logo from '../../logo.svg';
import { Routes } from '../../Routes'
import { Player } from '../Player/Player'

function App() {
  return (
    <Router>
      <Routes />
      <Player />
    </Router>
  );
}

export default App;
