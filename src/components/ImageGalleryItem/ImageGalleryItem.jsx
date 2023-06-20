import { useState } from "react";

import { Modal } from "components/Modal/Modal";

import { ListItem, GalleryImage } from "./ImageGalleryItem.styled";


export  const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  // функция переключения состояния отображения модального окна
  const toggleModal = () => { setShowModal(!showModal) }

    return(
      <ListItem className="gallery-item">
        <GalleryImage src = { webformatURL } alt = { tags } onClick = { toggleModal }/>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>)}
      </ListItem>
    )
};