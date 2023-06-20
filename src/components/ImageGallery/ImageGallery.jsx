import React from "react";

import {ImageGalleryItem} from "components/ImageGalleryItem/ImageGalleryItem";

import { ImageGalleryList } from "./ImageGallery.styled";

export const ImageGallery = ({ images }) => {
  
  return(
    <ImageGalleryList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key = { id }
            webformatURL = { webformatURL }
            largeImageURL = { largeImageURL }
            tags = { tags }
          />
          );
      })}
    </ImageGalleryList>
  )
}

