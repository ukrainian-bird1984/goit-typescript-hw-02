import React, { useEffect, useState } from 'react';
import { fetchPhotosByQuery } from '../api';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from '../ImageModal/ImageModal';

import css from './App.module.css';

const App = () => {
  const [response, setResponse] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [content, setContent] = useState(null);
  const [query, setQuery] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const userQuery = value => {
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

  const loadMorePhotos = () => {
    if (page <= response.total_pages) {
      setPage(page + 1);
    } else {
      setLoadMore(false);
      setPage(0);
    }
  };

  const handleImageClick = url => {
    setContent(url);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        <LoadMoreBtn loadMoreScroll={photos} onLoadMoreBtn={loadMorePhotos}></LoadMoreBtn>
      )}
      <ImageModal
        onOpenButton={openModal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        content={content}
      ></ImageModal>
    </div>
  );
};

export default App;
