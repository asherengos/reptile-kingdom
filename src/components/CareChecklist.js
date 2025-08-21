import React, { useState, useEffect } from 'react';
import { getSpeciesChecklist, getTotalEstimatedCost } from '../data/careChecklistData';
import { generateChecklistCSV } from '../utils/csv';
import achievementService from '../services/achievementService';

function CareChecklist({ species, onClose, isEmbedded = false, initialCategory = 'all', initialShowOptional = true }) {
  const [checklist, setChecklist] = useState(null);
  const [costBreakdown, setCostBreakdown] = useState(null);
  const [isMissing, setIsMissing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showOptional, setShowOptional] = useState(initialShowOptional);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  useEffect(() => {
    if (species) {
      const speciesChecklist = getSpeciesChecklist(species.name);
      if (!speciesChecklist) {
        setIsMissing(true);
        setChecklist({ essential: [], optional: [], aiRecommendations: [] });
        setCostBreakdown({ essential: 0, range: '—', monthly: null, breakdown: {} });
        return;
      }
      setIsMissing(false);
      const costInfo = getTotalEstimatedCost(species.name);
      setChecklist(speciesChecklist);
      setCostBreakdown(costInfo);
      // Initialize checked items with persistence (prefer stored state)
      try {
        const storageKey = `careChecklist:${species.name}`;
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const ids = JSON.parse(stored);
          setCheckedItems(new Set(ids));
        } else {
          const initialChecked = new Set();
          speciesChecklist.essential.forEach(item => {
            initialChecked.add(item.id);
          });
          setCheckedItems(initialChecked);
        }
      } catch (e) {
        const initialChecked = new Set();
        speciesChecklist.essential.forEach(item => {
          initialChecked.add(item.id);
        });
        setCheckedItems(initialChecked);
      }
    }
  }, [species]);

  // Sync external initial controls when they change (for Storybook controls)
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setShowOptional(initialShowOptional);
  }, [initialShowOptional]);

  // Update achievement progress when checklist is viewed
  useEffect(() => {
    if (species) {
      achievementService.updateProgress({
        speciesViewed: [species.name]
      });
    }
  }, [species]);

  const handleItemToggle = (itemId) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
    // Persist per-species
    try {
      if (species) {
        const storageKey = `careChecklist:${species.name}`;
        localStorage.setItem(storageKey, JSON.stringify(Array.from(newChecked)));
      }
    } catch (e) {
      // no-op
    }
  };

  const handleReset = () => {
    try {
      if (species) {
        const storageKey = `careChecklist:${species.name}`;
        localStorage.removeItem(storageKey);
      }
    } catch (e) {
      // no-op
    }
    if (checklist) {
      const reset = new Set();
      checklist.essential.forEach(i => reset.add(i.id));
      setCheckedItems(reset);
    }
  };

  const getFilteredItems = () => {
    if (!checklist) return { essential: [], optional: [] };

    let filteredEssential = [...checklist.essential];
    let filteredOptional = [...checklist.optional];

    if (selectedCategory !== 'all') {
      filteredEssential = filteredEssential.filter(item => item.category === selectedCategory);
      filteredOptional = filteredOptional.filter(item => item.category === selectedCategory);
    }

    if (!showOptional) {
      filteredOptional = [];
    }

    return { essential: filteredEssential, optional: filteredOptional };
  };

  const getCategories = () => {
    if (!checklist) return [];
    const categories = new Set([
      ...checklist.essential.map(item => item.category),
      ...checklist.optional.map(item => item.category)
    ]);
    return ['all', ...Array.from(categories)];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'important': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'nice-to-have': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return '🚨';
      case 'important': return '⚠️';
      case 'nice-to-have': return '💡';
      default: return '📝';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Habitat': '🏠',
      'Heating': '🔥',
      'Lighting': '💡',
      'Substrate': '🌱',
      'Hiding Spots': '🕳️',
      'Food': '🍽️',
      'Water': '💧',
      'Enrichment': '🎯'
    };
    return icons[category] || '📦';
  };

  const exportChecklist = (format) => {
    if (!checklist) return;

    let content, filename, mimeType;

    if (format === 'text') {
      content = generateTextExport();
      filename = `${species.name}-care-checklist.txt`;
      mimeType = 'text/plain';
    } else if (format === 'json') {
      content = JSON.stringify({
        species: species.name,
        checklist: checklist,
        costBreakdown: costBreakdown,
        exportDate: new Date().toISOString()
      }, null, 2);
      filename = `${species.name}-care-checklist.json`;
      mimeType = 'application/json';
    } else if (format === 'csv') {
      content = generateChecklistCSV(checklist, checkedItems);
      filename = `${species.name}-care-checklist.csv`;
      mimeType = 'text/csv';
    }

    if (content) {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Update achievement progress for exporting
      achievementService.updateProgress({
        knowledgeArchitect: 1
      });
    }
  };

  const generateTextExport = () => {
    let exportText = `🦎 ${species.name} Care Checklist\n`;
    exportText += `Generated on: ${new Date().toLocaleDateString()}\n`;
    exportText += `Total estimated cost: ${costBreakdown?.range}\n\n`;
    exportText += '='.repeat(50) + '\n\n';

    // Essential items
    exportText += '🚨 ESSENTIAL ITEMS (Must Have):\n';
    exportText += '-'.repeat(30) + '\n';
    checklist.essential.forEach((item, index) => {
      exportText += `${index + 1}. ${item.item} - ${item.estimatedCost}\n`;
      exportText += `   Category: ${item.category}\n`;
      exportText += `   Description: ${item.description}\n`;
      exportText += `   Notes: ${item.notes}\n\n`;
    });

    // Optional items
    if (checklist.optional.length > 0) {
      exportText += '💡 OPTIONAL ITEMS (Nice to Have):\n';
      exportText += '-'.repeat(30) + '\n';
      checklist.optional.forEach((item, index) => {
        exportText += `${index + 1}. ${item.item} - ${item.estimatedCost}\n`;
        exportText += `   Category: ${item.category}\n`;
        exportText += `   Description: ${item.description}\n`;
        exportText += `   Notes: ${item.notes}\n\n`;
      });
    }

    // AI Recommendations
    if (checklist.aiRecommendations.length > 0) {
      exportText += '🤖 AI CARE RECOMMENDATIONS:\n';
      exportText += '-'.repeat(30) + '\n';
      checklist.aiRecommendations.forEach((rec, index) => {
        exportText += `${index + 1}. ${rec}\n`;
      });
      exportText += '\n';
    }

    // Cost breakdown
    if (costBreakdown) {
      exportText += '💰 COST BREAKDOWN:\n';
      exportText += '-'.repeat(30) + '\n';
      exportText += `Essential items: ${costBreakdown.essential} items\n`;
      exportText += `Total estimated cost: ${costBreakdown.range}\n`;
      exportText += `Categories: ${Object.entries(costBreakdown.breakdown)
        .map(([cat, count]) => `${cat}: ${count}`)
        .join(', ')}\n`;
    }

    return exportText;
  };

  const printChecklist = () => {
    const printContent = generateTextExport();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${species.name} Care Checklist</title>
          <style>
            :root { --ink: #1f2937; --accent: #2D5016; }
            html, body { height: 100%; }
            body { font-family: Arial, sans-serif; margin: 20mm; line-height: 1.55; color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .header { text-align: center; margin-bottom: 18mm; border-bottom: 2px solid #333; padding-bottom: 8mm; }
            .header h1 { margin: 0 0 6px 0; }
            .meta { color: #4b5563; font-size: 12px; }
            .section { margin-bottom: 14mm; }
            .section-title { font-size: 16px; font-weight: 700; margin-bottom: 8mm; color: var(--accent); }
            .list { display: grid; grid-template-columns: 1fr; gap: 6mm; }
            .item { padding: 5mm; border: 1px solid #e5e7eb; border-radius: 6px; page-break-inside: avoid; }
            .item-title { font-weight: 700; color: var(--accent); display: flex; justify-content: space-between; align-items: center; }
            .item-details { margin-top: 3mm; color: #374151; font-size: 12px; }
            .cost { font-weight: 700; color: #b91c1c; margin-left: 6mm; }
            .priority { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; margin-left: 6mm; border: 1px solid currentColor; }
            .critical { background-color: #fee2e2; color: #b91c1c; }
            .important { background-color: #ffedd5; color: #b45309; }
            .nice-to-have { background-color: #dbeafe; color: #1d4ed8; }
            @page { size: A4; margin: 12mm; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🦎 ${species.name} Care Checklist</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Total estimated cost: ${costBreakdown?.range}</p>
          </div>
          
          <div class="section">
            <div class="section-title">🚨 Essential Items (Must Have)</div>
            <div class="list">
              ${checklist.essential.map((item, index) => `
                <div class="item">
                  <div class="item-title">
                    <span>${index + 1}. ${item.item}</span>
                    <span>
                      <span class="cost">${item.estimatedCost}</span>
                      <span class="priority ${item.priority}">${item.priority}</span>
                    </span>
                  </div>
                  <div class="item-details">
                    <strong>Category:</strong> ${item.category}<br>
                    <strong>Description:</strong> ${item.description}<br>
                    <strong>Notes:</strong> ${item.notes}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          ${checklist.optional.length > 0 ? `
            <div class="section">
              <div class="section-title">💡 Optional Items (Nice to Have)</div>
              <div class="list">
                ${checklist.optional.map((item, index) => `
                  <div class="item">
                    <div class="item-title">
                      <span>${index + 1}. ${item.item}</span>
                      <span>
                        <span class="cost">${item.estimatedCost}</span>
                        <span class="priority ${item.priority}">${item.priority}</span>
                      </span>
                    </div>
                    <div class="item-details">
                      <strong>Category:</strong> ${item.category}<br>
                      <strong>Description:</strong> ${item.description}<br>
                      <strong>Notes:</strong> ${item.notes}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${checklist.aiRecommendations.length > 0 ? `
            <div class="section">
              <div class="section-title">🤖 AI Care Recommendations</div>
              <div class="list">
                ${checklist.aiRecommendations.map((rec, index) => `
                  <div class="item">
                    <div class="item-details">
                      ${index + 1}. ${rec}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="no-print" style="margin-top: 30px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; background: #2D5016; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Checklist</button>
            <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Close</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // CSV generation moved to utils/csv.js

  const filteredItems = getFilteredItems();
  const categories = getCategories();

  if (!checklist || !costBreakdown) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-4xl mb-4">🔄</div>
        <p>Loading checklist...</p>
      </div>
    );
  }

  if (isMissing) {
    const content = (
      <div className="p-6 text-center">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Care checklist coming soon</h3>
        <p className="text-gray-600">We’re still preparing a detailed shopping list for {species.name}. Check back shortly or explore other species.</p>
      </div>
    );
    if (isEmbedded) {
      return content;
    }
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden">
          <div className="bg-gradient-to-r from-reptile-green to-jungle-dark text-white p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">🛒 Care Checklist</h2>
            <button onClick={onClose} className="text-white text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full">×</button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  // If embedded, return just the content without modal wrapper
  if (isEmbedded) {
    return (
      <div className="space-y-6">
        {/* Cost Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-green-600">{costBreakdown.essential}</div>
              <div className="text-sm text-gray-600">Essential Items</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">{checklist.optional.length}</div>
              <div className="text-sm text-gray-600">Optional Items</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">{costBreakdown.range}</div>
              <div className="text-sm text-gray-600">Estimated Cost</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-orange-600">{checkedItems.size}</div>
              <div className="text-sm text-gray-600">Checked Off</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {checkedItems.size} of {checklist.essential.length + checklist.optional.length} items</span>
              <span>{Math.round((checkedItems.size / (checklist.essential.length + checklist.optional.length)) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(checkedItems.size / (checklist.essential.length + checklist.optional.length)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-b bg-white rounded-xl">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reptile-green focus:border-transparent outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Show Optional Items */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOptional}
                onChange={(e) => setShowOptional(e.target.checked)}
                className="rounded text-reptile-green focus:ring-reptile-green"
              />
              <span className="text-sm text-gray-600">Show optional items</span>
            </label>

            {/* Export Button */}
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              📤 Export
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              ♻️ Reset
            </button>
          </div>

          {/* Export Options */}
          {showExportOptions && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-800">Export as:</span>
                <button
                  onClick={() => exportChecklist('text')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  📄 Text File
                </button>
                <button
                  onClick={() => exportChecklist('json')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  🔧 JSON File
                </button>
                <button
                  onClick={() => exportChecklist('csv')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  📊 CSV File
                </button>
                <button
                  onClick={printChecklist}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-200"
                >
                  🖨️ Print
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Checklist Content */}
        <div className="space-y-6">
          {/* Essential Items */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              🚨 Essential Items (Must Have)
            </h3>
            <div className="space-y-3">
              {filteredItems.essential.map(item => (
                <div
                  key={item.id}
                  className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                    checkedItems.has(item.id)
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={checkedItems.has(item.id)}
                      onChange={() => handleItemToggle(item.id)}
                      className="mt-1 rounded text-reptile-green focus:ring-reptile-green"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{item.item}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-green-600">{item.estimatedCost}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                            {getPriorityIcon(item.priority)} {item.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500">{getCategoryIcon(item.category)} {item.category}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{item.description}</p>
                      
                      {item.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-yellow-800 text-sm">💡 {item.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Items */}
          {showOptional && filteredItems.optional.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                💡 Optional Items (Nice to Have)
              </h3>
              <div className="space-y-3">
                {filteredItems.optional.map(item => (
                  <div
                    key={item.id}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      checkedItems.has(item.id)
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={checkedItems.has(item.id)}
                        onChange={() => handleItemToggle(item.id)}
                        className="mt-1 rounded text-reptile-green focus:ring-reptile-green"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{item.item}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-blue-600">{item.estimatedCost}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                              {getPriorityIcon(item.priority)} {item.priority}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm text-gray-500">{getCategoryIcon(item.category)} {item.category}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-2">{item.description}</p>
                        
                        {item.notes && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">💡 {item.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          {checklist.aiRecommendations.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                🤖 AI Care Recommendations
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <div className="space-y-3">
                  {checklist.aiRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-purple-500 text-lg mt-1">💡</span>
                      <p className="text-gray-700">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t rounded-xl mt-6">
          <div className="text-center text-sm text-gray-600">
            <p>🛒 Use this checklist to ensure you have everything needed for proper {species.name} care!</p>
            <p className="mt-1">Check off items as you purchase them and export for shopping trips.</p>
          </div>
        </div>
      </div>
    );
  }

  // Original modal wrapper for standalone use
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-reptile-green to-jungle-dark text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold font-display">🛒 Care Checklist</h2>
              <p className="text-desert-sand mt-1">
                {species.emoji} {species.name} - Everything you need to get started
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-desert-sand text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Cost Summary */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b rounded-xl mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-600">{costBreakdown.essential}</div>
                <div className="text-sm text-gray-600">Essential Items</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-blue-600">{checklist.optional.length}</div>
                <div className="text-sm text-gray-600">Optional Items</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-purple-600">{costBreakdown.range}</div>
                <div className="text-sm text-gray-600">Setup Cost</div>
                {costBreakdown.monthly && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                    💰 Monthly: {costBreakdown.monthly}
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-orange-600">{checkedItems.size}</div>
                <div className="text-sm text-gray-600">Checked Off</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress: {checkedItems.size} of {checklist.essential.length + checklist.optional.length} items</span>
                <span>{Math.round((checkedItems.size / (checklist.essential.length + checklist.optional.length)) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(checkedItems.size / (checklist.essential.length + checklist.optional.length)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b bg-white rounded-xl mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reptile-green focus:border-transparent outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              {/* Show Optional Items */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showOptional}
                  onChange={(e) => setShowOptional(e.target.checked)}
                  className="rounded text-reptile-green focus:ring-reptile-green"
                />
                <span className="text-sm text-gray-600">Show optional items</span>
              </label>

              {/* Export Button */}
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                📤 Export
              </button>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                ♻️ Reset
              </button>
            </div>

            {/* Export Options */}
            {showExportOptions && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-blue-800">Export as:</span>
                  <button
                    onClick={() => exportChecklist('text')}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    📄 Text File
                  </button>
                  <button
                    onClick={() => exportChecklist('json')}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    🔧 JSON File
                  </button>
                  <button
                    onClick={() => exportChecklist('csv')}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    📊 CSV File
                  </button>
                  <button
                    onClick={printChecklist}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-200"
                  >
                    🖨️ Print
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Checklist Content */}
          <div className="space-y-6">
            {/* Essential Items */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                🚨 Essential Items (Must Have)
              </h3>
              <div className="space-y-3">
                {filteredItems.essential.map(item => (
                  <div
                    key={item.id}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      checkedItems.has(item.id)
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={checkedItems.has(item.id)}
                        onChange={() => handleItemToggle(item.id)}
                        className="mt-1 rounded text-reptile-green focus:ring-reptile-green"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{item.item}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-green-600">{item.estimatedCost}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                              {getPriorityIcon(item.priority)} {item.priority}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-500">{getCategoryIcon(item.category)} {item.category}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-2">{item.description}</p>
                        
                        {item.notes && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-yellow-800 text-sm">💡 {item.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Items */}
            {showOptional && filteredItems.optional.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  💡 Optional Items (Nice to Have)
                </h3>
                <div className="space-y-3">
                  {filteredItems.optional.map(item => (
                    <div
                      key={item.id}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                        checkedItems.has(item.id)
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={checkedItems.has(item.id)}
                          onChange={() => handleItemToggle(item.id)}
                          className="mt-1 rounded text-reptile-green focus:ring-reptile-green"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{item.item}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-blue-600">{item.estimatedCost}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                                {getPriorityIcon(item.priority)} {item.priority}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm text-gray-500">{getCategoryIcon(item.category)} {item.category}</span>
                          </div>
                          
                          <p className="text-gray-700 mb-2">{item.description}</p>
                          
                          {item.notes && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <p className="text-blue-800 text-sm">💡 {item.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendations */}
            {checklist.aiRecommendations.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  🤖 AI Care Recommendations
                </h3>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <div className="space-y-3">
                    {checklist.aiRecommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="text-purple-500 text-lg mt-1">💡</span>
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t rounded-xl mt-6">
            <div className="text-center text-sm text-gray-600">
              <p>🛒 Use this checklist to ensure you have everything needed for proper {species.name} care!</p>
              <p className="mt-1">Check off items as you purchase them and export for shopping trips.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareChecklist;
