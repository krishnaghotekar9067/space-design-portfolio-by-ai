/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  spanClass: string;
  aspectRatioClass: string;
  tags: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  imageUrl: string;
  readTime: string;
  date: string;
  category: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rotation: string; // e.g. "rotate-3" or "-rotate-6"
  parallaxSpeed: number; // custom scale factor
}

export interface StatItem {
  value: string;
  label: string;
}

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Automotive Motion",
    subtitle: "High-frequency interaction choreography for automotive telematics",
    imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-7",
    aspectRatioClass: "aspect-video md:aspect-auto md:h-[450px]",
    tags: ["Product Design", "Interactive", "WebGL"]
  },
  {
    id: "proj-2",
    title: "Urban Architecture",
    subtitle: "A digital canvas cataloguing structural spaces across Nagpur, India",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-5",
    aspectRatioClass: "aspect-square md:aspect-auto md:h-[450px]",
    tags: ["Creative Direction", "Web Client"]
  },
  {
    id: "proj-3",
    title: "Human Perspective",
    subtitle: "Experiential portraiture focusing on extreme lighting contrasts",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-5",
    aspectRatioClass: "aspect-square md:aspect-auto md:h-[450px]",
    tags: ["Fine Art", "Creative Direction"]
  },
  {
    id: "proj-4",
    title: "Brand Identity",
    subtitle: "Generative fluid assets mapping identity through liquid form",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-7",
    aspectRatioClass: "aspect-video md:aspect-auto md:h-[450px]",
    tags: ["Identity", "Generative Art", "Branding"]
  }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "journal-1",
    title: "The Anatomy of Light in Urban Spaces",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
    readTime: "5 min read",
    date: "May 20, 2026",
    category: "Space"
  },
  {
    id: "journal-2",
    title: "Designing for the Third Dimension: Spatial Interfaces",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop",
    readTime: "8 min read",
    date: "May 08, 2026",
    category: "Interaction"
  },
  {
    id: "journal-3",
    title: "Minimizing Friction in Motion Choreography",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop",
    readTime: "4 min read",
    date: "Apr 25, 2026",
    category: "Motion"
  },
  {
    id: "journal-4",
    title: "The Quiet Rise of Instrument Typography",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop",
    readTime: "6 min read",
    date: "Apr 12, 2026",
    category: "Design"
  }
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "Warm Abstract Study",
    description: "An inquiry into pigment warmth and organic paint flows.",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-2",
    parallaxSpeed: -30
  },
  {
    id: "exp-2",
    title: "Cybernetic Light Emission",
    description: "Measuring light pollution in modern computing boxes.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    rotation: "-rotate-3",
    parallaxSpeed: 45
  },
  {
    id: "exp-3",
    title: "Liquid Glass Curvature",
    description: "Ray-marched simulation of iridescent glass structures.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-6",
    parallaxSpeed: -15
  },
  {
    id: "exp-4",
    title: "Brutalist Shadow Grids",
    description: "Capturing the stark contrast of industrial concrete projections.",
    imageUrl: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=600&auto=format&fit=crop",
    rotation: "-rotate-2",
    parallaxSpeed: 30
  },
  {
    id: "exp-5",
    title: "Nightglow Screen Contrast",
    description: "Illuminating skin tones using raw terminal display luminance.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-4",
    parallaxSpeed: -25
  },
  {
    id: "exp-6",
    title: "Integrated Silicon Architecture",
    description: "Analyzing logic gate patterns across retro processor designs.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    rotation: "-rotate-4",
    parallaxSpeed: 50
  }
];

export const STATS: StatItem[] = [
  {
    value: "20+",
    label: "Years Experience"
  },
  {
    value: "95+",
    label: "Projects Done"
  },
  {
    value: "200%",
    label: "Satisfied Clients"
  }
];
