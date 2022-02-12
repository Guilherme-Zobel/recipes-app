import React, { useState } from 'react';

export default function IngredientList(itemData) {
  const [ingredientes, setIngredientes] = useState([]);
  const [item, setItem] = useState([]);
  const arrayList = [];

  function createList(el) {
    const number = 20;
    for (let i = 0; i < number; i += 1) {
      if (el[`strMeasure${i + 1}`] && el[`strIngredient${i + 1}`]) {
        arrayList.push({
          ingredient: `${el[`strIngredient${i + 1}`]} - ${el[`strMeasure${i + 1}`]}`,
          isSelected: false,
        });
      }
    }
    setIngredientes(arrayList);
  }

  function handleOnChange({ target }) {
    const newIgrediente = [...ingredientes];
    if (target.checked) {
      newIgrediente[target.id].isSelected = true;
    } else {
      newIgrediente[target.id].isSelected = false;
    }
    setIngredientes(newIgrediente);
  }

  useEffect(() => {
    setItem(itemData[0]);
    if (item) createList(item);
  }, [itemData, item]);

  const comText = { textDecoration: 'line-through double darkorange', opacity: '0.5' };
  const semText = { textDecoration: 'none' };

  return (
    <ul className="ingredient-list">

      {!param ? <p>Carregando...</p>
        : param.map(({ ingredient, isSelected }, i) => (
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
  );
}
