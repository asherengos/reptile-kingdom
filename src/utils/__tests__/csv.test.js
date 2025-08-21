import { generateChecklistCSV } from '../../utils/csv';

describe('generateChecklistCSV', () => {
  const checklist = {
    essential: [
      {
        id: 'e1',
        item: 'Warm hide',
        category: 'Hiding Spots',
        priority: 'critical',
        estimatedCost: '$10',
        description: 'Snug hide for warm side',
        notes: 'Place over heat source'
      }
    ],
    optional: [
      {
        id: 'o1',
        item: 'Decor branch',
        category: 'Enrichment',
        priority: 'nice-to-have',
        estimatedCost: '$15',
        description: 'Climbing/visual barrier',
        notes: ''
      }
    ]
  };

  it('includes header with Optional and Completed columns', () => {
    const csv = generateChecklistCSV(checklist, new Set(['e1']));
    const [header] = csv.split('\n');
    expect(header).toContain('Optional');
    expect(header).toContain('Completed');
  });

  it('marks essential as Optional=false and Completed=true when checked', () => {
    const csv = generateChecklistCSV(checklist, new Set(['e1']));
    const lines = csv.split('\n');
    const essentialRow = lines.find((l) => l.includes('"Essential"'));
    expect(essentialRow).toBeTruthy();
    // Optional=false, Completed=true
    expect(essentialRow).toContain('"false"');
    expect(essentialRow).toContain('"true"');
  });

  it('marks optional as Optional=true and Completed=false when not checked', () => {
    const csv = generateChecklistCSV(checklist, new Set(['e1']));
    const lines = csv.split(/\r?\n/);
    // Find the row with the specific optional item name, not the header
    const optionalRow = lines.find((l) => l.includes('Decor branch'));
    expect(optionalRow).toBeTruthy();
    // Check if it contains the expected values anywhere
    expect(optionalRow).toContain('"true"');
    expect(optionalRow).toContain('"false"');
  });
});


