import React from 'react';

const ResponsiveImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
      }}
    />
  );
};

export default ResponsiveImage;
