"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { exercises } from "@/lib/exercises";

interface FiltersState {
  force: string[];
  level: string[];
  mechanic: string[];
  equipment: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  category: string[];
  calorieRange: string[];
}

interface ExerciseFiltersProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
}

const CALORIE_RANGES = [
  { label: "1-50 cal/hour", min: 1, max: 50 },
  { label: "50-100 cal/hour", min: 50, max: 100 },
  { label: "100-200 cal/hour", min: 100, max: 200 },
  { label: "200-300 cal/hour", min: 200, max: 300 },
  { label: "300-400 cal/hour", min: 300, max: 400 },
  { label: "500+ cal/hour", min: 500, max: Infinity },
];

export function ExerciseFilters({ filters, setFilters }: ExerciseFiltersProps) {
  // Extract unique values for each filter
  const uniqueValues = {
    force: [...new Set(exercises.map((e) => e.force).filter(Boolean))],
    level: [...new Set(exercises.map((e) => e.level))],
    mechanic: [...new Set(exercises.map((e) => e.mechanic).filter(Boolean))],
    equipment: [...new Set(exercises.map((e) => e.equipment).filter(Boolean))],
    primaryMuscles: [
      ...new Set(exercises.flatMap((e) => e.primaryMuscles)),
    ].sort(),
    secondaryMuscles: [
      ...new Set(exercises.flatMap((e) => e.secondaryMuscles)),
    ].sort(),
    category: [...new Set(exercises.map((e) => e.category))],
  };

  const resetFilters = () => {
    setFilters({
      force: [],
      level: [],
      mechanic: [],
      equipment: [],
      primaryMuscles: [],
      secondaryMuscles: [],
      category: [],
      calorieRange: [],
    });
  };

  const handleFilterChange = (type: keyof FiltersState, value: string) => {
    setFilters({
      ...filters,
      [type]: filters[type].includes(value)
        ? filters[type].filter((v) => v !== value)
        : [...filters[type], value],
    });
  };

  const removeFilter = (type: keyof FiltersState, value: string) => {
    setFilters({
      ...filters,
      [type]: filters[type].filter((v) => v !== value),
    });
  };

  const renderFilterBadges = () => {
    const allFilters = Object.entries(filters).flatMap(([type, values]) =>
      values.map((value) => ({
        type,
        value,
        label: type === "calorieRange" ? value : value,
      }))
    );

    return allFilters.length > 0 ? (
      <div className="flex flex-wrap gap-2 mb-4">
        {allFilters.map(({ type, value, label }) => (
          <Badge
            key={`${type}-${value}`}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {label}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeFilter(type as keyof FiltersState, value)}
            />
          </Badge>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="space-y-4">
      {renderFilterBadges()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Force</Label>
          <Select
            onValueChange={(value) => handleFilterChange("force", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select force type" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.force.map((value) => (
                <SelectItem key={`force-${value}`} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Level</Label>
          <Select
            onValueChange={(value) => handleFilterChange("level", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.level.map((value) => (
                <SelectItem key={`level-${value}`} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Mechanic</Label>
          <Select
            onValueChange={(value) => handleFilterChange("mechanic", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select mechanic" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.mechanic.map((value) => (
                <SelectItem key={`mechanic-${value}`} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Equipment</Label>
          <Select
            onValueChange={(value) => handleFilterChange("equipment", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select equipment" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.equipment.map((value) => (
                <SelectItem key={`equipment-${value}`} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Primary Muscles</Label>
          <Select
            onValueChange={(value) => handleFilterChange("primaryMuscles", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select primary muscles" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.primaryMuscles.map((value) => (
                <SelectItem key={`primary-${value}`} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Secondary Muscles</Label>
          <Select
            onValueChange={(value) => handleFilterChange("secondaryMuscles", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select secondary muscles" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.secondaryMuscles.map((value) => (
                <SelectItem key={`secondary-${value}`} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.category.map((value) => (
                <SelectItem key={`category-${value}`} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Calorie Range</Label>
          <Select
            onValueChange={(value) => handleFilterChange("calorieRange", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select calorie range" />
            </SelectTrigger>
            <SelectContent>
              {CALORIE_RANGES.map((range) => (
                <SelectItem key={range.label} value={range.label}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}