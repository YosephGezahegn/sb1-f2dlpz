"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Check, Image as ImageIcon, Clock, Flame } from "lucide-react";
import { WorkoutTimer } from "./WorkoutTimer";
import { ExerciseReplacement } from "./ExerciseReplacement";
import { exercises } from "@/lib/exercises";
import { calculateCaloriesBurned } from "@/lib/utils";
import type { Exercise, WorkoutDay as WorkoutDayType } from "@/lib/types";

interface WorkoutDayProps {
  day: string;
  workoutData: WorkoutDayType;
  onExerciseComplete: (exerciseName: string) => void;
  onExerciseReplace: (oldExercise: string, newExercise: Exercise) => void;
  completedExercises: Set<string>;
}

export default function WorkoutDay({ 
  day, 
  workoutData, 
  onExerciseComplete,
  onExerciseReplace,
  completedExercises 
}: WorkoutDayProps) {
  const progress = Math.round(
    (completedExercises.size / workoutData.exercises.length) * 100
  );

  const getExerciseDetails = (exerciseName: string) => {
    return exercises.find(e => e.name === exerciseName);
  };

  // Calculate total workout time
  const totalWorkoutTime = workoutData.exercises.reduce((total, exercise) => {
    return total + (exercise.duration || 5);
  }, 10); // Add 10 minutes for warm-up

  // Calculate total calories burned
  const totalCalories = calculateCaloriesBurned(workoutData.exercises);
  const warmupCalories = Math.round((150 / 60) * 10); // Assuming 150 calories/hour for warm-up
  const totalCaloriesBurned = totalCalories + warmupCalories;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold capitalize">{day}</h2>
        <p className="text-muted-foreground">{workoutData.focus}</p>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="w-full" />
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Total Time: {totalWorkoutTime} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            <span>Total Calories: {totalCaloriesBurned} kcal</span>
          </div>
        </div>
      </div>

      <Card className="bg-muted p-4 space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Warm-up</h3>
          <p>{workoutData.warmup.activity}: {workoutData.warmup.duration}</p>
        </div>
        <WorkoutTimer 
          duration={10} 
          onComplete={() => {}} 
          label="Warm-up Timer"
        />
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {workoutData.exercises.map((exercise, index) => {
          const exerciseDetails = getExerciseDetails(exercise.name);
          const exerciseCalories = Math.round(
            (exerciseDetails?.calorieBurnPerHour || 0) / 60 * (exercise.duration || 5)
          );

          return (
            <AccordionItem key={index} value={`exercise-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onExerciseComplete(exercise.name);
                    }}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border ${
                      completedExercises.has(exercise.name)
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Check className={`h-4 w-4 ${
                      completedExercises.has(exercise.name) ? "" : "opacity-50"
                    }`} />
                  </div>
                  <div className="flex flex-col">
                    <span>{exercise.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {exerciseCalories} kcal • {exercise.duration || 5} min
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  <WorkoutTimer 
                    duration={exercise.duration || 5} 
                    onComplete={() => onExerciseComplete(exercise.name)}
                    label={`${exercise.name} Timer`}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Sets: {exercise.sets}</p>
                      <p className="font-medium">Reps: {exercise.reps}</p>
                      {exerciseDetails && (
                        <div className="mt-2 text-sm">
                          <p className="text-muted-foreground">Primary: {exerciseDetails.primaryMuscles.join(", ")}</p>
                          {exerciseDetails.secondaryMuscles.length > 0 && (
                            <p className="text-muted-foreground">Secondary: {exerciseDetails.secondaryMuscles.join(", ")}</p>
                          )}
                        </div>
                      )}
                    </div>
                    {exerciseDetails?.imageLinks?.[0] ? (
                      <div className="relative h-32 w-full rounded-lg overflow-hidden">
                        <Image
                          src={exerciseDetails.imageLinks[0]}
                          alt={exercise.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 bg-muted rounded-lg">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground">{exercise.description}</p>
                  
                  <ExerciseReplacement
                    currentExercise={exercise.name}
                    onReplace={(newExercise) => onExerciseReplace(exercise.name, newExercise)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {workoutData.cardio && (
        <Card className="bg-muted p-4">
          <h3 className="font-semibold mb-2">Cardio</h3>
          <p>{workoutData.cardio.activity}: {workoutData.cardio.duration}</p>
          {workoutData.cardio.description && (
            <p className="text-sm text-muted-foreground mt-2">
              {workoutData.cardio.description}
            </p>
          )}
        </Card>
      )}
    </div>
  );
}