import React from 'react';
import { fn } from 'storybook/test';
import CareChecklist from './CareChecklist';
import achievementService from '../services/achievementService';

// Global safety mocks for Storybook
if (typeof window !== 'undefined') {
  if (!window.print) {
    window.print = () => {};
  }
  const originalOpen = window.open;
  window.open = (...args) => {
    try {
      return { document: { write: () => {}, close: () => {} } };
    } catch (e) {
      return originalOpen ? originalOpen(...args) : null;
    }
  };
}

if (typeof URL !== 'undefined') {
  if (!URL.createObjectURL) {
    URL.createObjectURL = () => 'blob:storybook-mock';
  }
}

// Stub achievement side effects in stories
if (achievementService && typeof achievementService.updateProgress === 'function') {
  achievementService.updateProgress = () => ({ progress: {}, newAchievements: [] });
}

const leopardGecko = { name: 'Leopard Gecko', emoji: '🦎' };
const ballPython = { name: 'Ball Python', emoji: '🐍' };

const categoryOptions = [
  'all',
  'Habitat',
  'Heating',
  'Lighting',
  'Substrate',
  'Hiding Spots',
  'Food',
  'Water',
  'Enrichment'
];

export default {
  title: 'Components/CareChecklist',
  component: CareChecklist,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    initialCategory: {
      control: { type: 'select' },
      options: categoryOptions
    },
    initialShowOptional: {
      control: { type: 'boolean' }
    },
    isEmbedded: {
      control: { type: 'boolean' }
    }
  }
};

const Template = (args) => <CareChecklist {...args} />;

export const Default = Template.bind({});
Default.args = {
  species: leopardGecko,
  onClose: fn(),
  isEmbedded: true,
  initialCategory: 'all',
  initialShowOptional: true
};

export const CategoryFiltered = Template.bind({});
CategoryFiltered.args = {
  species: leopardGecko,
  onClose: fn(),
  isEmbedded: true,
  initialCategory: 'Habitat',
  initialShowOptional: true
};

export const HideOptional = Template.bind({});
HideOptional.args = {
  species: leopardGecko,
  onClose: fn(),
  isEmbedded: true,
  initialCategory: 'all',
  initialShowOptional: false
};

export const DifferentSpecies = Template.bind({});
DifferentSpecies.args = {
  species: ballPython,
  onClose: fn(),
  isEmbedded: true,
  initialCategory: 'all',
  initialShowOptional: true
};


