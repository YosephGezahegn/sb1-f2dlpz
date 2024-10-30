"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ExerciseFilters } from "@/components/ExerciseFilters";
import { exercises } from "@/lib/exercises";
import type { Exercise } from "@/lib/types";
import { Search, SlidersHorizontal } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const CALORIE_RANGES = [
  { label: "1-50 cal/hour", min: 1, max: 50 },
  { label: "50-100 cal/hour", min: 50, max: 100 },
  { label: "100-200 cal/hour", min: 100, max: 200 },
  { label: "200-300 cal/hour", min: 200, max: 300 },
  { label: "300-400 cal/hour", min: 300, max: 400 },
  { label: "500+ cal/hour", min: 500, max: Infinity },
];

export default function ExercisesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
  const [showFilters, setShowFilters] = useState(false);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise: Exercise) => {
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
          const { min, max } = CALORIE_RANGES.find(r => r.label === range) || { min: 0, max: 0 };
          return exercise.calorieBurnPerHour >= min && exercise.calorieBurnPerHour <= max;
        }));

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredExercises.length / ITEMS_PER_PAGE);
  const paginatedExercises = filteredExercises.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="md:w-auto"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <ExerciseFilters filters={filters} setFilters={setFilters} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedExercises.map((exercise) => (
          <ExerciseCard key={exercise.linkName} exercise={exercise} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}