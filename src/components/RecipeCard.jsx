import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';

export default function RecipeCard() {
  const [cardContent, setCardContent] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const {
    fetchResult,
    maximumItems,
    setResultSize,
    filterType,
  } = useContext(myContext);
  const location = useLocation();

  const regexDrink = /\/bebidas\/ */i;
  const regexFood = /\/comidas\/ */i;

  let pageContent;
  let url = 'thecocktaildb';
  let category = 'drinks';
  let type = 'Drink';
  let link = '/bebidas/';
  if (location.pathname === '/comidas' || location.pathname.match(regexDrink)) {
    url = 'themealdb';
    category = 'meals';
    type = 'Meal';
    link = '/comidas/';
  }

  const URL = `https://www.${url}.com/api/json/v1/1/search.php?s=`;

  useEffect(() => {
    if (fetchResult) {
      const resultValues = Object.values(fetchResult);
      setCardContent(resultValues);
    }
  }, [fetchResult]);

  useEffect(() => {
    fetch(URL).then((res) => res.json()).then((resp) => {
      setInitialContent(resp);
      setResultSize(resp[category].length);
    });
  }, []);

  if (filterType) [pageContent] = cardContent;
  else pageContent = initialContent[category];

  return (
    <main
      className={ location.pathname.match(regexDrink)
        || location.pathname.match(regexFood)
        ? 'recipe-card-carousel' : 'recipe-card-main' }
    >
      {pageContent
      && (pageContent.map((item, index) => (
        (index < maximumItems)
        && (
          <a
            href={ `${link}${item[`id${type}`]}` }
            style={ { textDecoration: 'none' } }
            className="item"
            key={ item[`id${type}`] }
            data-testid={ `${index}-recomendation-card` }
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="card-box"
            >
              <p
                data-testid={ location.pathname.match(regexDrink)
                  || location.pathname.match(regexFood)
                  ? `${index}-recomendation-title` : `${index}-card-name` }
              >
                {item[`str${type}`]}
              </p>
              <img
                data-testid={ `${index}-card-img` }
                src={ item[`str${type}Thumb`] }
                alt="imagem da receita pronta"
                height="200px"
                width="200px"
              />
            </div>
          </a>
        )
      )))}
    </main>
  );
}
