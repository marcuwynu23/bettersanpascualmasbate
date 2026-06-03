export interface PublicRecord {
  id: string;
  title: string;
  number: string;
  category: 'Ordinance' | 'Resolution' | 'Executive Order' | 'Annual Budget';
  date: string;
  summary: string;
  status: 'Active' | 'Enacted' | 'Approved' | 'Under Review';
  fileSize?: string;
}

export interface Landmark {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  category: 'Nature' | 'Historical' | 'Adventure' | 'Cultural';
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface EmergencyContact {
  id: string;
  agency: string;
  number: string;
  description: string;
  icon: string;
  type: 'Local' | 'National';
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  sector: 'Health' | 'Education' | 'Business' | 'Social Welfare' | 'Agriculture & Tourism';
  icon: string;
  details: string[];
}

export interface MayorHistory {
  id: string;
  name: string;
  term: string;
  accomplishments: string[];
  milestones: string[];
  biography: string;
  status: 'Incumbent' | 'Past';
}

export interface BarangayHistory {
  id: string;
  name: string;
  captain: string;
  termStart: string;
  history: string;
  livelihood: string[];
  population: string;
  pastCaptains: string[];
  coastal: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: never; // Using any for LucideIcon to avoid circular dependency or import issues in types
}

export interface PopulationYear {
  year: number;
  count: number;
}

