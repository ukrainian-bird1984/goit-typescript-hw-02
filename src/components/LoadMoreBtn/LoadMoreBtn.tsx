import React, { useEffect, useRef, MouseEvent } from 'react';
import { Photo } from '../types';

import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onLoadMoreBtn: () => void;
  loadMoreScroll: Photo[]; 
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMoreBtn, loadMoreScroll }) => {
  const onBtnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onLoadMoreBtn();
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const { current } = onBtnRef;
      if (current && loadMoreScroll.length > 0) {
        const { top } = current.getBoundingClientRect();
        if (top <= window.innerHeight) {
          onLoadMoreBtn();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onLoadMoreBtn, loadMoreScroll]);

  return (
    <div className={css.container}>
      <button onClick={handleClick} type="button" className={css.btn} ref={onBtnRef}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
