
'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
  Label as RechartsLabel,
} from 'recharts';
import { IMath } from './math';

interface LimitSolutionGraphProps {
  func: (x: number) => number | undefined;
  c: number;
  limit?: number;
  xDomain: [number, number];
  yDomain: [number, number];
  isRemovable: boolean;
}

export function LimitSolutionGraph({ func, c, limit, xDomain, yDomain, isRemovable }: LimitSolutionGraphProps) {
  const data = useMemo(() => {
    const points = [];
    const step = (xDomain[1] - xDomain[0]) / 200;
    for (let x = xDomain[0]; x <= xDomain[1]; x += step) {
      // Create a gap for the discontinuity
      if (isRemovable && Math.abs(x - c) < step) {
        points.push({ x: c, y: undefined });
        continue;
      }
      const y = func(x);
      if (y !== undefined && isFinite(y)) {
        points.push({ x, y });
      }
    }
    return points;
  }, [func, c, xDomain, isRemovable]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" domain={xDomain} />
          <YAxis type="number" domain={yDomain} allowDataOverflow />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
            }}
            labelFormatter={(label) => `x = ${Number(label).toFixed(2)}`}
            formatter={(value: number) => [Number(value).toFixed(2), 'f(x)']}
          />
          <ReferenceLine x={c} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3">
            <RechartsLabel value={`c = ${c}`} position="top" fill="hsl(var(--foreground))" offset={10} />
          </ReferenceLine>
          
          <Line type="monotone" dataKey="y" name="f(x)" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} connectNulls={false} />
          
          {isRemovable && limit !== undefined && (
            <ReferenceDot x={c} y={limit} r={5} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth={2} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
