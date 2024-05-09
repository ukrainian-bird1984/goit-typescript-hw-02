import { useEffect, useRef, MouseEventHandler } from 'react'; 
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  loadMorePhotos: () => void; 
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ loadMorePhotos }) => {
  const onBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (onBtnRef.current) {
      onBtnRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => { 
    loadMorePhotos();
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
