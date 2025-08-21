// CSV utilities for exporting checklists

export function generateChecklistCSV(checklist, checkedItemIds) {
  if (!checklist) return '';
  const rows = [];

  const escape = (val) => {
    if (val == null) return '""';
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  };

  // Header
  rows.push([
    'Section',
    'ID',
    'Item',
    'Category',
    'Priority',
    'Estimated Cost',
    'Description',
    'Notes',
    'Optional',
    'Completed'
  ].map(escape).join(','));

  const pushItem = (section, item, isOptional) => {
    const completed = checkedItemIds ? checkedItemIds.has(item.id) : false;
    rows.push([
      section,
      item.id,
      item.item,
      item.category,
      item.priority,
      item.estimatedCost,
      item.description,
      item.notes || '',
      isOptional ? 'true' : 'false',
      completed ? 'true' : 'false'
    ].map(escape).join(','));
  };

  (checklist.essential || []).forEach((item) => pushItem('Essential', item, false));
  (checklist.optional || []).forEach((item) => pushItem('Optional', item, true));

  return rows.join('\n');
}


