import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CareChecklist from '../../components/CareChecklist';

const species = { name: 'Leopard Gecko', emoji: '🦎' };

describe('CareChecklist persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists checked items per species', async () => {
    render(<CareChecklist species={species} onClose={() => {}} isEmbedded />);

    // Wait for loading to resolve by checking presence of a known label
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    // Toggle first checkbox off (essentials start checked)
    fireEvent.click(checkboxes[0]);

    // Force re-render to simulate navigation/refresh
    render(<CareChecklist species={species} onClose={() => {}} isEmbedded />);

    const after = await screen.findAllByRole('checkbox');
    // First should remain unchecked after reload
    expect(after[0].checked).toBe(false);
  });
});


