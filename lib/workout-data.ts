import type { WorkoutDay } from './types';

export const workoutData: Record<string, WorkoutDay> = {
  monday: {
    focus: "Upper Body (Chest & Triceps) + Cardio",
    warmup: {
      activity: "Treadmill",
      duration: "10 minutes of brisk walking or light jogging",
    },
    exercises: [
      {
        name: "Barbell Bench Press",
        sets: 4,
        reps: "10-12",
        description: "Perform with proper form, focusing on chest engagement",
      },
      {
        name: "Dumbbell Shoulder Press",
        sets: 3,
        reps: "10-12",
        description: "Keep core tight and maintain control throughout",
      },
      {
        name: "Ab Crunch Machine",
        sets: 3,
        reps: "15-20",
        description: "Focus on controlled movement and abdominal contraction",
      }
    ],
    cardio: {
      activity: "Elliptical or Stationary Bike",
      duration: "15 minutes at moderate intensity",
    },
  },
  // Add other days as needed
};