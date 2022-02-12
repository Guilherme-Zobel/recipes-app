import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
  const history = useHistory();

  return (
    <section className="not-found-body">
      <h3>Page Not Found</h3>
      <button
        type="button"
        onClick={ () => history.push('/explorar') }
      >
        Voltar para Explorar
      </button>
    </section>
  );
}
