"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function RestDaySelector() {
  const [restDays, setRestDays] = useState<string[]>(["saturday", "sunday"]);

  const toggleRestDay = (day: string) => {
    setRestDays((current) =>
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rest Days</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DAYS.map((day) => (
            <div key={day} className="flex items-center justify-between">
              <Label htmlFor={`rest-${day}`} className="capitalize">
                {day}
              </Label>
              <Switch
                id={`rest-${day}`}
                checked={restDays.includes(day)}
                onCheckedChange={() => toggleRestDay(day)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}