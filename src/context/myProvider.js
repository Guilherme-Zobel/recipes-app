import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from './myContext';

function Provider({ children }) {
  const [url, setUrl] = useState('themealdb');
  const [category, setCategory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(false);
  const [filterType, setFilterType] = useState(false);
  const [fetchResult, setFetchResult] = useState('');
  const [filter, setFilter] = useState('');
  const maxItems = 12;
  const [maximumItems, setMaximumItems] = useState(maxItems);
  const [resultSize, setResultSize] = useState(maxItems);

  const myContext = {
    url,
    setUrl,
    fetchResult,
    setFetchResult,
    category,
    setCategory,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    filterType,
    setFilterType,
    maximumItems,
    setMaximumItems,
    resultSize,
    setResultSize,
  };

  return (
    <context.Provider value={ myContext }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
