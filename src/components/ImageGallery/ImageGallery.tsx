import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface ImageProps {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  description: string; 
  alt_description: string; 
  likes: number; 
  user: string; 
}

interface ImageGalleryProps {
  collection: ImageProps[];
  onPhotoClick: (url: string) => void;
  openModal: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ collection, onPhotoClick, openModal }) => {
  return (
    <ul className={css.image}>
      {collection.map(item => (
        <li key={item.id}>
          <ImageCard image={item} onPhotoClick={onPhotoClick} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
