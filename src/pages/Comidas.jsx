import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/Categoryfilter';
import myContext from '../context/myContext';

export default function Comidas() {
  const {
    setUrl,
    fetchResult,
    setCategory,
    categoryFilter,
  } = useContext(myContext);
  const history = useHistory();
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    fetch(URL).then((res) => res.json()).then((resp) => setCategory(resp));
  }, [setCategory]);

  useEffect(() => {
    setUrl('themealdb');
  }, []);

  const verifyResultLenght = () => {
    if (fetchResult.meals) {
      const resultSize = Object.keys(fetchResult.meals);
      const { idMeal } = fetchResult.meals[0];
      return (resultSize.length === 1 && history.push(`/comidas/${idMeal}`));
    }
  };

  useEffect(() => {
    if (!categoryFilter) {
      verifyResultLenght();
    }
  });

  return (
    <div>
      <Header title="Comidas" />
      <CategoryFilter />
      <RecipeCard />
      <Footer />
    </div>
  );
}
