import { create } from 'zustand';
import { Project } from '../types';

interface PortfolioState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  projectSearch: string;
  setProjectSearch: (search: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  activeWorkCategory: string;
  setActiveWorkCategory: (category: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  projectSearch: '',
  setProjectSearch: (search) => set({ projectSearch: search }),
  selectedTag: 'Todos',
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  activeWorkCategory: 'Todos',
  setActiveWorkCategory: (category) => set({ activeWorkCategory: category }),
}));
