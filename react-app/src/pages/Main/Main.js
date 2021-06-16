import { Link } from "react-router-dom";

export const Main = () => {

  return (
    <div>
      <h2>main</h2>
      <Link to="/about">About</Link>
      <Link to="/artist">Artist</Link>
    </div>
  )
}