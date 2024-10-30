export interface Exercise {
  name: string;
  force: string | null;
  level: string;
  mechanic: string | null;
  equipment: string | null;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  linkName: string;
  imageLinks: string[];
  calorieBurnPerHour: number;
}

export interface WorkoutDay {
  focus: string;
  warmup: {
    activity: string;
    duration: string;
  };
  exercises: WorkoutExercise[];
  cardio?: {
    activity: string;
    duration: string;
    description?: string;
  };
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  description: string;
  duration?: number; // in minutes
}

export interface WorkoutProgress {
  date: string;
  completedExercises: string[];
  caloriesBurned: number;
}

export interface FilterOptions {
  force: string[];
  level: string[];
  mechanic: string[];
  equipment: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  category: string[];
}