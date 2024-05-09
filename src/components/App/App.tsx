import React, { useEffect, useState } from 'react';
import { fetchPhotosByQuery } from '../api';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

import css from './App.module.css';

interface Photo {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
}

interface ServerResponse {
  total_pages: number;
  results: Photo[];
}

const App: React.FC = () => {
  const [response, setResponse] = useState<ServerResponse | null>(null);
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [content, setContent] = useState<string>(''); 
  const [query, setQuery] = useState<string>(''); 
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const userQuery = (value: string): void => {
    setQuery(value);
    setPage(1);
    setPhotos(null);
  };

  useEffect(() => {
    async function fetchPhotos() {
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
          setPhotos(prevPhotos => [...(prevPhotos || []), ...data.results]);
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
    if (response && page <= response.total_pages) {
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
      <SearchBar onSubmit={userQuery}></SearchBar>
      {Array.isArray(photos) && (
        <ImageGallery
          collection={photos}
          onPhotoClick={handleImageClick}
          openModal={openModal}
        ></ImageGallery>
      )}
      {error && <ErrorMessage></ErrorMessage>}
      {loading && <Loader></Loader>}
      {loadMore && (
        <LoadMoreBtn loadMoreScroll={photos || []} onLoadMoreBtn={loadMorePhotos}></LoadMoreBtn>
      )}
      <ImageModal
        onOpenButton={openModal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        content={content || ''}
      ></ImageModal>
    </div>
  );
};

export default App;
