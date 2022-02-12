import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      className="footer"
      data-testid="footer"
      style={ { position: 'fixed', bottom: 0 } }
    >
      <Link to="/bebidas">
        <button
          data-testid="drinks-bottom-btn"
          type="button"
          src={ drinkIcon }
        >
          <img src={ drinkIcon } alt="drink-icon" />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          data-testid="explore-bottom-btn"
          type="button"
          src={ exploreIcon }
        >
          <img src={ exploreIcon } alt="explorer-icon" />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          className="food-btn"
          data-testid="food-bottom-btn"
          type="button"
          src={ mealIcon }
        >
          <img src={ mealIcon } alt="food-icon" />
        </button>
      </Link>
    </footer>
  );
}
