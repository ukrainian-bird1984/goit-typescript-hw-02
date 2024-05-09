import { useEffect, useRef, MouseEvent } from 'react';
import types from '../types';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onLoadMoreBtn: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMoreBtn, loadMoreScroll }) => {
 

  return (
    <div className={css.container}>
      <button onClick={handleClick} type="button" className={css.btn} ref={onBtnRef}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
