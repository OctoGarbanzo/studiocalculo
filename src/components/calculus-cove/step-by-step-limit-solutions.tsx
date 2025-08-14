
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BMath, IMath } from './math';
import { LimitSolutionGraph } from './limit-solution-graph';
import { useLanguage } from '@/hooks/use-language';
import { AreaChart } from 'lucide-react';

const solutions_en = [
    {
        problem: "\\lim_{x \\to 2} (x^2 + 3x - 1)",
        steps: [
            {
                explanation: "The function is a polynomial. We can use the Direct Substitution Property.",
                math: "=(2)^2 + 3(2) - 1"
            },
            {
                explanation: "Simplify the expression.",
                math: "= 4 + 6 - 1"
            },
            {
                explanation: "Final result.",
                math: "= 9"
            }
        ],
        graph: {
            func: (x: number) => x**2 + 3*x -1,
            c: 2,
            limit: 9,
            xDomain: [-1, 5] as [number, number],
            yDomain: [-2, 20] as [number, number],
            isRemovable: false
        }
    },
    {
        problem: "\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}",
        steps: [
            {
                explanation: "If we substitute x=3, we get 0/0, which is an indeterminate form. We need to simplify the expression by factoring the numerator.",
                math: "= \\lim_{x \\to 3} \\frac{(x-3)(x+3)}{x - 3}"
            },
            {
                explanation: "Cancel the (x-3) term, since x is approaching 3, but is not equal to 3.",
                math: "= \\lim_{x \\to 3} (x+3)"
            },
            {
                explanation: "Now, use the Direct Substitution Property.",
                math: "= 3 + 3 = 6"
            }
        ],
        graph: {
            func: (x: number) => x !== 3 ? (x**2 - 9) / (x-3) : undefined,
            c: 3,
            limit: 6,
            xDomain: [0, 6] as [number, number],
            yDomain: [0, 10] as [number, number],
            isRemovable: true
        }
    },
    {
        problem: "\\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x}",
        steps: [
            {
                explanation: "Substituting x=0 gives 0/0. We multiply by the conjugate of the numerator.",
                math: "= \\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x} \\cdot \\frac{\\sqrt{x+4} + 2}{\\sqrt{x+4} + 2}"
            },
            {
                explanation: "Simplify the numerator using (a-b)(a+b) = a^2 - b^2.",
                math: "= \\lim_{x \\to 0} \\frac{(x+4) - 4}{x(\\sqrt{x+4} + 2)}"
            },
            {
                explanation: "Cancel the x term from numerator and denominator.",
                math: "= \\lim_{x \\to 0} \\frac{1}{\\sqrt{x+4} + 2}"
            },
             {
                explanation: "Substitute x=0 to find the limit.",
                math: "= \\frac{1}{\\sqrt{0+4} + 2} = \\frac{1}{2+2} = \\frac{1}{4}"
            }
        ],
        graph: {
            func: (x: number) => x !== 0 ? (Math.sqrt(x+4)-2)/x : undefined,
            c: 0,
            limit: 0.25,
            xDomain: [-1, 1] as [number, number],
            yDomain: [0, 0.5] as [number, number],
            isRemovable: true
        }
    },
     {
        problem: "\\lim_{x \\to \\infty} \\frac{2x^2 + 1}{3x^2 - x + 5}",
        steps: [
            {
                explanation: "To find the limit at infinity of a rational function, divide the numerator and denominator by the highest power of x, which is x^2.",
                math: "= \\lim_{x \\to \\infty} \\frac{\\frac{2x^2}{x^2} + \\frac{1}{x^2}}{\\frac{3x^2}{x^2} - \\frac{x}{x^2} + \\frac{5}{x^2}}"
            },
            {
                explanation: "Simplify the expression.",
                math: "= \\lim_{x \\to \\infty} \\frac{2 + \\frac{1}{x^2}}{3 - \\frac{1}{x} + \\frac{5}{x^2}}"
            },
            {
                explanation: "As x approaches infinity, terms like 1/x and 1/x^2 approach 0.",
                math: "= \\frac{2 + 0}{3 - 0 + 0} = \\frac{2}{3}"
            }
        ],
         graph: {
            func: (x: number) => (2*x**2 + 1) / (3*x**2 - x + 5),
            c: Infinity, // This is conceptual for the graph
            limit: 2/3,
            xDomain: [0, 100] as [number, number],
            yDomain: [0, 1] as [number, number],
            isRemovable: false
        }
    }
];

const solutions_es = [
    {
        problem: "\\lim_{x \\to 2} (x^2 + 3x - 1)",
        steps: [
            {
                explanation: "La función es un polinomio. Podemos usar la Propiedad de Sustitución Directa.",
                math: "=(2)^2 + 3(2) - 1"
            },
            {
                explanation: "Simplificar la expresión.",
                math: "= 4 + 6 - 1"
            },
            {
                explanation: "Resultado final.",
                math: "= 9"
            }
        ],
        graph: {
            func: (x: number) => x**2 + 3*x -1,
            c: 2,
            limit: 9,
            xDomain: [-1, 5] as [number, number],
            yDomain: [-2, 20] as [number, number],
            isRemovable: false
        }
    },
    {
        problem: "\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}",
        steps: [
            {
                explanation: "Si sustituimos x=3, obtenemos 0/0, que es una forma indeterminada. Necesitamos simplificar la expresión factorizando el numerador.",
                math: "= \\lim_{x \\to 3} \\frac{(x-3)(x+3)}{x - 3}"
            },
            {
                explanation: "Cancelar el término (x-3), ya que x se acerca a 3, pero no es igual a 3.",
                math: "= \\lim_{x \\to 3} (x+3)"
            },
            {
                explanation: "Ahora, usamos la Propiedad de Sustitución Directa.",
                math: "= 3 + 3 = 6"
            }
        ],
        graph: {
            func: (x: number) => x !== 3 ? (x**2 - 9) / (x-3) : undefined,
            c: 3,
            limit: 6,
            xDomain: [0, 6] as [number, number],
            yDomain: [0, 10] as [number, number],
            isRemovable: true
        }
    },
     {
        problem: "\\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x}",
        steps: [
            {
                explanation: "Sustituir x=0 da 0/0. Multiplicamos por el conjugado del numerador.",
                math: "= \\lim_{x \\to 0} \\frac{\\sqrt{x+4} - 2}{x} \\cdot \\frac{\\sqrt{x+4} + 2}{\\sqrt{x+4} + 2}"
            },
            {
                explanation: "Simplificar el numerador usando (a-b)(a+b) = a^2 - b^2.",
                math: "= \\lim_{x \\to 0} \\frac{(x+4) - 4}{x(\\sqrt{x+4} + 2)}"
            },
            {
                explanation: "Cancelar el término x del numerador y denominador.",
                math: "= \\lim_{x \\to 0} \\frac{1}{\\sqrt{x+4} + 2}"
            },
             {
                explanation: "Sustituir x=0 para encontrar el límite.",
                math: "= \\frac{1}{\\sqrt{0+4} + 2} = \\frac{1}{2+2} = \\frac{1}{4}"
            }
        ],
        graph: {
            func: (x: number) => x !== 0 ? (Math.sqrt(x+4)-2)/x : undefined,
            c: 0,
            limit: 0.25,
            xDomain: [-1, 1] as [number, number],
            yDomain: [0, 0.5] as [number, number],
            isRemovable: true
        }
    },
    {
        problem: "\\lim_{x \\to \\infty} \\frac{2x^2 + 1}{3x^2 - x + 5}",
        steps: [
            {
                explanation: "Para encontrar el límite al infinito de una función racional, divide el numerador y el denominador por la mayor potencia de x, que es x^2.",
                math: "= \\lim_{x \\to \\infty} \\frac{\\frac{2x^2}{x^2} + \\frac{1}{x^2}}{\\frac{3x^2}{x^2} - \\frac{x}{x^2} + \\frac{5}{x^2}}"
            },
            {
                explanation: "Simplificar la expresión.",
                math: "= \\lim_{x \\to \\infty} \\frac{2 + \\frac{1}{x^2}}{3 - \\frac{1}{x} + \\frac{5}{x^2}}"
            },
            {
                explanation: "A medida que x se acerca al infinito, los términos como 1/x y 1/x^2 se acercan a 0.",
                math: "= \\frac{2 + 0}{3 - 0 + 0} = \\frac{2}{3}"
            }
        ],
        graph: {
            func: (x: number) => (2*x**2 + 1) / (3*x**2 - x + 5),
            c: Infinity,
            limit: 2/3,
            xDomain: [0, 100] as [number, number],
            yDomain: [0, 1] as [number, number],
            isRemovable: false
        }
    }
];


export function StepByStepLimitSolutions() {
    const { language } = useLanguage();
    const solutions = language === 'en' ? solutions_en : solutions_es;

    const content = {
        en: {
            title: "Solved Examples",
            description: "See step-by-step solutions for common limit problems.",
            viewGraph: "View Graph",
            graphOf: "Graph of"
        },
        es: {
            title: "Ejemplos Resueltos",
            description: "Observa soluciones paso a paso para problemas comunes de límites.",
            viewGraph: "Ver Gráfica",
            graphOf: "Gráfica de"
        }
    }
    const { title, description, viewGraph, graphOf } = content[language];
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {solutions.map((solution, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className="bg-muted/50 rounded-lg border px-4">
                            <AccordionTrigger className="text-left hover:no-underline">
                                <div className="flex items-center gap-4">
                                   <span className="font-bold text-primary">{index + 1}.</span> 
                                   <BMath>{solution.problem}</BMath>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                                {solution.steps.map((step, stepIndex) => (
                                    <div key={stepIndex} className="flex flex-col gap-2 p-3 bg-background rounded-md">
                                        <p className="text-sm text-muted-foreground italic">{step.explanation}</p>
                                        <div className='text-center'>
                                            <BMath>{step.math}</BMath>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-end mt-4">
                                     <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" disabled={solution.graph.c === Infinity}>
                                                <AreaChart className="mr-2 h-4 w-4" />
                                                {viewGraph}
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-xl">
                                            <DialogHeader>
                                                <DialogTitle>{graphOf} <IMath>{solution.problem}</IMath></DialogTitle>
                                            </DialogHeader>
                                            <LimitSolutionGraph {...solution.graph} />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}
