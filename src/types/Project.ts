export interface Project {
  name: string;
  link: string;
  description: string;
  image?: string;
  technologies: string[];
  active: boolean;
  pinned: boolean;
}
