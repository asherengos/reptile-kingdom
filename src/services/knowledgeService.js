// Knowledge Service for Reptile Info Tablet
// This service handles saving, retrieving, and managing AI responses for offline access

class KnowledgeService {
  constructor() {
    this.storageKey = 'reptile_knowledge_log';
    this.maxEntries = 100; // Prevent storage from growing too large
    this.initStorage();
  }

  // Initialize storage and migrate old data if needed
  initStorage() {
    try {
      const existing = localStorage.getItem(this.storageKey);
      if (!existing) {
        localStorage.setItem(this.storageKey, JSON.stringify([]));
      }
    } catch (error) {
      console.warn('Could not initialize knowledge storage:', error);
    }
  }

  // Save a new AI response to the knowledge log
  saveResponse(speciesData, question, aiResponse) {
    try {
      const knowledgeEntry = {
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        species: {
          name: speciesData.name,
          type: speciesData.type,
          emoji: speciesData.emoji
        },
        question: question,
        answer: aiResponse.answer,
        funFact: aiResponse.funFact,
        source: aiResponse.source,
        tags: this.generateTags(question, speciesData)
      };

      const existingLog = this.getKnowledgeLog();
      existingLog.unshift(knowledgeEntry); // Add to beginning

      // Keep only the most recent entries
      if (existingLog.length > this.maxEntries) {
        existingLog.splice(this.maxEntries);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(existingLog));
      
      // Trigger storage event for other components
      window.dispatchEvent(new CustomEvent('knowledgeUpdated', { 
        detail: { action: 'saved', entry: knowledgeEntry } 
      }));

      return true;
    } catch (error) {
      console.error('Error saving knowledge entry:', error);
      return false;
    }
  }

  // Retrieve all saved knowledge entries
  getKnowledgeLog() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving knowledge log:', error);
      return [];
    }
  }

  // Get knowledge entries for a specific species
  getSpeciesKnowledge(speciesName) {
    const log = this.getKnowledgeLog();
    return log.filter(entry => 
      entry.species.name.toLowerCase() === speciesName.toLowerCase()
    );
  }

  // Search knowledge log by tags or text
  searchKnowledge(query) {
    const log = this.getKnowledgeLog();
    const queryLower = query.toLowerCase();
    
    return log.filter(entry => 
      entry.question.toLowerCase().includes(queryLower) ||
      entry.answer.toLowerCase().includes(queryLower) ||
      entry.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
      entry.species.name.toLowerCase().includes(queryLower)
    );
  }

  // Delete a specific knowledge entry
  deleteEntry(entryId) {
    try {
      const log = this.getKnowledgeLog();
      const filteredLog = log.filter(entry => entry.id !== entryId);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredLog));
      
      // Trigger storage event
      window.dispatchEvent(new CustomEvent('knowledgeUpdated', { 
        detail: { action: 'deleted', entryId: entryId } 
      }));
      
      return true;
    } catch (error) {
      console.error('Error deleting knowledge entry:', error);
      return false;
    }
  }

  // Clear all knowledge entries
  clearAllKnowledge() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
      
      window.dispatchEvent(new CustomEvent('knowledgeUpdated', { 
        detail: { action: 'cleared' } 
      }));
      
      return true;
    } catch (error) {
      console.error('Error clearing knowledge log:', error);
      return false;
    }
  }

  // Export knowledge log as formatted text
  exportKnowledgeLog() {
    const log = this.getKnowledgeLog();
    if (log.length === 0) {
      return 'No knowledge entries to export.';
    }

    let exportText = '🦎 Reptile Care Knowledge Log\n';
    exportText += 'Generated on: ' + new Date().toLocaleDateString() + '\n';
    exportText += 'Total entries: ' + log.length + '\n\n';
    exportText += '='.repeat(50) + '\n\n';

    log.forEach((entry, index) => {
      exportText += `${index + 1}. ${entry.species.emoji} ${entry.species.name} (${entry.species.type})\n`;
      exportText += `Question: ${entry.question}\n`;
      exportText += `Answer: ${entry.answer}\n`;
      if (entry.funFact) {
        exportText += `Fun Fact: ${entry.funFact}\n`;
      }
      exportText += `Date: ${new Date(entry.timestamp).toLocaleDateString()}\n`;
      exportText += `Tags: ${entry.tags.join(', ')}\n`;
      exportText += '-'.repeat(30) + '\n\n';
    });

    return exportText;
  }

  // Export as JSON for data backup
  exportAsJSON() {
    try {
      const log = this.getKnowledgeLog();
      const exportData = {
        exportDate: new Date().toISOString(),
        version: '1.0',
        totalEntries: log.length,
        entries: log
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting as JSON:', error);
      return null;
    }
  }

  // Get storage statistics
  getStorageStats() {
    try {
      const log = this.getKnowledgeLog();
      const speciesCount = new Set(log.map(entry => entry.species.name)).size;
      const totalSize = new Blob([JSON.stringify(log)]).size;
      
      return {
        totalEntries: log.length,
        uniqueSpecies: speciesCount,
        storageSize: totalSize,
        storageSizeFormatted: this.formatBytes(totalSize),
        lastUpdated: log.length > 0 ? log[0].timestamp : null
      };
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return null;
    }
  }

  // Generate tags for better searchability
  generateTags(question, speciesData) {
    const tags = [];
    
    // Add species-specific tags
    tags.push(speciesData.type.toLowerCase());
    tags.push(speciesData.name.toLowerCase());
    
    // Add question-based tags
    const questionLower = question.toLowerCase();
    if (questionLower.includes('feed') || questionLower.includes('food')) {
      tags.push('feeding', 'diet');
    }
    if (questionLower.includes('temp') || questionLower.includes('heat')) {
      tags.push('temperature', 'heating');
    }
    if (questionLower.includes('humid')) {
      tags.push('humidity');
    }
    if (questionLower.includes('tank') || questionLower.includes('enclosure')) {
      tags.push('habitat', 'enclosure');
    }
    if (questionLower.includes('health') || questionLower.includes('sick')) {
      tags.push('health', 'care');
    }
    if (questionLower.includes('handle')) {
      tags.push('handling');
    }
    
    return [...new Set(tags)]; // Remove duplicates
  }

  // Generate unique ID for entries
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Format bytes for human-readable storage size
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Check if an entry already exists (prevent duplicates)
  isDuplicate(speciesName, question) {
    const log = this.getKnowledgeLog();
    return log.some(entry => 
      entry.species.name.toLowerCase() === speciesName.toLowerCase() &&
      entry.question.toLowerCase() === question.toLowerCase()
    );
  }
}

export default new KnowledgeService();
