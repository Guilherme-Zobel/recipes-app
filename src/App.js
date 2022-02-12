import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import DetalhesComida from './pages/DetalhesComida';
import DetalhesBebida from './pages/DetalhesBebida';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasIngredientes from './pages/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './pages/ExplorarBebidasIngredientes';
import ExplorarComidasOrigem from './pages/ExplorarComidasOrigem';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import MyProvider from './context/myProvider';
import ReceitaEmProgresso from './pages/ReceitaEmProgresso ';
import NotFound from './components/NotFound';

function App() {
  return (
    <MyProvider>
      <Switch>
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route path="/explorar/comidas/area" component={ ExplorarComidasOrigem } />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar/comidas" component={ ExplorarComidas } />
        <Route path="/explorar" component={ Explorar } />
        <Route path="/bebidas/:idDrink/in-progress" component={ ReceitaEmProgresso } />
        <Route path="/bebidas/:idDrink" component={ DetalhesBebida } />
        <Route path="/comidas/:idMeal/in-progress" component={ ReceitaEmProgresso } />
        <Route path="/comidas/:idMeal" component={ DetalhesComida } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route path="/comidas" component={ Comidas } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </MyProvider>
  );
}

export default App;
