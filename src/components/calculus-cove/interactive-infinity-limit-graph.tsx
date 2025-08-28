
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
  Label as RechartsLabel,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IMath } from './math';

const limitScenarios = {
  less: {
    func: (x: number) => (2 * x + 1) / (x * x + 1), // deg(num) < deg(den)
    yDomain: [-1, 2],
    limit: 0,
    label: "deg(P) < deg(Q)"
  },
  equal: {
    func: (x: number) => (3 * x * x + 2) / (2 * x * x + x + 1), // deg(num) = deg(den)
    yDomain: [0, 3],
    limit: 1.5,
    label: "deg(P) = deg(Q)"
  },
  greater: {
    func: (x: number) => (x * x - 1) / (x + 1), // deg(num) > deg(den)
    yDomain: [-10, 50],
    limit: Infinity,
    label: "deg(P) > deg(Q)"
  },
};

type ScenarioKey = keyof typeof limitScenarios;

export function InteractiveInfinityLimitGraph() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>('equal');
  const { language } = useLanguage();

  const scenario = limitScenarios[scenarioKey];

  const data = useMemo(() => {
    const points = [];
    const step = 1;
    for (let x = 0; x <= 50; x += step) {
      const y = scenario.func(x);
      if (y !== undefined && Math.abs(y) < 1e6) { 
        points.push({ x, y });
      }
    }
    return points;
  }, [scenarioKey, scenario]);
  
  const content = {
    en: {
        title: "Interactive Limits at Infinity",
        description: "See how the function behaves as 'x' approaches infinity based on the degrees of the numerator (P) and denominator (Q).",
        selectLabel: "Select a scenario",
        limitIs: "The limit is"
    },
    es: {
        title: "Límites Interactivos al Infinito",
        description: "Observa cómo se comporta la función a medida que 'x' se aproxima a infinito según los grados del numerador (P) y el denominador (Q).",
        selectLabel: "Selecciona un escenario",
        limitIs: "El límite es"
    }
  }

  const { title, description, selectLabel, limitIs } = content[language];
  
  const limitText = scenario.limit === Infinity ? "\\infty" :
                    scenario.limit === undefined ? (language === 'es' ? 'No Existe' : 'Does Not Exist') 
                    : scenario.limit.toString();

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
                    <SelectItem value="less">{limitScenarios.less.label}</SelectItem>
                    <SelectItem value="equal">{limitScenarios.equal.label}</SelectItem>
                    <SelectItem value="greater">{limitScenarios.greater.label}</SelectItem>
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
              <XAxis dataKey="x" type="number" domain={[0, 50]} label={{ value: 'x → ∞', position: 'insideBottomRight', offset: -10 }}/>
              <YAxis domain={scenario.yDomain} allowDataOverflow />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                }}
                labelFormatter={(label) => `x = ${Number(label).toFixed(2)}`}
                formatter={(value: number, name) => [Number(value).toFixed(2), 'f(x)']}
              />
              <Legend payload={[{value: <IMath>{`\\lim_{x \\to \\infty} f(x) = ${limitText}`}</IMath>, type: 'line'}]} />
              
              {isFinite(scenario.limit) && (
                <ReferenceLine y={scenario.limit} stroke="hsl(var(--accent-foreground))" strokeDasharray="4 4">
                    <RechartsLabel value={`${limitIs} ${limitText}`} position="insideTopLeft" fill="hsl(var(--foreground))" />
                </ReferenceLine>
              )}
              
              <Line type="monotone" dataKey="y" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
