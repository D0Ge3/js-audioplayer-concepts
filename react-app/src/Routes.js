import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { Main } from './pages/Main/Main'
import { Artist } from './pages/Artist/Artist'
import { About } from './pages/About/About'

export const Routes = () => {
  return (
      <Switch>
        <Route path="/artist">
          <Artist />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/a">
         <Main />
        </Route>
      </Switch>
  )
}