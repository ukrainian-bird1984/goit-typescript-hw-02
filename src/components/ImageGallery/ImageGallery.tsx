import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface Photo {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  description: string;
  alt_description: string;
  likes: number;
  user: {
    username: string;
    name: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

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
