export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  tags: string[];
  features?: string[];
  role?: string;
  year?: string;
}

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  date?: string;
  tags?: string[];
  link?: string;
}
