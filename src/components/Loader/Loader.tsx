import React from 'react';
import { Bars } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={css.load}>
      <Bars
        height={60}
        width={80}
        color="#131ddc"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
