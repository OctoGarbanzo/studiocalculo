import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IMath, BMath } from './math';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const InteractiveFormula = ({ formula, tooltipText }: { formula: string, tooltipText: string }) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <span className="font-code text-primary cursor-pointer underline decoration-dotted">
                <IMath>{formula}</IMath>
            </span>
        </TooltipTrigger>
        <TooltipContent>
            <p>{tooltipText}</p>
        </TooltipContent>
    </Tooltip>
);

export function TheoryTab({ module }: { module: { id: string; title: string } }) {
  return (
    <TooltipProvider>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Definition of the Derivative</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg dark:prose-invert max-w-none space-y-4">
                    <p>
                        The derivative of a function of a single variable at a chosen input value, when it exists, is the slope of the tangent line to the graph of the function at that point. It is the instantaneous rate of change of the function.
                    </p>
                    <p>
                        The derivative is formally defined using limits. The derivative of a function <IMath>f(x)</IMath> with respect to <IMath>x</IMath> is the function <IMath>f'(x)</IMath> given by:
                    </p>
                    <div className="bg-muted p-4 rounded-lg text-center">
                        <BMath>
                            f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}
                        </BMath>
                    </div>
                     <p>
                        Let's break down this formula:
                        <ul className='list-disc pl-6 space-y-2 mt-2'>
                           <li>The term <InteractiveFormula formula="f(x+h) - f(x)" tooltipText="The change in the function's value (rise)." /> represents the change in the function's output as the input changes by a small amount <IMath>h</IMath>.</li>
                            <li>The denominator <InteractiveFormula formula="h" tooltipText="The change in the function's input (run)." /> is the change in the input value.</li>
                            <li>The fraction represents the <InteractiveFormula formula="\\frac{\\Delta y}{\\Delta x}" tooltipText="Average rate of change, or slope of the secant line." />, which is the average rate of change between the points <IMath>(x, f(x))</IMath> and <IMath>(x+h, f(x+h))</IMath>.</li>
                            <li>The <InteractiveFormula formula="\\lim_{h \\to 0}" tooltipText="The limit as h approaches zero." /> operation finds the instantaneous rate of change by making the interval <IMath>h</IMath> infinitesimally small.</li>
                        </ul>
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Common Derivative Rules</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold">Power Rule</h4>
                            <p>If <IMath>f(x) = x^n</IMath>, then <IMath>f'(x) = nx^{n-1}</IMath>.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">Constant Rule</h4>
                            <p>If <IMath>f(x) = c</IMath>, then <IMath>f'(x) = 0</IMath>.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Sum/Difference Rule</h4>
                            <p>If <IMath>h(x) = f(x) \pm g(x)</IMath>, then <IMath>h'(x) = f'(x) \pm g'(x)</IMath>.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Product Rule</h4>
                            <p>If <IMath>h(x) = f(x)g(x)</IMath>, then <IMath>h'(x) = f'(x)g(x) + f(x)g'(x)</IMath>.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </TooltipProvider>
  );
}
