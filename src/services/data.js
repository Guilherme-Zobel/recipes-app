export default function verifyPath(path, idMeal, idDrink) {
  const regexFood = /\/comidas\/ */i;

  let url = 'thecocktaildb';
  let id = idDrink;
  let lsCategory = 'cocktails';
  let category = 'drinks';
  let type = 'Drink';
  if (path.match(regexFood)) {
    url = 'themealdb';
    id = idMeal;
    lsCategory = 'meals';
    category = 'meals';
    type = 'Meal';
  }

  return { url, id, lsCategory, category, type };
}

export function createList(el, arrayList, setIngredientes) {
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

export function handleFavorite(path, idk, idData) {
  const regexFood = /\/comidas\/ */i;

  let category = 'Drink';
  let typek = 'bebida';
  if (path.match(regexFood)) {
    category = 'Meal';
    typek = 'comida';
  }

  // setFavorite(favorite);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes.some((el) => el.id === idk)) {
    localStorage
      .setItem('favoriteRecipes', JSON.stringify(favoriteRecipes
        .filter((el) => el.id !== idk)));
  } else {
    const favData = {
      id: idk,
      type: typek,
      area: (idData[0].strArea ? idData[0].strArea : ''),
      category: idData[0].strCategory,
      alcoholicOrNot: (idData[0].strAlcoholic ? idData[0].strAlcoholic : ''),
      name: idData[0][`str${category}`],
      image: idData[0][`str${category}Thumb`],
    };
    favoriteRecipes.push(favData);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
}
