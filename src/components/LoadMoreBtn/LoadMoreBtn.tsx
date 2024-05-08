import { useEffect, useRef, MouseEvent } from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onLoadMoreBtn: () => void;
  loadMoreScroll: any;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMoreBtn, loadMoreScroll }) => {
  const onBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (onBtnRef.current) {
      onBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [loadMoreScroll]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadMoreBtn();
  };

  return (
    <div className={css.container}>
      <button onClick={handleClick} type="button" className={css.btn} ref={onBtnRef}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;