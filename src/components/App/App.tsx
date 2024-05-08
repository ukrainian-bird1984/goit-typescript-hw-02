import React, { useEffect, useState } from 'react';
import { fetchPhotosByQuery, PhotoData } from '../api';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from '../ImageModal/ImageModal';
import css from './App.module.css';

const App: React.FC = () => {
  const [response, setResponse] = useState<any>(null);
  const [photos, setPhotos] = useState<PhotoData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [content, setContent] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  const userQuery = (value: string): void => {
    setQuery(value);
    setPage(1);
    setPhotos(null);
  };

  useEffect(() => {
    async function fetchPhotos(): Promise<void> {
      if (query === '') return;
      try {
        setLoading(true);
        setError(false);

        const data = await fetchPhotosByQuery(query, page);

        setResponse(data);

        if (data.total_pages === 0) {
          setError(true);
          setLoadMore(false);
        }

        if (photos === null || photos.length === 0) {
          setPhotos(data.results);
        } else if (page > 1) {
          setPhotos([...photos, ...data.results]);
        } else {
          setPhotos(data.results);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
    if (query !== '') {
      setLoadMore(true);
    }
  }, [query, page]);

  const loadMorePhotos = (): void => {
    if (page <= response.total_pages) {
      setPage(page + 1);
    } else {
      setLoadMore(false);
      setPage(0);
    }
  };

  const handleImageClick = (url: string): void => {
    setContent(url);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={userQuery} />
      {Array.isArray(photos) && (
        <ImageGallery
          collection={photos}
          onPhotoClick={handleImageClick}
          openModal={openModal}
        />
      )}
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {loadMore && (
        <LoadMoreBtn loadMoreScroll={photos} onLoadMoreBtn={loadMorePhotos} />
      )}
      <ImageModal
        onOpenButton={openModal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        content={content}
      />
    </div>
  );
};

export default App;