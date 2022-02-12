import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar() {
  const history = useHistory();

  function handleFood() {
    history.push('/explorar/comidas');
  }

  function handleDrink() {
    history.push('/explorar/bebidas');
  }
  return (
    <div className="explore-container">
      <Header title="Explorar" />
      <section className="explore-btn-container">
        <button
          type="button"
          data-testid="explore-food"
          onClick={ handleFood }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ handleDrink }
        >
          Explorar Bebidas
        </button>
      </section>
      <Footer />
    </div>
  );
}
