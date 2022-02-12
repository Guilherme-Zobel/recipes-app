import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidas() {
  const history = useHistory();

  function handleIngredient() {
    history.push('/explorar/comidas/ingredientes');
  }

  function handleArea() {
    history.push('/explorar/comidas/area');
  }

  function handleSurprise() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((resp) => resp.json())
      .then((data) => history.push(`/comidas/${data.meals[0].idMeal}`));
  }

  return (
    <div className="explore-container">
      <Header title="Explorar Comidas" />
      <section className="explore-btn-container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ handleIngredient }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ handleArea }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleSurprise }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </div>
  );
}
