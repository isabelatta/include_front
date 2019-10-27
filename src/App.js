import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './paginas/usuario/login/Login.react'
import Cadastro from './paginas/usuario/login/Cadastro.react'




function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/cadastro' component={Cadastro} />
        {/* <div>
          <Login/>
        </div> */}
      </Switch>
    </Router>
  );
}

export default App;
