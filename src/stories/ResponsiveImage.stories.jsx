import React from 'react';
import ResponsiveImage from '../components/ResponsiveImage.jsx';

export default {
  title: 'Media/ResponsiveImage',
  component: ResponsiveImage,
};

const Template = (args) => (
  <div style={{ maxWidth: 600, margin: '2rem auto' }}>
    <ResponsiveImage {...args} />
  </div>
);

export const Srcset = Template.bind({});
Srcset.args = {
  images: {
    desktop: 'bearded-dragon-v1.webp',
    mobile: 'bearded-dragon-v1.webp',
    alt: 'Bearded dragon on rock',
  },
  alt: 'Bearded dragon',
  caption: 'Demonstrates srcset across 400/800/1200 widths',
};

export const WithLQIP = Template.bind({});
WithLQIP.args = {
  images: {
    desktop: 'leopard-gecko-v1.webp',
    mobile: 'leopard-gecko-v1.webp',
    lqip: 'data:image/svg+xml;base64,PHN2Zy8+' , // tiny inline placeholder
    alt: 'Leopard gecko perched',
  },
  alt: 'Leopard gecko',
  caption: 'Shows low‑quality placeholder fading into the final image',
};

export const MissingImageFallback = Template.bind({});
MissingImageFallback.args = {
  images: {},
  alt: 'Fallback placeholder',
  caption: 'Renders a neutral placeholder when images are unavailable',
};


