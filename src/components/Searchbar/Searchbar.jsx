import { Notify } from "notiflix";
import { useState } from "react";

import { SearchbarWrap, Form, SearchFormBtn, SearchFormBtnLabel, SearchInput } from "./Searchbar.styled";

export  const Searchbar = ({onSubmit}) => {

  const [searchName, setSearshName] = useState('');

  //функция записи изменения значения поля поиска в стейт
  const onImputChange = (event) => {
    const searchName = event.target.value;
    setSearshName(searchName);
  }

  // функция onClick при нажати  на кнопку
  const onClickSearchBtn = (event) => {
      event.preventDefault();


      // если поле пустое - сообщаем
      if (searchName.trim().toLowerCase()) {
        onSubmit(searchName); //отправляем список картинок в props  -> Арр
        setSearshName(''); //очищаем стейт формы
      } else {
        Notify.failure('Fill in the search field');
      }
  };


    
    return(
      <SearchbarWrap>
        <Form>
          <SearchFormBtn
            type = "submit" 
            className = "button" 
              onClick = { onClickSearchBtn }
          >
              <SearchFormBtnLabel>
                Search
              </SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchInput
            className = "input"
            name = "input"
            type = "text"
            autoComplete = "off"
            autoFocus
            placeholder = "Search images and photos"
              maxLength = '20'
              value = { searchName }
              onChange = { onImputChange }
          />
        </Form>
      </SearchbarWrap>
    )
};