import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface ProductCarouselProps {
  sources: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ sources }) => {
  const images = sources.map((e, i) => {
    return { original: e, thumbnail: e };
  });

  return <ImageGallery items={images} />;
};

export default ProductCarousel;
