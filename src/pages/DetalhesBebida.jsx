import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchId, fetchName } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import myContext from '../context/myContext';
import shareIcon from '../images/shareIcon.svg';
import emptyFavoriteIcon from '../images/whiteHeartIcon.svg';
import filledFavoriteIcon from '../images/blackHeartIcon.svg';

export default function DetalhesBebida() {
  const { idDrink } = useParams();
  const [idData, setIdData] = useState([]);
  const { setMaximumItems, setFetchResult } = useContext(myContext);
  const carousel = useRef(null);
  const six = 6;
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);

  function checkRecipe() {
    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(cocktails).some((el) => el === idDrink)) {
      return 'Continuar Receita';
    }
    return 'Iniciar Receita';
  }

  function checkFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes.some((el) => el.id === idDrink)) {
      setFavorite(!favorite);
    }
  }

  useEffect(() => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    fetchId('thecocktaildb', idDrink)
      .then((response) => setIdData(response.drinks));
    fetchName('themealdb', '').then((r) => setFetchResult(r));
    setMaximumItems(six);
    if (!inProgressRecipes) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
    }
    if (!favoriteRecipes) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([]));
    }
    checkFavorite();
  }, []);

  const arrayList = [];

  function createList(el) {
    const number = 20;
    for (let i = 0; i < number; i += 1) {
      if (el[`strMeasure${i + 1}`] && el[`strIngredient${i + 1}`]) {
        arrayList.push(`${el[`strIngredient${i + 1}`]} - ${el[`strMeasure${i + 1}`]}`);
      }
    }
    return arrayList;
  }

  function handleStartClick() {
    const myStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails } = myStorage;
    if (!Object.keys(cocktails).some((el) => el === idDrink)) {
      cocktails[idDrink] = [];
      localStorage
        .setItem(
          'inProgressRecipes',
          JSON.stringify(myStorage),
        );
    }
    history.push(`/bebidas/${idDrink}/in-progress`);
  }

  async function shareButton(link) {
    await navigator.clipboard.writeText(`http://localhost:3000${link}`);
    setShare(!share);
  }

  function handleFavorite() {
    setFavorite(!favorite);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes.some((el) => el.id === idDrink)) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(favoriteRecipes
          .filter((el) => el.id !== idDrink)));
    } else {
      const favData = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: idData[0].strCategory,
        alcoholicOrNot: idData[0].strAlcoholic,
        name: idData[0].strDrink,
        image: idData[0].strDrinkThumb,
      };
      favoriteRecipes.push(favData);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  }

  return (
    <section>
      {
        idData.map((el, index) => (
          <div key={ index } className="detail-body">
            <h3 data-testid="recipe-title">
              {el.strDrink}
            </h3>
            <img
              data-testid="recipe-photo"
              src={ el.strDrinkThumb }
              alt={ `Imagem da deliciosa ${el.strDrink}` }
              width="400px"
              height="400px"
            />
            <div className="detail-buttons">
              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => shareButton(pathname) }
              >
                <img src={ shareIcon } alt="share-icon" />
              </button>
              <button
                data-testid="favorite-btn"
                type="button"
                onClick={ handleFavorite }
                src={ !favorite ? emptyFavoriteIcon : filledFavoriteIcon }
              >
                {
                  !favorite
                    ? <img src={ emptyFavoriteIcon } alt="share-icon" />
                    : <img src={ filledFavoriteIcon } alt="share-icon" />
                }
              </button>
            </div>
            {share && 'Link copiado!' }
            <h4 data-testid="recipe-category">
              {el.strCategory}
              {' - '}
              {el.strAlcoholic}
            </h4>
            <div className="ingredient-box">
              <h5>Ingredientes</h5>
              <ul className="ingredient-list">
                {
                  createList(el).map((ingredient, i) => (
                    <li
                      key={ i }
                      data-testid={ `${i}-ingredient-name-and-measure` }
                    >
                      {ingredient}
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="instructions" data-testid="instructions">
              <h5>Instruções:</h5>
              <p>{el.strInstructions}</p>
            </div>
            <div
              className="carousel-wrapper"
              ref={ carousel }
            >
              <h5>Receitas Recomendadas</h5>
              <RecipeCard />
            </div>
            <button
              className="start-recipe"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleStartClick }
            >
              { checkRecipe() }
            </button>
          </div>))
      }
    </section>
  );
}
