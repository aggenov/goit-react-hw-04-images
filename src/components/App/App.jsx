import { useState, useEffect } from "react";
import { fetchImages } from "api/fetchImages";
import { Notify } from "notiflix";
import { createPortal } from "react-dom";

import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

import { Body } from "./App.styled";




export const App = () => {
  const [ searchName, setSearchName ] = useState('');
  const [ images, setImages ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ loading, setLoading ] = useState(false);
  const [total, setTotal] = useState(null);
 
  useEffect(() => {

    if ( searchName === '' ) {
      return;
    }
  
    // функция загрузки картинок
    const getImages = async () => {

      try {
        // показываем лоадер
        setLoading(true);

        //массив найденных картинок
        const searchImages = await fetchImages(searchName, page);
        setTotal (searchImages.totalHits)

        //если картинок нет - сообщаем
        if (searchImages.length === 0) {
          Notify.failure(
            `Sorry, the images you requested: ${searchName} not found.`
          );
        };
        // добавляем найденные картинки в стейт
        setImages(prev => [ ...prev, ...searchImages.hits ])
          
        //когда есть ошибка при загрузке
      } catch (error) {
        Notify.failure('Something went wrong');
        // по окончании загрузки прячем лоадер
      } finally {
        setLoading(false);
      }
    };
    
    getImages();//загружаем картинки
    
  }, [ searchName, page ]);//при изменении имени или номера страницы
  
  //функция записи найденых картинок в стейт при отправке формы
  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setImages([]);
    setPage(1);
  };

  //нажатиe кнопки *Load More* меняет номер страницы в стейте +1
  const loadMoreSubmit = () => {
    setPage( prev => prev + 1 );
  };

  const totalPage = total / images.length;
    return (
      <Body>
          <Searchbar onSubmit = { handleFormSubmit }/>
          { images.length!==0 && (<ImageGallery images = { images } />) }
          { totalPage > 1 && !loading && images.length > 0 && <Button onClick={loadMoreSubmit} /> }
          { loading && createPortal( <Loader />,  document.getElementById('loader-root')) }  
      </Body>
    );
};
