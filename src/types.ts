export type Theme = 'light' | 'dark';

export interface SkillItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'core' | 'ai-data' | 'mindset';
  description: string;
  concepts: string[];
  codeHighlight?: string;
  accent: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  technologies: string[];
  description: string;
  keyOutcomes: string[];
  sampleCode: string;
  codeLanguage: string;
  terminalOutput: string;
  badgeColor: string;
}

export interface TimelineNode {
  year: string;
  title: string;
  organization?: string;
  focus: string;
  details: string[];
  status: 'completed' | 'current' | 'future';
}

export interface CodeLabSnippet {
  id: 'learning' | 'building' | 'solving' | 'debugging';
  label: string;
  fileName: string;
  code: string;
  output: string;
  executionTime: string;
  description: string;
}

export interface InterestTag {
  id: string;
  label: string;
  category: string;
  curiosityNote: string;
  iconName?: string;
}
