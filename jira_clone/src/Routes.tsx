import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Board } from "board";
import { GridBoard } from "gridBoard";
import { NotFound } from "./NotFound";
import { List } from "list";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Board} path="/board" exact />
        <Route component={GridBoard} path="/gridboard" exact />
        <Route component={List} path="/list" exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
