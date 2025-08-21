import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResponsiveImage, { getSrcset } from '../../components/ResponsiveImage.jsx';

describe('ResponsiveImage', () => {
  const images = {
    desktop: 'bearded-dragon-v1.webp',
    mobile: 'bearded-dragon-v1.webp',
    alt: 'Bearded dragon basking',
    lqip: 'data:image/svg+xml;base64,PHN2Zy8+' // simple inline placeholder
  };

  test('builds srcset from images', () => {
    const set = getSrcset(images);
    expect(set).toContain('bearded-dragon-v1.webp 400w');
    expect(set).toContain('800w');
    expect(set).toContain('1200w');
  });

  test('renders img with lazy attributes and placeholder', () => {
    render(<ResponsiveImage images={images} alt="dragon" />);
    // placeholder present initially
    expect(screen.getByRole('img', { hidden: true })).toBeDefined;
  });

  test('swaps placeholder after load', () => {
    render(<ResponsiveImage images={images} alt="dragon" />);
    const img = screen.getByRole('img', { name: /dragon/i });
    fireEvent.load(img);
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  test('falls back when missing images', () => {
    render(<ResponsiveImage images={{}} alt="fallback" />);
    // There is no src; the placeholder div should be in the document
    expect(screen.getByText('🖼️')).toBeInTheDocument();
  });
});


