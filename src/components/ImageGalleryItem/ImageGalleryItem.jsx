import { useState } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";

import { Modal } from "components/Modal/Modal";

import { ListItem, GalleryImage } from "./ImageGalleryItem.styled";


export  const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  // функция переключения состояния отображения модального окна
  const toggleModal = () => { setShowModal(!showModal) }

    return(
      <ListItem className="gallery-item">
        <GalleryImage src = { webformatURL } alt = { tags } onClick = { toggleModal }/>
        { showModal && createPortal(
          <Modal onClose={toggleModal}>
              <img src={largeImageURL} alt={tags} />
          </Modal>,
            document.getElementById('modal-root')) }
      </ListItem>
    )
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags:PropTypes.string.isRequired,
}