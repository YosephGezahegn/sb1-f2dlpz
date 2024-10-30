export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  description: string;
  imageUrl?: string;
  alternatives?: string[];
}

export interface WorkoutDay {
  focus: string;
  warmup: {
    activity: string;
    duration: string;
  };
  exercises: Exercise[];
  cardio?: {
    activity: string;
    duration: string;
    description?: string;
  };
  isRestDay?: boolean;
}

export interface WorkoutData {
  [key: string]: WorkoutDay;
}

export interface WorkoutProgress {
  date: string;
  completedExercises: string[];
}