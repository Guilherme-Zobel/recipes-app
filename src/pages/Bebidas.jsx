import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import myContext from '../context/myContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import CategoryFilter from '../components/Categoryfilter';

export default function Bebidas() {
  const {
    setUrl,
    fetchResult,
    setCategory,
    categoryFilter,
  } = useContext(myContext);
  const history = useHistory();
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    fetch(URL).then((res) => res.json()).then((resp) => setCategory(resp));
  }, [setCategory]);

  useEffect(() => {
    setUrl('thecocktaildb');
  }, []);

  const verifyResultLenght = () => {
    if (fetchResult.drinks) {
      const resultSize = Object.keys(fetchResult.drinks);
      const { idDrink } = fetchResult.drinks[0];
      return (resultSize.length === 1 && history.push(`/bebidas/${idDrink}`));
    }
  };

  useEffect(() => {
    if (!categoryFilter) {
      verifyResultLenght();
    }
  });

  return (
    (
      <div>
        <Header title="Bebidas" />
        <CategoryFilter />
        <RecipeCard />
        <Footer />
      </div>)
  );
}
