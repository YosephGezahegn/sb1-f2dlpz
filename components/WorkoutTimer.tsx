"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer, Pause, Play, RotateCcw } from "lucide-react";

interface WorkoutTimerProps {
  duration?: number; // in minutes
  onComplete?: () => void;
  label?: string;
}

export function WorkoutTimer({ duration = 60, onComplete, label }: WorkoutTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeLeft(duration * 60);
    setIsActive(false);
  };

  return (
    <Card className="p-4 flex items-center justify-between bg-muted/50">
      <div className="flex items-center gap-2">
        <Timer className="h-4 w-4" />
        <div className="flex flex-col">
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetTimer}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}