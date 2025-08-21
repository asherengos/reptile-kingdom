import React from 'react';
import { render, screen } from '@testing-library/react';

const ChecklistItem = ({ item }) => (
  <div>
    <span>{item.label}</span>
    <span>{item.frequency}</span>
    {item.units && <span>{item.min}-{item.max} {item.units}</span>}
  </div>
);

test('renders checklist item with units', () => {
  const item = { label: 'Check humidity', frequency: 'weekly', min: 50, max: 60, units: '%', notes: '' };
  render(<ChecklistItem item={item} />);
  expect(screen.getByText(/Check humidity/)).toBeInTheDocument();
  expect(screen.getByText(/weekly/)).toBeInTheDocument();
  expect(screen.getByText(/50-60 %/)).toBeInTheDocument();
});


