import logo from "./logo.svg";
import "./App.css";

import Routes from "./routes/routes";
import { Button } from "react-bootstrap";
import useWindowDimensions from "./components/useWindowDimensions";

/**
 * main app, java script entry point
 * @returns 
 */
function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="App ">
      <Routes></Routes>
    </div>
  );
}

export default App;
