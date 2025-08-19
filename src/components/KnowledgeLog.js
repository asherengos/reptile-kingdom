import React, { useState, useEffect } from 'react';
import knowledgeService from '../services/knowledgeService';

function KnowledgeLog({ isOpen, onClose }) {
  const [knowledgeLog, setKnowledgeLog] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [stats, setStats] = useState(null);

  // Load knowledge log and stats
  useEffect(() => {
    if (isOpen) {
      loadKnowledgeLog();
      loadStats();
    }
  }, [isOpen]);

  // Listen for knowledge updates
  useEffect(() => {
    const handleKnowledgeUpdate = () => {
      loadKnowledgeLog();
      loadStats();
    };

    window.addEventListener('knowledgeUpdated', handleKnowledgeUpdate);
    return () => window.removeEventListener('knowledgeUpdated', handleKnowledgeUpdate);
  }, []);

  const loadKnowledgeLog = () => {
    const log = knowledgeService.getKnowledgeLog();
    setKnowledgeLog(log);
  };

  const loadStats = () => {
    const stats = knowledgeService.getStorageStats();
    setStats(stats);
  };

  // Filter and sort knowledge entries
  const getFilteredKnowledge = () => {
    let filtered = [...knowledgeLog];

    // Apply species filter
    if (filterSpecies !== 'all') {
      filtered = filtered.filter(entry => 
        entry.species.name.toLowerCase() === filterSpecies.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(entry =>
        entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.species.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'species':
          return a.species.name.localeCompare(b.species.name);
        case 'type':
          return a.species.type.localeCompare(b.species.type);
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Get unique species for filter dropdown
  const getUniqueSpecies = () => {
    const species = knowledgeLog.map(entry => entry.species.name);
    return [...new Set(species)].sort();
  };

  // Handle entry deletion
  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this knowledge entry?')) {
      knowledgeService.deleteEntry(entryId);
      if (selectedEntry && selectedEntry.id === entryId) {
        setSelectedEntry(null);
      }
    }
  };

  // Handle export
  const handleExport = (format) => {
    let content, filename, mimeType;

    if (format === 'text') {
      content = knowledgeService.exportKnowledgeLog();
      filename = `reptile-knowledge-log-${new Date().toISOString().split('T')[0]}.txt`;
      mimeType = 'text/plain';
    } else if (format === 'json') {
      content = knowledgeService.exportAsJSON();
      filename = `reptile-knowledge-log-${new Date().toISOString().split('T')[0]}.json`;
      mimeType = 'application/json';
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
    }
  };

  // Handle print
  const handlePrint = () => {
    const printContent = knowledgeService.exportKnowledgeLog();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Reptile Knowledge Log</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .entry { margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; }
            .species { font-weight: bold; color: #2D5016; }
            .question { font-weight: bold; margin: 10px 0; }
            .answer { margin: 10px 0; }
            .fun-fact { font-style: italic; color: #666; }
            .tags { font-size: 12px; color: #999; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🦎 Reptile Care Knowledge Log</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <pre style="white-space: pre-wrap; font-family: inherit;">${printContent}</pre>
          <div class="no-print">
            <button onclick="window.print()">Print</button>
            <button onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Clear all knowledge
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved knowledge? This action cannot be undone.')) {
      knowledgeService.clearAllKnowledge();
      setSelectedEntry(null);
    }
  };

  const filteredKnowledge = getFilteredKnowledge();
  const uniqueSpecies = getUniqueSpecies();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-reptile-green to-jungle-dark text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold font-display">📚 Knowledge Log</h2>
              <p className="text-desert-sand mt-1">Your saved reptile care wisdom</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-desert-sand text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>📊 {stats.totalEntries} entries • {stats.uniqueSpecies} species</span>
              <span>💾 Storage: {stats.storageSizeFormatted}</span>
              {stats.lastUpdated && (
                <span>🕒 Last updated: {new Date(stats.lastUpdated).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="p-6 border-b bg-white">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reptile-green focus:border-transparent outline-none"
              />
            </div>

            {/* Species Filter */}
            <select
              value={filterSpecies}
              onChange={(e) => setFilterSpecies(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reptile-green focus:border-transparent outline-none"
            >
              <option value="all">All Species</option>
              {uniqueSpecies.map(species => (
                <option key={species} value={species}>{species}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reptile-green focus:border-transparent outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="species">By Species</option>
              <option value="type">By Type</option>
            </select>

            {/* Export Button */}
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              📤 Export
            </button>
          </div>

          {/* Export Options */}
          {showExportOptions && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-800">Export as:</span>
                <button
                  onClick={() => handleExport('text')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  📄 Text File
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  🔧 JSON File
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-200"
                >
                  🖨️ Print
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-200"
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex h-[500px]">
          {/* Knowledge List */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            {filteredKnowledge.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No Knowledge Entries</h3>
                <p>Start asking questions about reptiles to build your knowledge log!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredKnowledge.map(entry => (
                  <div
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedEntry?.id === entry.id 
                        ? 'border-reptile-green bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{entry.species.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800 truncate">
                            {entry.species.name}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{entry.species.type}</p>
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          Q: {entry.question}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {entry.answer}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-wrap gap-1">
                            {entry.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEntry(entry.id);
                            }}
                            className="text-red-500 hover:text-red-700 text-sm transition-colors duration-200"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Entry Detail */}
          {selectedEntry && (
            <div className="w-96 border-l border-gray-200 p-4 overflow-y-auto scrollbar-thin">
              <div className="sticky top-0 bg-white pb-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedEntry.species.emoji} {selectedEntry.species.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {selectedEntry.species.type} • {new Date(selectedEntry.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Question</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedEntry.question}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Answer</h4>
                  <p className="text-gray-700 bg-white p-3 rounded-lg border">
                    {selectedEntry.answer}
                  </p>
                </div>

                {selectedEntry.funFact && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Fun Fact</h4>
                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      💡 {selectedEntry.funFact}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-reptile-green text-white text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleDeleteEntry(selectedEntry.id)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    🗑️ Delete Entry
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default KnowledgeLog;
