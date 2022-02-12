import React, { useEffect, useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import myContext from '../context/myContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidasIngredientes() {
  const { maximumItems } = useContext(myContext);
  const [ingredients, setIngredients] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((resp) => resp.json())
      .then((data) => setIngredients(data.meals));
  }, []);

  return (
    <section className="explore-body">
      <Header title="Explorar Ingredientes" />
      <div className="recipe-card-main">
        {ingredients.map(({ strIngredient }, index) => (index < maximumItems)
        && (
          <a href="/comidas">
            <div
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              className="card-box"
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                { strIngredient }
              </p>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt="imagem do ingrediente"
                className="ingredient-img"
                height="120px"
                width="120px"
              />
            </div>
          </a>
        ))}
      </div>
      <Footer />
    </section>
  );
}
