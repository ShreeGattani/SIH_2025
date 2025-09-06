export interface Planet {
  id: number;
  name: string;
  subject: 'science' | 'technology' | 'engineering' | 'mathematics';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  unlocked: boolean;
  completed: boolean;
  starsEarned: number;
  totalStars: number;
  lessons: Lesson[];
  xpReward: number;
  position: { x: number; y: number }; // Position on the space map
  icon: string; // Emoji for the planet
  color: string; // Tailwind color class
  requirements?: number[]; // IDs of planets that must be completed first
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  unlocked: boolean;
  xpReward: number;
  description: string;
  progress: number; // 0-100 percentage
  starsEarned: number;
  maxStars: number;
}

export interface StudentProgress {
  totalXP: number;
  currentLevel: number;
  xpToNextLevel: number;
  planetsCompleted: number;
  totalPlanets: number;
  achievements: Achievement[];
  rocketFuel: number; // 0-100 percentage
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  icon: string;
}

// Mock data for space learning journey
export const mockPlanets: Planet[] = [
  {
    id: 1,
    name: "Earth's Atmosphere",
    subject: "science",
    difficulty: "beginner",
    description: "Learn about the air around us and what makes weather happen!",
    unlocked: true,
    completed: true,
    starsEarned: 8,
    totalStars: 9,
    xpReward: 100,
    position: { x: 20, y: 30 },
    icon: "🌍",
    color: "blue",
    lessons: [
      { 
        id: 1, title: "What is the Atmosphere?", duration: "10 min", completed: true, 
        locked: false, unlocked: true, xpReward: 25, 
        description: "Discover the invisible shield around Earth", progress: 100, starsEarned: 3, maxStars: 3
      },
      { 
        id: 2, title: "Layers of the Sky", duration: "12 min", completed: true, 
        locked: false, unlocked: true, xpReward: 35, 
        description: "Explore troposphere, stratosphere and more!", progress: 100, starsEarned: 2, maxStars: 3
      },
      { 
        id: 3, title: "Weather and Clouds", duration: "15 min", completed: true, 
        locked: false, unlocked: true, xpReward: 40, 
        description: "How clouds form and create weather", progress: 100, starsEarned: 3, maxStars: 3
      }
    ]
  },
  {
    id: 2,
    name: "Luna Station",
    subject: "science",
    difficulty: "beginner",
    description: "Explore our closest neighbor in space and learn about moon phases!",
    unlocked: true,
    completed: true,
    starsEarned: 7,
    totalStars: 9,
    xpReward: 110,
    position: { x: 45, y: 20 },
    icon: "🌙",
    color: "gray",
    requirements: [1],
    lessons: [
      { 
        id: 4, title: "Moon Phases", duration: "8 min", completed: true, 
        locked: false, unlocked: true, xpReward: 30, 
        description: "Why does the moon change shape?", progress: 100, starsEarned: 3, maxStars: 3
      },
      { 
        id: 5, title: "Apollo Missions", duration: "14 min", completed: true, 
        locked: false, unlocked: true, xpReward: 45, 
        description: "The amazing journey to the moon", progress: 100, starsEarned: 2, maxStars: 3
      },
      { 
        id: 6, title: "Moon's Gravity", duration: "10 min", completed: false, 
        locked: false, unlocked: true, xpReward: 35, 
        description: "How gravity works on the moon", progress: 65, starsEarned: 2, maxStars: 3
      }
    ]
  },
  {
    id: 3,
    name: "Mars Colony",
    subject: "science",
    difficulty: "intermediate",
    description: "Journey to the red planet and discover what makes it special!",
    unlocked: true,
    completed: false,
    starsEarned: 3,
    totalStars: 9,
    xpReward: 135,
    position: { x: 70, y: 35 },
    icon: "🔴",
    color: "red",
    requirements: [2],
    lessons: [
      { 
        id: 7, title: "Why is Mars Red?", duration: "12 min", completed: true, 
        locked: false, unlocked: true, xpReward: 40, 
        description: "The secret of Mars' rusty color", progress: 100, starsEarned: 3, maxStars: 3
      },
      { 
        id: 8, title: "Mars Rovers", duration: "16 min", completed: false, 
        locked: false, unlocked: true, xpReward: 50, 
        description: "Robots exploring the red planet", progress: 30, starsEarned: 0, maxStars: 3
      },
      { 
        id: 9, title: "Life on Mars?", duration: "14 min", completed: false, 
        locked: true, unlocked: false, xpReward: 45, 
        description: "Could there be aliens on Mars?", progress: 0, starsEarned: 0, maxStars: 3
      }
    ]
  },
  {
    id: 4,
    name: "Jupiter Gas Giant",
    subject: "science",
    difficulty: "intermediate",
    description: "Explore the largest planet and its amazing moons!",
    unlocked: false,
    completed: false,
    starsEarned: 0,
    totalStars: 9,
    xpReward: 210,
    position: { x: 25, y: 65 },
    icon: "🪐",
    color: "orange",
    requirements: [3],
    lessons: [
      { 
        id: 10, title: "The Great Red Spot", duration: "15 min", completed: false, 
        locked: true, unlocked: false, xpReward: 60, 
        description: "A storm bigger than Earth!", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 11, title: "Jupiter's Moons", duration: "18 min", completed: false, 
        locked: true, unlocked: false, xpReward: 70, 
        description: "Discover Io, Europa, and more", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 12, title: "Gas Giant Secrets", duration: "20 min", completed: false, 
        locked: true, unlocked: false, xpReward: 80, 
        description: "What's inside Jupiter?", progress: 0, starsEarned: 0, maxStars: 3
      }
    ]
  },
  {
    id: 5,
    name: "Rocket Academy",
    subject: "engineering",
    difficulty: "advanced",
    description: "Learn how to build rockets and plan space missions!",
    unlocked: false,
    completed: false,
    starsEarned: 0,
    totalStars: 9,
    xpReward: 270,
    position: { x: 80, y: 70 },
    icon: "🚀",
    color: "purple",
    requirements: [4],
    lessons: [
      { 
        id: 13, title: "How Rockets Work", duration: "20 min", completed: false, 
        locked: true, unlocked: false, xpReward: 80, 
        description: "The science of rocket propulsion", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 14, title: "Rocket Design", duration: "25 min", completed: false, 
        locked: true, unlocked: false, xpReward: 100, 
        description: "Build your first rocket", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 15, title: "Space Missions", duration: "22 min", completed: false, 
        locked: true, unlocked: false, xpReward: 90, 
        description: "Planning trips to space", progress: 0, starsEarned: 0, maxStars: 3
      }
    ]
  },
  {
    id: 6,
    name: "Math Galaxy",
    subject: "mathematics",
    difficulty: "intermediate",
    description: "Use math to explore space and calculate cosmic distances!",
    unlocked: false,
    completed: false,
    starsEarned: 0,
    totalStars: 9,
    xpReward: 255,
    position: { x: 15, y: 80 },
    icon: "🔢",
    color: "yellow",
    requirements: [3],
    lessons: [
      { 
        id: 16, title: "Counting Light Years", duration: "18 min", completed: false, 
        locked: true, unlocked: false, xpReward: 75, 
        description: "How far is far in space?", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 17, title: "Orbital Math", duration: "22 min", completed: false, 
        locked: true, unlocked: false, xpReward: 85, 
        description: "Calculate planetary orbits", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 18, title: "Rocket Trajectories", duration: "25 min", completed: false, 
        locked: true, unlocked: false, xpReward: 95, 
        description: "Plot a course to the stars", progress: 0, starsEarned: 0, maxStars: 3
      }
    ]
  },
  {
    id: 7,
    name: "Tech Station",
    subject: "technology",
    difficulty: "advanced",
    description: "Discover the amazing technology that makes space exploration possible!",
    unlocked: false,
    completed: false,
    starsEarned: 0,
    totalStars: 10,
    xpReward: 320,
    position: { x: 60, y: 85 },
    icon: "🛰️",
    color: "cyan",
    requirements: [5, 6],
    lessons: [
      { 
        id: 19, title: "Satellites", duration: "20 min", completed: false, 
        locked: true, unlocked: false, xpReward: 90, 
        description: "How satellites help us every day", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 20, title: "Space Stations", duration: "25 min", completed: false, 
        locked: true, unlocked: false, xpReward: 110, 
        description: "Living in space", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 21, title: "Future Space Tech", duration: "30 min", completed: false, 
        locked: true, unlocked: false, xpReward: 120, 
        description: "What's next for space exploration?", progress: 0, starsEarned: 0, maxStars: 4
      }
    ]
  },
  {
    id: 8,
    name: "Black Hole Mystery",
    subject: "science",
    difficulty: "advanced",
    description: "Explore the most mysterious objects in the universe!",
    unlocked: false,
    completed: false,
    starsEarned: 0,
    totalStars: 9,
    xpReward: 345,
    position: { x: 90, y: 15 },
    icon: "🕳️",
    color: "black",
    requirements: [7],
    lessons: [
      { 
        id: 22, title: "What are Black Holes?", duration: "25 min", completed: false, 
        locked: true, unlocked: false, xpReward: 100, 
        description: "The ultimate space mystery", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 23, title: "Event Horizon", duration: "28 min", completed: false, 
        locked: true, unlocked: false, xpReward: 120, 
        description: "The point of no return", progress: 0, starsEarned: 0, maxStars: 3
      },
      { 
        id: 24, title: "Space-Time Warping", duration: "30 min", completed: false, 
        locked: true, unlocked: false, xpReward: 125, 
        description: "How black holes bend reality", progress: 0, starsEarned: 0, maxStars: 3
      }
    ]
  }
];

export const mockStudentProgress: StudentProgress = {
  totalXP: 310,
  currentLevel: 3,
  xpToNextLevel: 190,
  planetsCompleted: 2,
  totalPlanets: 8,
  rocketFuel: 65,
  achievements: [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      earned: true,
      earnedDate: "2024-01-15",
      icon: "👶"
    },
    {
      id: 2,
      title: "Planet Explorer",
      description: "Complete your first planet",
      earned: true,
      earnedDate: "2024-01-18",
      icon: "🌍"
    },
    {
      id: 3,
      title: "Moon Walker",
      description: "Explore Luna Station",
      earned: true,
      earnedDate: "2024-01-22",
      icon: "🌙"
    },
    {
      id: 4,
      title: "Red Planet Pioneer",
      description: "Start exploring Mars",
      earned: true,
      earnedDate: "2024-01-25",
      icon: "🔴"
    },
    {
      id: 5,
      title: "Star Collector",
      description: "Earn 15 stars",
      earned: false,
      icon: "⭐"
    }
  ]
};
