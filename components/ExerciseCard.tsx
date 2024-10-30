"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dumbbell, Flame, Target, Crosshair } from "lucide-react";
import type { Exercise } from "@/lib/types";

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="relative h-48 w-full cursor-pointer"
        onMouseEnter={() => {
          if (exercise.imageLinks.length > 1) {
            const interval = setInterval(() => {
              setImageIndex((prev) => (prev === 0 ? 1 : 0));
            }, 750);
            
            const element = document.activeElement;
            if (element) {
              (element as any)._imageInterval = interval;
            }
          }
        }}
        onMouseLeave={() => {
          const element = document.activeElement;
          if (element && (element as any)._imageInterval) {
            clearInterval((element as any)._imageInterval);
            (element as any)._imageInterval = null;
          }
          setImageIndex(0);
        }}
      >
        <Image
          src={exercise.imageLinks[imageIndex]}
          alt={exercise.name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg line-clamp-2">{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{exercise.level}</Badge>
          {exercise.force && <Badge variant="outline">{exercise.force}</Badge>}
          {exercise.mechanic && (
            <Badge variant="outline">{exercise.mechanic}</Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm">{exercise.equipment || "No equipment"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm">
              {exercise.calorieBurnPerHour} calories/hour
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2 text-xs">
          <div className="flex gap-2">
            <Target className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <span className="text-muted-foreground">Primary: </span>
              <span className="font-medium">{exercise.primaryMuscles.join(", ")}</span>
            </div>
          </div>
          {exercise.secondaryMuscles.length > 0 && (
            <div className="flex gap-2">
              <Crosshair className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <span className="text-muted-foreground">Secondary: </span>
                <span className="font-medium">{exercise.secondaryMuscles.join(", ")}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}