import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Perfil() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  function getEmail() {
    let userEmail = JSON.parse(localStorage.getItem('user'));
    if (!userEmail) userEmail = 'tryber@teste.com';
    setEmail(userEmail.email);
  }

  useEffect(() => {
    getEmail();
  }, []);

  function handleFavorite() {
    history.push('/receitas-favoritas');
  }

  function handleReceitasFeitas() {
    history.push('/receitas-feitas');
  }

  function handleSair() {
    history.push('/');
    localStorage.clear();
  }

  return (
    <div className="profile-container">
      <Header title="Perfil" />
      <p className="profile-username" data-testid="profile-email">{email}</p>
      <div className="profile-btn-container">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleFavorite }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleReceitasFeitas }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleSair }
          className="logout-btn"
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}
