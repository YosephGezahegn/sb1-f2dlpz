"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Brain, Dumbbell, List, Settings } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Dumbbell className="h-6 w-6" />
          <span className="font-bold">Workout Tracker</span>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              className="gap-2"
            >
              <Dumbbell className="h-4 w-4" />
              Tracker
            </Button>
          </Link>
          <Link href="/exercises">
            <Button
              variant={pathname === "/exercises" ? "secondary" : "ghost"}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              Exercises
            </Button>
          </Link>
          <Link href="/ai-planner">
            <Button
              variant={pathname === "/ai-planner" ? "secondary" : "ghost"}
              className="gap-2"
            >
              <Brain className="h-4 w-4" />
              AI Planner
            </Button>
          </Link>
          <Link href="/settings">
            <Button
              variant={pathname === "/settings" ? "secondary" : "ghost"}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}