import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './paginas/usuario/login/Login.react'
import Cadastro from './paginas/usuario/login/Cadastro.react'
import SalaView from './paginas/sala/SalaViews.react'
import CriarAtividade from './paginas/atividade/CriarAtividade.react'
import CodigoSala from './paginas/aluno/CodigoSala.react';
import AlunoSala from './paginas/aluno/AlunoSala.react';
import Dashboard from './paginas/dashboard/Dashboard.react'


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('id') ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

const LoginRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !localStorage.getItem('id') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        )
      }
    />
  );
};


function App() {

  return (
    <Router>
      <Switch>
        <LoginRoute exact path='/' component={Login} />
        <Route exact path='/cadastro' component={Cadastro} />
        <Route exact path='/home' component={SalaView} />
        <PrivateRoute exact path ='/criarAtividade' component={CriarAtividade}/>
        <PrivateRoute exact path ='/editarAtividade' component={CriarAtividade}/>
        <PrivateRoute exact path ='/entrarSala' component={CodigoSala}/>
        <PrivateRoute exact path ='/sala' component={AlunoSala}/>
        <PrivateRoute exact path ='/dashboard' component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
