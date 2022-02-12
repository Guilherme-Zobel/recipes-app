import React, { useContext, useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import myContext from '../context/myContext';

export default function ExplorarComidasOrigem() {
  const { maximumItems } = useContext(myContext);
  const [areaOptions, setAreaOptions] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const AREA_LIST_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const ALL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  function getAreaOptions() {
    fetch(AREA_LIST_URL)
      .then((res) => res.json())
      .then((resp) => setAreaOptions(resp.meals));
  }

  function getAllRecipes() {
    fetch(ALL_URL)
      .then((res) => res.json())
      .then((resp) => setAllRecipes(resp.meals));
  }

  function filterByArea(area) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((res) => res.json())
      .then((resp) => setAllRecipes(resp.meals));
  }

  useEffect(() => {
    getAreaOptions();
    getAllRecipes();
  }, []);

  async function handleChange({ target }) {
    if (target.value === 'All') {
      console.log(allRecipes);
      return getAllRecipes();
    }
    filterByArea(target.value);
    console.log(allRecipes);
  }

  return (
    <div>
      <Header title="Explorar Origem" />
      <section className="explore-area-body">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
        >
          <option value="All" data-testid="All-option">All</option>
          {areaOptions.map(({ strArea }) => (
            <option
              value={ strArea }
              key={ strArea }
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>
          ))}
        </select>
        <div className="recipe-card-main">
          {allRecipes.map((item, index) => (
            (index < maximumItems) && (
              <a
                href={ `/comidas/${item.idMeal}` }
                style={ { textDecoration: 'none' } }
                className="item"
                key={ item.idMeal }
                data-testid={ `${index}-recomendation-card` }
              >
                <div
                  data-testid={ `${index}-recipe-card` }
                  className="card-box"
                >
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {item.strMeal}
                  </p>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ item.strMealThumb }
                    alt="imagem ilustrativa da receita"
                    height="200px"
                    width="200px"
                  />
                </div>
              </a>
            )
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
