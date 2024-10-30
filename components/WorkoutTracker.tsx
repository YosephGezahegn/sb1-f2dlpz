"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell, Calendar as CalendarIcon } from "lucide-react";
import WorkoutDay from "@/components/WorkoutDay";
import { workoutData } from "@/lib/workout-data";
import type { Exercise } from "@/lib/types";
import { calculateCaloriesBurned } from "@/lib/utils";

export default function WorkoutTracker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState("monday");
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [workouts, setWorkouts] = useState(workoutData);

  const handleExerciseComplete = (exerciseName: string) => {
    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(exerciseName)) {
        next.delete(exerciseName);
      } else {
        next.add(exerciseName);
      }
      return next;
    });
  };

  const handleExerciseReplace = (oldExercise: string, newExercise: Exercise) => {
    setWorkouts(prev => {
      const updated = { ...prev };
      const day = updated[selectedDay];
      day.exercises = day.exercises.map(ex => 
        ex.name === oldExercise 
          ? { ...ex, name: newExercise.name }
          : ex
      );
      return updated;
    });
  };

  const totalCaloriesBurned = calculateCaloriesBurned(workouts[selectedDay].exercises);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Workout Tracker</h1>
          </div>
          <p className="text-muted-foreground text-lg">5-Day Split Program</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Schedule Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(workouts).map(([day, data]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted"
                  >
                    <span className="capitalize font-medium">{day}</span>
                    <span className="text-sm text-muted-foreground">
                      {data.focus}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Workout Details</CardTitle>
              <div className="text-sm text-muted-foreground">
                Estimated calories: {totalCaloriesBurned} kcal
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="monday"
              value={selectedDay}
              onValueChange={setSelectedDay}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 w-full">
                {Object.keys(workouts).map((day) => (
                  <TabsTrigger key={day} value={day} className="capitalize">
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(workouts).map(([day, data]) => (
                <TabsContent key={day} value={day}>
                  <ScrollArea className="h-[600px] rounded-md border p-4">
                    <WorkoutDay 
                      day={day} 
                      workoutData={data}
                      onExerciseComplete={handleExerciseComplete}
                      onExerciseReplace={handleExerciseReplace}
                      completedExercises={completedExercises}
                    />
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}