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

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | undefined>(undefined);
  const [scrollBtn, setScrollBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 900) {
        const isScrollBtnVisible = window.scrollY > 200;
        setScrollBtn(isScrollBtnVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!query) return;
    async function handleSearch() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotosByQuery(query, page);
        setPhotos(prevPhotos => {
          if (Array.isArray(prevPhotos)) {
            return [...prevPhotos, ...data.results];
          } else {
            return [...data.results];
          }
        });
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    handleSearch();
  }, [query, page]);

  const handleQuery = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPhotos(null);
      setPage(1);
      setTotalPages(0);
    }
  };

  const loadMorePhotos = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(undefined);
  };

  const onScrollBtn = () => {
    setScrollBtn(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleQuery} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {photos !== null && (
        <ImageGallery collection={photos} onPhotoClick={openModal} openModal={openModal} />
      )}
      {totalPages > page && <LoadMoreBtn onLoadMoreBtn={loadMorePhotos} />}
      <ImageModal isOpen={!!selectedPhoto} onRequestClose={closeModal} />
      {scrollBtn && <ScrollIntoView selector="#header"><ScrollUp onScrollBtn={onScrollBtn} /></ScrollIntoView>}
    </div>
  );
};

export default App;
