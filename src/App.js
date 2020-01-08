import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './paginas/usuario/login/Login.react'
import Cadastro from './paginas/usuario/login/Cadastro.react'
import SalaView from './paginas/sala/SalaViews.react'
import CriarAtividade from './paginas/atividade/CriarAtividade.react'
import CodigoSala from './paginas/aluno/CodigoSala.react';
import AlunoSala from './paginas/aluno/AlunoSala.react';





function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/cadastro' component={Cadastro} />
        <Route exact path='/Home' component={SalaView} />
        <Route exact path ='/criarAtividade' component={CriarAtividade}/>
        <Route exact path ='/entrarSala' component={CodigoSala}/>
        <Route exact path ='/sala' component={AlunoSala}/>
        {/* <div>
          <Login/>
        </div> */}
      </Switch>
    </Router>
  );
}

export default App;
