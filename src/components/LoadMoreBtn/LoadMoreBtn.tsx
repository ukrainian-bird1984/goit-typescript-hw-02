import React from 'react';
import './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onLoadMoreBtn: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMoreBtn }) => {
  return (
    <div className="container">
      <button onClick={onLoadMoreBtn} type="button" className="btn">
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
