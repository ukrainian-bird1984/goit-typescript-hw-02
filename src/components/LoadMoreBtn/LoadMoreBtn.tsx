interface LoadMoreBtnProps {
  onLoadMoreBtn: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMoreBtn }) => {
 

  return (
    <div className={css.container}>
      <button onClick={onLoadMoreBtn} type="button" className={css.btn}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;