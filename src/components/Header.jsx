import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const history = useHistory();
  const { pathname } = history.location;
  /* const title = pathname.substring(1); */
  const handleClick = () => {
    history.push('/perfil');
  };
  const [search, setSearch] = useState(false);
  const arrayPath = ['/comidas', '/bebidas', '/explorar/comidas/area'];
  if (
    pathname === arrayPath[0]
    || pathname === arrayPath[1]
    || pathname === arrayPath[2]
  ) {
    return (
      <header className="header">
        <button
          data-testid="profile-top-btn"
          type="button"
          onClick={ handleClick }
          src={ profileIcon }
        >
          <img src={ profileIcon } alt="" />
        </button>
        <h3
          data-testid="page-title"
        >
          { title }
        </h3>
        <button
          data-testid="search-top-btn"
          className="search-btn"
          type="button"
          src={ searchIcon }
          onClick={ () => setSearch(!search) }
        >
          <img src={ searchIcon } alt="" />
        </button>
        {search && <SearchBar />}
      </header>
    );
  }
  return (
    <header className="header">
      <button
        data-testid="profile-top-btn"
        type="button"
        onClick={ handleClick }
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="" />
      </button>
      <h3 data-testid="page-title">{ title }</h3>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
