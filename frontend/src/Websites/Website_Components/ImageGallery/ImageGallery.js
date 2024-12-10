import React from "react";

const ImageGallery = ({ images, onImageHover }) => {
  return (
    <div style={styles.gallery}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Thumbnail ${index + 1}`}
          style={styles.thumbnail}
          onMouseEnter={() => onImageHover(index)}
        />
      ))}
    </div>
  );
};

const styles = {
  gallery: { display: "flex", flexDirection: "column", gap: "10px" },
  thumbnail: {
    width: "70px",
    height: "70px",
    cursor: "pointer",
    objectFit: "cover",
    border: "1px solid #ddd",
    borderRadius: "4px",
    transition: "transform 0.2s ease", // Added transition for smooth effect
  },
};

export default ImageGallery;
