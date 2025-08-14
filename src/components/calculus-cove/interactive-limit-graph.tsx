
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
  ReferenceDot,
  Label as RechartsLabel,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IMath } from './math';

const limitScenarios = {
  standard: {
    func: (x: number) => x * x, // f(x) = x^2
    c: 2,
    limit: 4,
    yDomain: [-1, 10],
    xDomain: [-1, 5],
    ticks: [-1, 0, 1, 2, 3, 4, 5]
  },
  removable: {
    func: (x: number) => (x !== 1 ? (x * x - 1) / (x - 1) : undefined), // f(x) = (x^2-1)/(x-1)
    c: 1,
    limit: 2,
    yDomain: [-1, 5],
    xDomain: [-2, 4],
    ticks: [-2, -1, 0, 1, 2, 3, 4]
  },
  jump: {
    func: (x: number) => (x < 2 ? x : x + 1), // f(x) = x for x<2, x+1 for x>=2
    c: 2,
    limit: undefined,
    yDomain: [-1, 5],
    xDomain: [-1, 5],
    ticks: [-1, 0, 1, 2, 3, 4, 5]
  },
  infinite: {
    func: (x: number) => (x !== 1 ? 1 / Math.pow(x - 1, 2) : undefined), // f(x) = 1/(x-1)^2
    c: 1,
    limit: Infinity,
    yDomain: [0, 50],
    xDomain: [-2, 4],
    ticks: [-2,-1,0,1,2,3,4]
  },
};

type ScenarioKey = keyof typeof limitScenarios;

export function InteractiveLimitGraph() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>('standard');
  const { language } = useLanguage();

  const scenario = limitScenarios[scenarioKey];

  const data = useMemo(() => {
    const points = [];
    const step = (scenario.xDomain[1] - scenario.xDomain[0]) / 200;
    for (let x = scenario.xDomain[0]; x <= scenario.xDomain[1]; x += step) {
      const y = scenario.func(x);
      if (y !== undefined && Math.abs(y) < 1e6) { // Avoid extreme values
        points.push({ x, y });
      }
      if (scenarioKey === 'jump' && Math.abs(x - scenario.c) < step) {
          points.push({x: scenario.c - 0.0001, y: scenario.func(scenario.c - 0.0001)})
          points.push({x: scenario.c, y: undefined})
          points.push({x: scenario.c + 0.0001, y: scenario.func(scenario.c + 0.0001)})
      }
    }
    return points;
  }, [scenarioKey, scenario]);
  
  const content = {
    en: {
        title: "Interactive Limit Examples",
        description: "Explore different types of limits by selecting a scenario. See how the function behaves as 'x' approaches a certain point 'c'.",
        selectLabel: "Select a scenario",
        scenarios: {
            standard: "Standard Limit",
            removable: "Removable Discontinuity",
            jump: "Jump Discontinuity",
            infinite: "Infinite Limit"
        }
    },
    es: {
        title: "Ejemplos Interactivos de Límites",
        description: "Explora diferentes tipos de límites seleccionando un escenario. Observa cómo se comporta la función a medida que 'x' se aproxima a un punto 'c'.",
        selectLabel: "Selecciona un escenario",
        scenarios: {
            standard: "Límite Estándar",
            removable: "Discontinuidad Removible",
            jump: "Discontinuidad de Salto",
            infinite: "Límite Infinito"
        }
    }
  }

  const { title, description, selectLabel, scenarios } = content[language];
  
  const limitText = scenario.limit === Infinity ? "\\infty" :
                    scenario.limit === undefined ? (language === 'es' ? 'No Existe' : 'Does Not Exist') 
                    : scenario.limit.toString()


  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className='w-full md:w-2/3 lg:w-1/2'>
            <Select onValueChange={(value: ScenarioKey) => setScenarioKey(value)} defaultValue={scenarioKey}>
                <SelectTrigger>
                    <SelectValue placeholder={selectLabel} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="standard">{scenarios.standard}</SelectItem>
                    <SelectItem value="removable">{scenarios.removable}</SelectItem>
                    <SelectItem value="jump">{scenarios.jump}</SelectItem>
                    <SelectItem value="infinite">{scenarios.infinite}</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" domain={scenario.xDomain} ticks={scenario.ticks} />
              <YAxis domain={scenario.yDomain} allowDataOverflow />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                }}
                labelFormatter={(label) => `x = ${Number(label).toFixed(2)}`}
                formatter={(value: number, name) => [Number(value).toFixed(2), 'f(x)']}
              />
              <Legend payload={[{value: <IMath>{`\\lim_{x \\to ${scenario.c}} f(x) = ${limitText}`}</IMath>, type: 'line'}]} />
              <ReferenceLine x={scenario.c} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3">
                 <RechartsLabel value={`c = ${scenario.c}`} position="top" fill="hsl(var(--foreground))" offset={10}/>
              </ReferenceLine>
              
              <Line type="monotone" dataKey="y" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} connectNulls={false} />
              
              {scenarioKey === 'removable' && (
                <ReferenceDot x={scenario.c} y={scenario.limit} r={5} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth={2} >
                    <RechartsLabel value={language === 'es' ? 'Hueco' : 'Hole'} position="top" fill="hsl(var(--foreground))"/>
                </ReferenceDot>
              )}
              {scenarioKey === 'jump' && <>
                <ReferenceDot x={scenario.c} y={2} r={5} fill="hsl(var(--primary))" stroke="hsl(var(--primary))" />
                <ReferenceDot x={scenario.c} y={3} r={5} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth={2}/>
              </>}

            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
