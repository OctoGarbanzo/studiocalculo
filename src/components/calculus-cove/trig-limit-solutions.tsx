
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BMath } from './math';
import { useLanguage } from '@/hooks/use-language';

const solutions_es = [
    {
        problem: "\\lim_{x \\to \\pi/3} \\frac{\\sin(3x)}{1 - 2\\cos(x)}",
        steps: [
            {
                explanation: "Expandir sin(3x) usando la identidad de suma de ángulos: sin(A+B) = sin(A)cos(B) + cos(A)sin(B).",
                math: "\\sin(3x) = \\sin(2x+x) = \\sin(2x)\\cos(x) + \\cos(2x)\\sin(x)"
            },
            {
                explanation: "Sustituir las identidades de ángulo doble: sin(2x) = 2sin(x)cos(x) y cos(2x) = cos²(x) - sin²(x).",
                math: "= (2\\sin(x)\\cos(x))\\cos(x) + (\\cos^2(x) - \\sin^2(x))\\sin(x)"
            },
            {
                explanation: "Simplificar la expresión.",
                math: "= 2\\sin(x)\\cos^2(x) + \\sin(x)\\cos^2(x) - \\sin^3(x) = 3\\sin(x)\\cos^2(x) - \\sin^3(x)"
            },
            {
                explanation: "Factorizar sin(x) y usar la identidad pitagórica sin²(x) = 1 - cos²(x).",
                math: "= \\sin(x)(3\\cos^2(x) - \\sin^2(x)) = \\sin(x)(3\\cos^2(x) - (1 - \\cos^2(x)))"
            },
             {
                explanation: "Continuar simplificando el numerador.",
                math: "= \\sin(x)(4\\cos^2(x) - 1)"
            },
            {
                explanation: "Factorizar la diferencia de cuadrados: 4cos²(x) - 1 = (2cos(x) - 1)(2cos(x) + 1).",
                math: "= \\sin(x)(2\\cos(x) - 1)(2\\cos(x) + 1)"
            },
            {
                explanation: "Reescribir el límite con el numerador factorizado y simplificar.",
                math: "= \\lim_{x \\to \\pi/3} \\frac{\\sin(x)(2\\cos(x) - 1)(2\\cos(x) + 1)}{-(2\\cos(x) - 1)} = \\lim_{x \\to \\pi/3} -\\sin(x)(2\\cos(x) + 1)"
            },
             {
                explanation: "Evaluar el límite por sustitución directa.",
                math: "= -\\sin(\\pi/3)(2\\cos(\\pi/3) + 1) = -\\frac{\\sqrt{3}}{2}(2 \\cdot \\frac{1}{2} + 1) = -\\frac{\\sqrt{3}}{2}(2) = -\\sqrt{3}"
            }
        ],
    },
    {
        problem: "\\lim_{x \\to \\pi/4} \\frac{\\sin(x) - \\cos(x)}{\\cos(2x)}",
        steps: [
            {
                explanation: "Usar la identidad de ángulo doble para el denominador: cos(2x) = cos²(x) - sin²(x).",
                math: "= \\lim_{x \\to \\pi/4} \\frac{\\sin(x) - \\cos(x)}{\\cos^2(x) - \\sin^2(x)}"
            },
            {
                explanation: "Factorizar el denominador como una diferencia de cuadrados.",
                math: "= \\lim_{x \\to \\pi/4} \\frac{\\sin(x) - \\cos(x)}{(\\cos(x) - \\sin(x))(\\cos(x) + \\sin(x))}"
            },
            {
                explanation: "Simplificar la fracción. Notar que sin(x) - cos(x) = -(cos(x) - sin(x)).",
                math: "= \\lim_{x \\to \\pi/4} \\frac{-(\\cos(x) - \\sin(x))}{(\\cos(x) - \\sin(x))(\\cos(x) + \\sin(x))} = \\lim_{x \\to \\pi/4} \\frac{-1}{\\cos(x) + \\sin(x)}"
            },
            {
                explanation: "Evaluar el límite por sustitución directa.",
                math: "= \\frac{-1}{\\cos(\\pi/4) + \\sin(\\pi/4)} = \\frac{-1}{\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2}} = \\frac{-1}{\\sqrt{2}} = -\\frac{\\sqrt{2}}{2}"
            }
        ]
    },
    {
        problem: "\\lim_{x \\to 0} \\frac{\\tan(x) - \\sin(x)}{x^3}",
        steps: [
            {
                explanation: "Esto da 0/0. Usamos la identidad tan(x) = sin(x)/cos(x).",
                math: "= \\lim_{x \\to 0} \\frac{\\frac{\\sin(x)}{\\cos(x)} - \\sin(x)}{x^3} = \\lim_{x \\to 0} \\frac{\\sin(x)(1 - \\cos(x))}{x^3 \\cos(x)}"
            },
            {
                explanation: "Separar los términos para usar los límites especiales.",
                math: "= \\lim_{x \\to 0} \\left( \\frac{\\sin(x)}{x} \\right) \\cdot \\left( \\frac{1 - \\cos(x)}{x^2} \\right) \\cdot \\left( \\frac{1}{\\cos(x)} \\right)"
            },
            {
                explanation: "Sabemos que lim(sin(x)/x) = 1 y lim((1-cos(x))/x^2) = 1/2.",
                math: "= (1) \\cdot \\left( \\frac{1}{2} \\right) \\cdot \\left( \\frac{1}{\\cos(0)} \\right)"
            },
            {
                explanation: "Calcular el resultado final.",
                math: "= 1 \\cdot \\frac{1}{2} \\cdot \\frac{1}{1} = \\frac{1}{2}"
            }
        ]
    }
];

const solutions_en = [
    {
        problem: "\\lim_{x \\to \\pi/3} \\frac{\\sin(3x)}{1 - 2\\cos(x)}",
        steps: [
            {
                explanation: "Expand sin(3x) using the angle sum identity: sin(A+B) = sin(A)cos(B) + cos(A)sin(B).",
                math: "\\sin(3x) = \\sin(2x+x) = \\sin(2x)\\cos(x) + \\cos(2x)\\sin(x)"
            },
            {
                explanation: "Substitute the double angle identities: sin(2x) = 2sin(x)cos(x) and cos(2x) = cos²(x) - sin²(x).",
                math: "= (2\\sin(x)\\cos(x))\\cos(x) + (\\cos^2(x) - \\sin^2(x))\\sin(x)"
            },
            {
                explanation: "Simplify the expression.",
                math: "= 2\\sin(x)\\cos^2(x) + \\sin(x)\\cos^2(x) - \\sin^3(x) = 3\\sin(x)\\cos^2(x) - \\sin^3(x)"
            },
            {
                explanation: "Factor out sin(x) and use the Pythagorean identity sin²(x) = 1 - cos²(x).",
                math: "= \\sin(x)(3\\cos^2(x) - \\sin^2(x)) = \\sin(x)(3\\cos^2(x) - (1 - \\cos^2(x)))"
            },
             {
                explanation: "Continue simplifying the numerator.",
                math: "= \\sin(x)(4\\cos^2(x) - 1)"
            },
            {
                explanation: "Factor the difference of squares: 4cos²(x) - 1 = (2cos(x) - 1)(2cos(x) + 1).",
                math: "= \\sin(x)(2\\cos(x) - 1)(2\\cos(x) + 1)"
            },
            {
                explanation: "Rewrite the limit with the factored numerator and simplify.",
                math: "= \\lim_{x \\to \\pi/3} \\frac{\\sin(x)(2\\cos(x) - 1)(2\\cos(x) + 1)}{-(2\\cos(x) - 1)} = \\lim_{x \\to \\pi/3} -\\sin(x)(2\\cos(x) + 1)"
            },
             {
                explanation: "Evaluate the limit by direct substitution.",
                math: "= -\\sin(\\pi/3)(2\\cos(\\pi/3) + 1) = -\\frac{\\sqrt{3}}{2}(2 \\cdot \\frac{1}{2} + 1) = -\\frac{\\sqrt{3}}{2}(2) = -\\sqrt{3}"
            }
        ],
    },
    {
        problem: "\\lim_{x \\to \\pi/4} \\frac{\\sin(x) - \\cos(x)}{\\cos(2x)}",
        steps: [
            {
                explanation: "Use the double angle identity for the denominator: cos(2x) = cos²(x) - sin²(x).",
                math: "= \\lim_{x \\to \\pi/4} \\frac{\\sin(x) - \\cos(x)}{\\cos^2(x) - \\sin^2(x)}"
            },
            {
                explanation: "Factor the denominator as a difference of squares.",
                math: "= \\lim_{x \\to \\pi/4} \\frac{\\sin(x) - \\cos(x)}{(\\cos(x) - \\sin(x))(\\cos(x) + \\sin(x))}"
            },
            {
                explanation: "Simplify the fraction. Note that sin(x) - cos(x) = -(cos(x) - sin(x)).",
                math: "= \\lim_{x \\to \\pi/4} \\frac{-(\\cos(x) - \\sin(x))}{(\\cos(x) - \\sin(x))(\\cos(x) + \\sin(x))} = \\lim_{x \\to \\pi/4} \\frac{-1}{\\cos(x) + \\sin(x)}"
            },
            {
                explanation: "Evaluate the limit by direct substitution.",
                math: "= \\frac{-1}{\\cos(\\pi/4) + \\sin(\\pi/4)} = \\frac{-1}{\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2}} = \\frac{-1}{\\sqrt{2}} = -\\frac{\\sqrt{2}}{2}"
            }
        ]
    },
    {
        problem: "\\lim_{x \\to 0} \\frac{\\tan(x) - \\sin(x)}{x^3}",
        steps: [
            {
                explanation: "This gives 0/0. We use the identity tan(x) = sin(x)/cos(x).",
                math: "= \\lim_{x \\to 0} \\frac{\\frac{\\sin(x)}{\\cos(x)} - \\sin(x)}{x^3} = \\lim_{x \\to 0} \\frac{\\sin(x)(1 - \\cos(x))}{x^3 \\cos(x)}"
            },
            {
                explanation: "Separate the terms to use the special limits.",
                math: "= \\lim_{x \\to 0} \\left( \\frac{\\sin(x)}{x} \\right) \\cdot \\left( \\frac{1 - \\cos(x)}{x^2} \\right) \\cdot \\left( \\frac{1}{\\cos(x)} \\right)"
            },
            {
                explanation: "We know lim(sin(x)/x) = 1 and lim((1-cos(x))/x^2) = 1/2.",
                math: "= (1) \\cdot \\left( \\frac{1}{2} \\right) \\cdot \\left( \\frac{1}{\\cos(0)} \\right)"
            },
            {
                explanation: "Calculate the final result.",
                math: "= 1 \\cdot \\frac{1}{2} \\cdot \\frac{1}{1} = \\frac{1}{2}"
            }
        ]
    }
];

export function TrigLimitSolutions() {
    const { language } = useLanguage();
    const solutions = language === 'en' ? solutions_en : solutions_es;

    const content = {
        en: {
            title: "Solved Examples",
            description: "See step-by-step solutions for common trigonometric limit problems.",
        },
        es: {
            title: "Ejemplos Resueltos",
            description: "Observa soluciones paso a paso para problemas comunes de límites trigonométricos.",
        }
    }
    const { title, description } = content[language];
    
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
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}
