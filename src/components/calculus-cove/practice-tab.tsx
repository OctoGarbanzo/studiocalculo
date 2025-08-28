'use client';

import { InteractiveGraph } from './interactive-graph';
import { ProblemGenerator } from './problem-generator';
import { StepByStepLimitSolutions } from './step-by-step-limit-solutions';

export function PracticeTab({ module }: { module: { id: string, title: string } }) {
  if (module.id === 'limits') {
    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
                <StepByStepLimitSolutions />
            </div>
            <div className="space-y-8">
                <ProblemGenerator module={module} />
            </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
         <InteractiveGraph />
      </div>
      <div className="space-y-8">
        <ProblemGenerator module={module} />
      </div>
    </div>
  );
}
