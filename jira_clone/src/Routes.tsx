import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Board } from "views/board";
import { GridBoard } from "views/gridBoard";
import { NotFound } from "./views/NotFound";
import { List } from "views/list";

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
