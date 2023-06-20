import { useState, useEffect } from "react";
import { fetchImages } from "api/fetchImages";
import { Dna } from "react-loader-spinner";
import { Notify } from "notiflix";

import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";

import { Body } from "./App.styled";




export const App = () => {
  const [ searchName, setSearchName ] = useState('');
  const [ images, setImages ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ loading, setLoading ] = useState(false);
  const [ isLoadMoreShown, setIsLoadMoreShown ] = useState(false);
 
  useEffect(() => {

    if ( searchName === '' ) {
      return;
    }
  
    // функция загрузки картинок
    const getImages = async () => {

      try {
        // показываем лоадер, прячем кнопку Load more
        setLoading(true);
        setIsLoadMoreShown(false);

        //массив найденных картинок
        const searchImages = await fetchImages( searchName, page );

        //если картинок нет - сообщаем
        if (searchImages.length === 0) {
          Notify.failure(
            `Sorry, the images you requested: ${searchName} not found.`
          );
        };
        // добавляем найденные картинки в стейт
        setImages(prev => [ ...prev, ...searchImages ])
          
        //если картинок больше 12 - объявляем видимость кнопки Load more
        if (searchImages.length >= 12) {
          setIsLoadMoreShown(true);
        };
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

    return (
      <Body>
          <Searchbar onSubmit = { handleFormSubmit }/>
          { !!images.length && (<ImageGallery images = { images } />) }
          { loading && (
            <Dna
              visible={true}
              height="60"
              width="60"
              ariaLabel="dna-loading"
              wrapperStyle={{  margin: '0 auto' }}
              wrapperClass="dna-wrapper"
          />
          )}                        
        
          { isLoadMoreShown && <Button onClick = { loadMoreSubmit }/>}
      </Body>
    );
};
