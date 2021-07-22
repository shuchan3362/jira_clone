import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Board } from "board";
import { GridBoard } from "gridBoard";
import { NotFound } from "./NotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Board} path="/" exact />
        <Route component={GridBoard} path="/gridboard" exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
