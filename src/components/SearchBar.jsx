import React, { useState, useContext } from 'react';
import {
  fetchIngredient,
  fetchName,
  fetchFirstLetter,
} from '../services/api';
import myContext from '../context/myContext';

export default function SearchBar() {
  const { url, setFetchResult, filter, setFilter, setFilterType } = useContext(myContext);
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  const checkResults = (result) => {
    let type = 'drinks';
    if (url === 'themealdb') {
      type = 'meals';
    }
    return result[type] ? setFetchResult(result)
      : ((setSearch(''), global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')));
  };

  const handleClick = () => {
    setFilterType(true);
    switch (filter) {
    case 'ingrediente':
      return fetchIngredient(url, search)
        .then((result) => (checkResults(result)));
    case 'nome':
      return fetchName(url, search)
        .then((result) => (checkResults(result)));
    case 'primeira-letra':
      return search.length > 1
        ? (setSearch(''), global.alert('Sua busca deve conter somente 1 (um) caracter'))
        : fetchFirstLetter(url, search).then((result) => checkResults(result));
    default:
      break;
    }
  };

  return (
    <section className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
        value={ search }
      />
      <label htmlFor="ingrediente">
        <input
          name="radio"
          id="ingrediente"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingrediente"
          onClick={ ({ target }) => setFilter(target.value) }
        />
        Ingrediente
      </label>
      <label htmlFor="nome">
        <input
          name="radio"
          id="nome"
          data-testid="name-search-radio"
          type="radio"
          value="nome"
          onClick={ ({ target }) => setFilter(target.value) }
        />
        Nome
      </label>
      <label htmlFor="primeira-letra">
        <input
          name="radio"
          id="primeira-letra"
          data-testid="first-letter-search-radio"
          type="radio"
          value="primeira-letra"
          onClick={ ({ target }) => setFilter(target.value) }
        />
        Primeira letra
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </section>
  );
}
