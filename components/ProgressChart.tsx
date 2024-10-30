"use client";

import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", completed: 85 },
  { day: "Tue", completed: 90 },
  { day: "Wed", completed: 75 },
  { day: "Thu", completed: 95 },
  { day: "Fri", completed: 88 },
];

export function ProgressChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="day" className="text-sm" />
          <YAxis className="text-sm" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Day
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].payload.day}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Completed
                        </span>
                        <span className="font-bold">
                          {payload[0].value}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            strokeWidth={2}
            activeDot={{
              r: 4,
              className: "fill-primary",
            }}
            className="stroke-primary"
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}