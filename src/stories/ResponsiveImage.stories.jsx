import React from 'react';
import ResponsiveImage from '../components/ResponsiveImage';

const images = [
  '/images/axolotl.jpg',
  '/images/ball-python.jpg',
  '/images/bearded-dragon.jpg',
  '/images/blue-tongued-skink.jpg',
  '/images/chameleon.jpg',
  '/images/corn-snake.jpg',
  '/images/crested-gecko.jpg',
  '/images/dart-frog.jpg',
  '/images/fire-bellied-toad.jpg',
  '/images/gargoyle-gecko.jpg',
  '/images/green-anole.jpg',
  '/images/hero.jpg',
  '/images/hognose-snake.jpg',
  '/images/kingsnake.jpg',
  '/images/leopard-gecko.jpg',
  '/images/mexican-axolotl.jpg',
  '/images/milk-snake.jpg',
  '/images/pacman-frog.jpg',
  '/images/red-eared-slider.jpg',
  '/images/tiger-salamander.jpg',
  '/images/uromastyx.jpg'
];

export default {
  title: 'Reptiles & Amphibians/Gallery',
  component: ResponsiveImage,
};

export const Gallery = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '16px',
      padding: '16px'
    }}
  >
    {images.map((src, index) => (
      <div
        key={index}
        style={{
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        <ResponsiveImage
          src={src}
          alt={`Animal ${index + 1}`}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>
    ))}
  </div>
);
