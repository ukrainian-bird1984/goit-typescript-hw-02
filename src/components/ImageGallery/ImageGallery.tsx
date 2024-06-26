import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { Photo } from '../types';

import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  collection: Photo[];
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
