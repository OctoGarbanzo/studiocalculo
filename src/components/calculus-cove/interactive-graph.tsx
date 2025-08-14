'use client';

import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { BMath, IMath } from './math';

const functionToGraph = (x: number) => 0.25 * x ** 2; // f(x) = 0.25x^2
const derivative = (x: number) => 0.5 * x; // f'(x) = 0.5x

export function InteractiveGraph() {
  const [x0, setX0] = useState(2);

  const data = useMemo(() => {
    const points = [];
    for (let x = -10; x <= 10; x += 0.5) {
      points.push({ x });
    }

    const y0 = functionToGraph(x0);
    const slope = derivative(x0);

    return points.map(point => {
        const x = point.x;
        return {
            x,
            y: functionToGraph(x),
            tangent: slope * (x - x0) + y0,
        };
    });
  }, [x0]);

  const tangentEquation = `y = ${derivative(x0).toFixed(2)}(x - ${x0.toFixed(2)}) + ${functionToGraph(x0).toFixed(2)}`;
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.x === x0) {
      return <Dot cx={cx} cy={cy} r={5} fill="hsl(var(--primary))" stroke="hsl(var(--card-foreground))" strokeWidth={2} />;
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tangent Line Simulation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" domain={[-10, 10]} ticks={[-10, -5, 0, 5, 10]} />
              <YAxis domain={[-2, 12]}/>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                }}
                labelFormatter={(label) => `x = ${label}`}
                 formatter={(value, name) => [value.toFixed(2), name === 'y' ? 'f(x)' : 'Tangent']}
              />
              <Legend />
              <ReferenceLine x={0} stroke="hsl(var(--border))" />
              <ReferenceLine y={0} stroke="hsl(var(--border))" />
              <Line type="monotone" dataKey="y" name="f(x) = 0.25x²" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="tangent" name="Tangent Line" stroke="hsl(var(--accent-foreground))" strokeWidth={2} dot={<CustomDot/>} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="x0-slider">Point of Tangency <IMath math={`x_0 = ${x0.toFixed(2)}`}/></Label>
            <Slider
              id="x0-slider"
              min={-10}
              max={10}
              step={0.1}
              value={[x0]}
              onValueChange={(value) => setX0(value[0])}
            />
          </div>
          <div className='p-4 bg-muted rounded-md text-center'>
            <p>Tangent line at <IMath math={`x_0=${x0.toFixed(2)}`}/>:</p>
            <BMath>{tangentEquation}</BMath>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
