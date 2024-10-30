"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { alternativeExercises } from "@/lib/exercise-alternatives";

export default function ExerciseSwapManager() {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedAlternative, setSelectedAlternative] = useState("");

  const handleSwap = () => {
    // TODO: Implement exercise swap logic
    console.log(`Swapping ${selectedExercise} with ${selectedAlternative}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercise Alternatives</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Exercise</Label>
            <Select
              value={selectedExercise}
              onValueChange={setSelectedExercise}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select exercise to replace" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(alternativeExercises).map((exercise) => (
                  <SelectItem key={exercise} value={exercise}>
                    {exercise}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedExercise && (
            <div className="space-y-2">
              <Label>Alternative Exercise</Label>
              <Select
                value={selectedAlternative}
                onValueChange={setSelectedAlternative}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select alternative exercise" />
                </SelectTrigger>
                <SelectContent>
                  {alternativeExercises[selectedExercise]?.map((alt) => (
                    <SelectItem key={alt} value={alt}>
                      {alt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            onClick={handleSwap}
            disabled={!selectedExercise || !selectedAlternative}
            className="w-full"
          >
            Swap Exercise
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}