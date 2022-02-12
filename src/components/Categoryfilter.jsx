import React, { useContext, useState } from 'react';
import myContext from '../context/myContext';
import { fetchCategory } from '../services/api';

export default function CategoryFilter() {
  const {
    url,
    category,
    setFetchResult,
    setCategoryFilter,
    setFilterType,
  } = useContext(myContext);
  const [clicou, setClicou] = useState(false);
  const NUMBER_MAX = 5;
  const ZERO = 0;
  let active = false;

  let type = 'drinks';
  if (url === 'themealdb') {
    type = 'meals';
  }

  const categoryFilter = category[type];
  const applyFilter = (result) => (result[type] ? setFetchResult(result)
    : global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'));

  const handleClick = (strCategory, { target }) => {
    setFilterType(true);
    setCategoryFilter(true);
    setClicou(strCategory);
    active = false;
    if (clicou !== strCategory) {
      target.focus();
      fetchCategory(url, strCategory)
        .then((result) => {
          applyFilter(result);
        });
    } else {
      setFilterType(false);
      setClicou(false);
      target.blur();
    }
  };

  const handleAllClick = ({ target }) => {
    setFilterType(false);
    active = !active;
    if (active) {
      target.focus();
    } else {
      target.blur();
    }
  };

  return (
    <section className="category-bar">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ (event) => handleAllClick(event) }
      >
        All
      </button>
      {
        !categoryFilter ? <h3>Carregando...</h3>
          : categoryFilter.slice(ZERO, NUMBER_MAX).map(({ strCategory }, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ (event) => handleClick(strCategory, event) }
            >
              {strCategory}
            </button>
          ))
      }
    </section>
  );
}
