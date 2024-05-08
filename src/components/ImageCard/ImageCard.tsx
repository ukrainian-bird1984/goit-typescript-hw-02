import React from 'react';
import css from './ImageCard.module.css';

interface ImageData {
  description: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  likes: number;
  user: {
    name: string;
  };
}

interface ImageCardProps {
  image: ImageData;
  onPhotoClick: (url: string) => void;
  openModal: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onPhotoClick, openModal }) => {
  const { description, alt_description, urls, likes, user } = image;

  const openModalByClick = (url: string) => {
    openModal();
    onPhotoClick(url);
  };

  return (
    <div className={css.card}>
      <img src={urls.small} alt={alt_description} onClick={() => openModalByClick(urls.regular)} />
      <p>Author: {user.name}</p>
      <p>Likes: {likes}</p>
      <p className={css.description}>{description}</p>
    </div>
  );
};

export default ImageCard;
