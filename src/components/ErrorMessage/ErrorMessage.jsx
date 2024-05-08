import React from 'react';
import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <>
      <p className={css.message}>Something went wrong</p>
    </>
  );
};

export default ErrorMessage;