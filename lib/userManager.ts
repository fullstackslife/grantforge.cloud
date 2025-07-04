export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  plan: 'free' | 'pro' | 'agency';
  usage: {
    grantsSaved: number;
    proposalsGenerated: number;
    apiCalls: number;
  };
  createdAt: string;
  lastActive: string;
}

export interface GeneratedProposal {
  id: string;
  userId: string;
  projectName: string;
  description: string;
  fundingAmount: string;
  targetAudience: string;
  impact: string;
  proposal: string;
  createdAt: string;
}

export interface SavedGrant {
  id: string;
  userId: string;
  grantId: string;
  savedAt: string;
}

class UserManager {
  private getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('grantforge_users');
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('grantforge_users', JSON.stringify(users));
  }

  private getProposals(): GeneratedProposal[] {
    if (typeof window === 'undefined') return [];
    const proposals = localStorage.getItem('grantforge_proposals');
    return proposals ? JSON.parse(proposals) : [];
  }

  private saveProposals(proposals: GeneratedProposal[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('grantforge_proposals', JSON.stringify(proposals));
  }

  private getSavedGrants(): SavedGrant[] {
    if (typeof window === 'undefined') return [];
    const savedGrants = localStorage.getItem('grantforge_saved_grants');
    return savedGrants ? JSON.parse(savedGrants) : [];
  }

  private saveSavedGrants(savedGrants: SavedGrant[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('grantforge_saved_grants', JSON.stringify(savedGrants));
  }

  // User Management
  createUser(userData: Omit<User, 'id' | 'createdAt' | 'lastActive' | 'usage'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      usage: {
        grantsSaved: 0,
        proposalsGenerated: 0,
        apiCalls: 0,
      },
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };
    
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  getUser(userId: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.id === userId) || null;
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) return null;
    
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      lastActive: new Date().toISOString(),
    };
    
    this.saveUsers(users);
    return users[userIndex];
  }

  // Proposal Management
  saveProposal(userId: string, proposalData: Omit<GeneratedProposal, 'id' | 'userId' | 'createdAt'>): GeneratedProposal {
    const proposals = this.getProposals();
    const newProposal: GeneratedProposal = {
      ...proposalData,
      id: `proposal_${Date.now()}`,
      userId,
      createdAt: new Date().toISOString(),
    };
    
    proposals.push(newProposal);
    this.saveProposals(proposals);
    
    // Update user usage
    this.updateUser(userId, {
      usage: {
        grantsSaved: this.getUser(userId)?.usage.grantsSaved || 0,
        proposalsGenerated: (this.getUser(userId)?.usage.proposalsGenerated || 0) + 1,
        apiCalls: (this.getUser(userId)?.usage.apiCalls || 0) + 1,
      }
    });
    
    return newProposal;
  }

  getUserProposals(userId: string): GeneratedProposal[] {
    const proposals = this.getProposals();
    return proposals.filter(proposal => proposal.userId === userId);
  }

  // Grant Management
  saveGrant(userId: string, grantId: string): SavedGrant {
    const savedGrants = this.getSavedGrants();
    const newSavedGrant: SavedGrant = {
      id: `saved_${Date.now()}`,
      userId,
      grantId,
      savedAt: new Date().toISOString(),
    };
    
    savedGrants.push(newSavedGrant);
    this.saveSavedGrants(savedGrants);
    
    // Update user usage
    this.updateUser(userId, {
      usage: {
        grantsSaved: (this.getUser(userId)?.usage.grantsSaved || 0) + 1,
        proposalsGenerated: this.getUser(userId)?.usage.proposalsGenerated || 0,
        apiCalls: this.getUser(userId)?.usage.apiCalls || 0,
      }
    });
    
    return newSavedGrant;
  }

  getUserSavedGrants(userId: string): SavedGrant[] {
    const savedGrants = this.getSavedGrants();
    return savedGrants.filter(savedGrant => savedGrant.userId === userId);
  }

  // Development helpers
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const currentUserId = localStorage.getItem('grantforge_current_user');
    return currentUserId ? this.getUser(currentUserId) : null;
  }

  setCurrentUser(userId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('grantforge_current_user', userId);
  }

  // Clear all stored user data
  clearAllData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('grantforge_users');
    localStorage.removeItem('grantforge_proposals');
    localStorage.removeItem('grantforge_saved_grants');
    localStorage.removeItem('grantforge_current_user');
  }

  // Initialize demo user for development
  initializeDemoUser(): User {
    const demoUser = this.createUser({
      name: 'Demo User',
      email: 'demo@example.com',
      organization: 'Demo Organization',
      plan: 'pro',
    });
    
    this.setCurrentUser(demoUser.id);
    return demoUser;
  }
}

export const userManager = new UserManager(); 