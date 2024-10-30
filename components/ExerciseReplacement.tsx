"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Replace, SlidersHorizontal } from "lucide-react";
import { exercises } from "@/lib/exercises";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseFilters } from "./ExerciseFilters";
import type { Exercise } from "@/lib/types";

interface ExerciseReplacementProps {
  currentExercise: string;
  onReplace: (newExercise: Exercise) => void;
}

export function ExerciseReplacement({ currentExercise, onReplace }: ExerciseReplacementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    force: [],
    level: [],
    mechanic: [],
    equipment: [],
    primaryMuscles: [],
    secondaryMuscles: [],
    category: [],
    calorieRange: [],
  });

  const currentExerciseData = exercises.find(e => e.name === currentExercise);
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilters =
      (filters.force.length === 0 || filters.force.includes(exercise.force || "")) &&
      (filters.level.length === 0 || filters.level.includes(exercise.level)) &&
      (filters.mechanic.length === 0 || filters.mechanic.includes(exercise.mechanic || "")) &&
      (filters.equipment.length === 0 || filters.equipment.includes(exercise.equipment || "")) &&
      (filters.primaryMuscles.length === 0 ||
        exercise.primaryMuscles.some(muscle => filters.primaryMuscles.includes(muscle))) &&
      (filters.secondaryMuscles.length === 0 ||
        exercise.secondaryMuscles.some(muscle => filters.secondaryMuscles.includes(muscle))) &&
      (filters.category.length === 0 || filters.category.includes(exercise.category)) &&
      (filters.calorieRange.length === 0 || filters.calorieRange.some(range => {
        const [min, max] = range.split("-").map(Number);
        return exercise.calorieBurnPerHour >= min && exercise.calorieBurnPerHour <= max;
      }));

    // Don't show the current exercise in the replacement options
    return matchesSearch && matchesFilters && exercise.name !== currentExercise;
  });

  // Pre-select filters based on current exercise
  const initializeFilters = () => {
    if (currentExerciseData) {
      setFilters(prev => ({
        ...prev,
        primaryMuscles: currentExerciseData.primaryMuscles,
      }));
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          initializeFilters();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Replace className="h-4 w-4 mr-2" />
          Replace Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Replace Exercise</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alternative exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card>
              <CardContent className="p-4">
                <ExerciseFilters filters={filters} setFilters={setFilters} />
              </CardContent>
            </Card>
          )}

          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.linkName}
                  className="cursor-pointer"
                  onClick={() => {
                    onReplace(exercise);
                    setIsOpen(false);
                  }}
                >
                  <ExerciseCard exercise={exercise} />
                </div>
              ))}
              {filteredExercises.length === 0 && (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  No matching exercises found. Try adjusting your filters.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}