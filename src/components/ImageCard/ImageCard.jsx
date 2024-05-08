import css from './ImageCard.module.css';

const ImageCard = ({ image, onPhotoClick, openModal }) => {
  const { description, alt_description, urls, likes, user } = image;
  const openModalByClick = url => {
    openModal();
    onPhotoClick(url);
  };

  return (
    <div className={css.card}>
      <img src={urls.small} alt={alt_description} onClick={() => openModalByClick(urls.regular)} />
      <p>Author: {user.name}</p>
      <p>Likes: {likes}</p>
      <p className={css.description}>{descr}</p>
    </div>
  );
};

export default ImageCard;