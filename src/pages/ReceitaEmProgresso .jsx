import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { fetchId } from '../services/api';
import verifyPath, { createList, handleFavorite } from '../services/data';
import shareIcon from '../images/shareIcon.svg';
import emptyFavoriteIcon from '../images/whiteHeartIcon.svg';
import filledFavoriteIcon from '../images/blackHeartIcon.svg';

export default function ReceitaEmProgresso() {
  const { pathname } = useLocation();
  const { idMeal, idDrink } = useParams();
  const [ingredientes, setIngredientes] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [item, setItem] = useState({});
  const history = useHistory();
  const comText = { textDecoration: 'line-through double darkorange', opacity: '0.5' };
  const semText = { textDecoration: 'none' };
  const arrayList = [];

  const { url, id, category, type } = verifyPath(pathname, idMeal, idDrink);

  function handleOnChange({ target }) {
    const newIgrediente = [...ingredientes];
    newIgrediente[target.id].isSelected = target.checked;
    setIngredientes(newIgrediente);
  }

  async function shareButton(link) {
    await navigator.clipboard.writeText(`http://localhost:3000${link.replace('/in-progress', '')}`);
    setShare(!share);
  }

  function handleClickFav() {
    handleFavorite(pathname, id, itemData);
    setFavorite(!favorite);
  }
  function checkFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(favoriteRecipes.some((el) => el.id === id));
  }

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    console.log(url, id);
    fetchId(url, id).then((res) => {
      setItemData(res[category]);
    });
    if (!favoriteRecipes) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([]));
    }
    checkFavorite();
  }, []);

  useEffect(() => {
    setItem(itemData[0]);
    if (item) createList(item, arrayList, setIngredientes);
  }, [itemData, item]);
  // useEffect(() => updateLocalStorage(ingredientes), [ingredientes]);

  console.log(pathname);

  return (
    !item ? <p>Carregando...</p>
      : (
        <section className="progress-body">
          <img data-testid="recipe-photo" src={ item[`str${type}Thumb`] } alt={ type } />
          <h3 data-testid="recipe-title">{item[`str${type}`]}</h3>
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
              onClick={ handleClickFav }
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
          <h4 data-testid="recipe-category">{item.strCategory}</h4>
          <div className="ingredient-box">
            <h5>Ingredientes</h5>
            <ul className="ingredient-list">
              {ingredientes.map(({ ingredient, isSelected }, i) => (
                <div key={ i }>
                  <label htmlFor={ i }>
                    <li
                      data-testid={ `${i}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ i }
                        onClick={ (e) => handleOnChange(e) }
                      />
                      {
                        isSelected
                          ? (
                            <span style={ comText }>
                              {ingredient}
                            </span>)
                          : (
                            <span style={ semText }>
                              {ingredient}
                            </span>)
                      }
                    </li>
                  </label>
                </div>
              ))}
            </ul>
          </div>
          <div className="instructions" data-testid="instructions">
            <h5>Intruções</h5>
            <p>{item.strInstructions}</p>
          </div>

          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="finish-button"
            disabled={
              ingredientes.find((e) => e.isSelected === false)
            }
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar receita
          </button>

        </section>
      )
  );
}
