import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarBebidas() {
  const history = useHistory();

  function handleIngredient() {
    history.push('/explorar/bebidas/ingredientes');
  }
  function handleSurprise() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((resp) => resp.json())
      .then((data) => history.push(`/bebidas/${data.drinks[0].idDrink}`));
  }

  return (
    <div className="explore-container">
      <Header title="Explorar Bebidas" />
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
