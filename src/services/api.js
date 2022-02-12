export const INGREDIENT_URL = (url, ingredient) => `https://www.${url}.com/api/json/v1/1/filter.php?i=${ingredient}`;
export const NAME_URL = (url, name) => `https://www.${url}.com/api/json/v1/1/search.php?s=${name}`;
export const FIRST_LETTER_URL = (url, firstLetter) => `https://www.${url}.com/api/json/v1/1/search.php?f=${firstLetter}`;
export const CATEGORY_URL = (url, category) => `https://www.${url}.com/api/json/v1/1/filter.php?c=${category}`;
export const ID_URL = (url, id) => `https://www.${url}.com/api/json/v1/1/lookup.php?i=${id}`;

export const fetchId = async (url, id) => {
  const promise = await fetch(ID_URL(url, id));
  const response = await promise.json();
  return response;
};

export const fetchCategory = async (url, category) => {
  const promise = await fetch(CATEGORY_URL(url, category));
  const response = await promise.json();
  return response;
};

export const fetchIngredient = async (url, ingredient) => {
  const promise = await fetch(INGREDIENT_URL(url, ingredient));
  const response = await promise.json();
  return response;
};

export const fetchName = async (url, name) => {
  const promise = await fetch(NAME_URL(url, name));
  const response = await promise.json();
  return response;
};

export const fetchFirstLetter = async (url, firstLetter) => {
  const promise = await fetch(FIRST_LETTER_URL(url, firstLetter));
  const response = await promise.json();
  return response;
};
