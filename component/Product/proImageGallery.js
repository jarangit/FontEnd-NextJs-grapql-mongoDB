import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

const ProImageGallery = (props) => {
  const [DataImgGall, setDataImgGall] = useState([
    {
      original: props.imageUrl,
      thumbnail: props.imageUrl,
      thumbnailClass: 'featured-thumb',
    },
  ]);

  useEffect(() => {
    props.image_gallery.map((items) => {
      setDataImgGall((DataImgGall) => [
        ...DataImgGall,
        {
          original: items,
          thumbnail: items,
          thumbnailClass: 'featured-thumb',
        },
      ]);
    });
  }, [props.image_gallery]);
  console.log(DataImgGall);

  const images = DataImgGall;
  console.log(images);

  return (
    <div>
      <ImageGallery
        items={images}
        showPlayButton={false}
        slideOnThumbnailOver={true}
      />
      ;
    </div>
  );
};

export default ProImageGallery;
