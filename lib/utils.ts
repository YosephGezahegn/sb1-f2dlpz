import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { WorkoutExercise } from "./types";
import { exercises } from "./exercises";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateCaloriesBurned(
  workoutExercises: WorkoutExercise[],
  bodyWeight: number = 70 // default weight in kg
): number {
  return workoutExercises.reduce((total, workoutExercise) => {
    const exercise = exercises.find(e => e.name === workoutExercise.name);
    if (!exercise) return total;

    const setDuration = 1; // average time per set in minutes
    const totalDuration = workoutExercise.sets * setDuration;
    const caloriesPerHour = exercise.calorieBurnPerHour || 0;
    const caloriesPerMinute = caloriesPerHour / 60;
    
    return total + (caloriesPerMinute * totalDuration);
  }, 0);
}