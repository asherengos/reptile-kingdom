// Achievement Service for Reptile Info Tablet
// Tracks user progress and awards badges for learning achievements

class AchievementService {
  constructor() {
    this.storageKey = 'reptile_achievements';
    this.progressKey = 'reptile_progress';
    this.initStorage();
  }

  // Initialize storage
  initStorage() {
    try {
      if (!localStorage.getItem(this.storageKey)) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.getDefaultAchievements()));
      }
      if (!localStorage.getItem(this.progressKey)) {
        localStorage.setItem(this.progressKey, JSON.stringify(this.getDefaultProgress()));
      }
    } catch (error) {
      console.warn('Could not initialize achievement storage:', error);
    }
  }

  // Get default achievements
  getDefaultAchievements() {
    return {
      'first_question': {
        id: 'first_question',
        name: 'Curious Explorer',
        description: 'Ask your first question to the AI',
        icon: '🤔',
        category: 'engagement',
        unlocked: false,
        unlockedAt: null
      },
      'first_save': {
        id: 'first_save',
        name: 'Knowledge Collector',
        description: 'Save your first care tip',
        icon: '💾',
        category: 'knowledge',
        unlocked: false,
        unlockedAt: null
      },
      'quiz_master': {
        id: 'quiz_master',
        name: 'Quiz Master',
        description: 'Complete 5 quizzes with perfect scores',
        icon: '🏆',
        category: 'learning',
        unlocked: false,
        unlockedAt: null,
        progress: 0,
        target: 5
      },
      'species_explorer': {
        id: 'species_explorer',
        name: 'Species Explorer',
        description: 'Learn about all 5 reptile species',
        icon: '🗺️',
        category: 'exploration',
        unlocked: false,
        unlockedAt: null,
        progress: 0,
        target: 5
      },
      'care_expert': {
        id: 'care_expert',
        name: 'Care Expert',
        description: 'Save 10 care tips',
        icon: '👨‍⚕️',
        category: 'knowledge',
        unlocked: false,
        unlockedAt: null,
        progress: 0,
        target: 10
      },
      'daily_learner': {
        id: 'daily_learner',
        name: 'Daily Learner',
        description: 'Use the tablet for 3 consecutive days',
        icon: '📅',
        category: 'engagement',
        unlocked: false,
        unlockedAt: null,
        progress: 0,
        target: 3
      },
      'perfect_score': {
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Get 100% on any species quiz',
        icon: '⭐',
        category: 'learning',
        unlocked: false,
        unlockedAt: null
      },
      'knowledge_architect': {
        id: 'knowledge_architect',
        name: 'Knowledge Architect',
        description: 'Export your knowledge log',
        icon: '📤',
        category: 'knowledge',
        unlocked: false,
        unlockedAt: null
      },
      'reptile_whisperer': {
        id: 'reptile_whisperer',
        name: 'Reptile Whisperer',
        description: 'Complete quizzes for all species',
        icon: '🐍',
        category: 'learning',
        unlocked: false,
        unlockedAt: null,
        progress: 0,
        target: 5
      },
      'dedicated_student': {
        id: 'dedicated_student',
        name: 'Dedicated Student',
        description: 'Spend 30 minutes learning about reptiles',
        icon: '⏰',
        category: 'engagement',
        unlocked: false,
        unlockedAt: null,
        progress: 0,
        target: 30
      }
    };
  }

  // Get default progress tracking
  getDefaultProgress() {
    return {
      totalQuestions: 0,
      totalSaves: 0,
      totalQuizzes: 0,
      perfectQuizzes: 0,
      speciesViewed: new Set(),
      totalTimeSpent: 0,
      lastVisit: null,
      consecutiveDays: 0,
      currentStreak: 0,
      longestStreak: 0,
      knowledgeArchitect: 0
    };
  }

  // Get all achievements
  getAchievements() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : this.getDefaultAchievements();
    } catch (error) {
      console.error('Error retrieving achievements:', error);
      return this.getDefaultAchievements();
    }
  }

  // Get user progress
  getProgress() {
    try {
      const stored = localStorage.getItem(this.progressKey);
      return stored ? JSON.parse(stored) : this.getDefaultProgress();
    } catch (error) {
      console.error('Error retrieving progress:', error);
      return this.getDefaultProgress();
    }
  }

  // Update progress and check for achievements
  updateProgress(updateData) {
    try {
      const progress = this.getProgress();
      const achievements = this.getAchievements();
      let newAchievements = [];

      // Update progress
      Object.keys(updateData).forEach(key => {
        if (progress.hasOwnProperty(key)) {
          if (key === 'speciesViewed') {
            progress[key] = new Set([...progress[key], ...updateData[key]]);
          } else if (typeof progress[key] === 'number') {
            progress[key] += updateData[key];
          } else {
            progress[key] = updateData[key];
          }
        }
      });

      // Update last visit and consecutive days
      const today = new Date().toDateString();
      if (progress.lastVisit !== today) {
        if (progress.lastVisit) {
          const lastVisit = new Date(progress.lastVisit);
          const daysDiff = Math.floor((new Date() - lastVisit) / (1000 * 60 * 60 * 24));
          
          if (daysDiff === 1) {
            progress.currentStreak++;
          } else if (daysDiff > 1) {
            progress.currentStreak = 1;
          }
        } else {
          progress.currentStreak = 1;
        }
        
        progress.lastVisit = today;
        progress.consecutiveDays = Math.max(progress.consecutiveDays, progress.currentStreak);
        progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
      }

      // Check for achievements
      newAchievements = this.checkAchievements(progress, achievements);

      // Save updated progress and achievements
      localStorage.setItem(this.progressKey, JSON.stringify(progress));
      localStorage.setItem(this.storageKey, JSON.stringify(achievements));

      // Trigger achievement events
      newAchievements.forEach(achievement => {
        window.dispatchEvent(new CustomEvent('achievementUnlocked', { 
          detail: { achievement: achievement } 
        }));
      });

      return { progress, newAchievements };
    } catch (error) {
      console.error('Error updating progress:', error);
      return { progress: this.getDefaultProgress(), newAchievements: [] };
    }
  }

  // Check for new achievements
  checkAchievements(progress, achievements) {
    const newAchievements = [];

    // First question
    if (progress.totalQuestions >= 1 && !achievements.first_question.unlocked) {
      achievements.first_question.unlocked = true;
      achievements.first_question.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.first_question);
    }

    // First save
    if (progress.totalSaves >= 1 && !achievements.first_save.unlocked) {
      achievements.first_save.unlocked = true;
      achievements.first_save.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.first_save);
    }

    // Quiz master
    if (progress.perfectQuizzes >= 5 && !achievements.quiz_master.unlocked) {
      achievements.quiz_master.unlocked = true;
      achievements.quiz_master.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.quiz_master);
    }

    // Species explorer
    if (progress.speciesViewed.size >= 5 && !achievements.species_explorer.unlocked) {
      achievements.species_explorer.unlocked = true;
      achievements.species_explorer.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.species_explorer);
    }

    // Care expert
    if (progress.totalSaves >= 10 && !achievements.care_expert.unlocked) {
      achievements.care_expert.unlocked = true;
      achievements.care_expert.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.care_expert);
    }

    // Daily learner
    if (progress.consecutiveDays >= 3 && !achievements.daily_learner.unlocked) {
      achievements.daily_learner.unlocked = true;
      achievements.daily_learner.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.daily_learner);
    }

    // Reptile whisperer
    if (progress.speciesViewed.size >= 5 && !achievements.reptile_whisperer.unlocked) {
      achievements.reptile_whisperer.unlocked = true;
      achievements.reptile_whisperer.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.reptile_whisperer);
    }

    // Knowledge architect
    if (progress.knowledgeArchitect >= 1 && !achievements.knowledge_architect.unlocked) {
      achievements.knowledge_architect.unlocked = true;
      achievements.knowledge_architect.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.knowledge_architect);
    }

    // Dedicated student
    if (progress.totalTimeSpent >= 30 && !achievements.dedicated_student.unlocked) {
      achievements.dedicated_student.unlocked = true;
      achievements.dedicated_student.unlockedAt = new Date().toISOString();
      newAchievements.push(achievements.dedicated_student);
    }

    return newAchievements;
  }

  // Unlock specific achievement
  unlockAchievement(achievementId) {
    try {
      const achievements = this.getAchievements();
      if (achievements[achievementId] && !achievements[achievementId].unlocked) {
        achievements[achievementId].unlocked = true;
        achievements[achievementId].unlockedAt = new Date().toISOString();
        
        localStorage.setItem(this.storageKey, JSON.stringify(achievements));
        
        window.dispatchEvent(new CustomEvent('achievementUnlocked', { 
          detail: { achievement: achievements[achievementId] } 
        }));
        
        return achievements[achievementId];
      }
      return null;
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      return null;
    }
  }

  // Get achievement statistics
  getAchievementStats() {
    try {
      const achievements = this.getAchievements();
      const progress = this.getProgress();
      
      const totalAchievements = Object.keys(achievements).length;
      const unlockedAchievements = Object.values(achievements).filter(a => a.unlocked).length;
      const completionRate = Math.round((unlockedAchievements / totalAchievements) * 100);
      
      return {
        total: totalAchievements,
        unlocked: unlockedAchievements,
        locked: totalAchievements - unlockedAchievements,
        completionRate: completionRate,
        progress: progress
      };
    } catch (error) {
      console.error('Error getting achievement stats:', error);
      return null;
    }
  }

  // Reset all achievements and progress
  resetAll() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.getDefaultAchievements()));
      localStorage.setItem(this.progressKey, JSON.stringify(this.getDefaultProgress()));
      
      window.dispatchEvent(new CustomEvent('achievementsReset'));
      
      return true;
    } catch (error) {
      console.error('Error resetting achievements:', error);
      return false;
    }
  }

  // Get achievements by category
  getAchievementsByCategory(category) {
    const achievements = this.getAchievements();
    return Object.values(achievements).filter(a => a.category === category);
  }

  // Get recent achievements
  getRecentAchievements(limit = 5) {
    const achievements = this.getAchievements();
    const unlocked = Object.values(achievements)
      .filter(a => a.unlocked)
      .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt));
    
    return unlocked.slice(0, limit);
  }
}

export default new AchievementService();
