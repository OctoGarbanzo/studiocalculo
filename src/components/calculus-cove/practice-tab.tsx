import { InteractiveGraph } from './interactive-graph';
import { InteractiveLimitGraph } from './interactive-limit-graph';
import { ProblemGenerator } from './problem-generator';
import { StepByStepLimitSolutions } from './step-by-step-limit-solutions';

export function PracticeTab({ module }: { module: { id: string, title: string } }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
         {module.id === 'limits' ? <InteractiveLimitGraph /> : <InteractiveGraph />}
         {module.id === 'limits' && <StepByStepLimitSolutions />}
      </div>
      <div className="space-y-8">
        <ProblemGenerator module={module} />
      </div>
    </div>
  );
}
