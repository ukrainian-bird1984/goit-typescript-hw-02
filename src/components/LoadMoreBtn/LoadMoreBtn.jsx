import { useEffect, useRef } from 'react';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMoreBtn, loadMoreScroll }) => {
  const onBtnRef = useRef(null);
  useEffect(() => {
    if (onBtnRef.current) {
      onBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [loadMoreScroll]);

  return (
    <div className={css.container}>
      <button onClick={onLoadMoreBtn} type="button" className={css.btn} ref={onBtnRef}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;