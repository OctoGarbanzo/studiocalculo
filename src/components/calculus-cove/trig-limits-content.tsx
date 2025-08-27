
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IMath, BMath } from './math';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/hooks/use-language';

const TrigIdentities = () => {
    const { language } = useLanguage();
    const content = {
        en: {
            title: "Trigonometric Identities",
            pitagoricas: "Pythagorean",
            doble: "Double Angle",
            reciprocas: "Reciprocal",
            paridad: "Parity/Symmetry",
            complementarios: "Complementary Angles",
            sumaResta: "Sum and Difference of Angles",
        },
        es: {
            title: "Identidades Trigonométricas",
            pitagoricas: "Pitagóricas",
            doble: "Ángulo Doble",
            reciprocas: "Recíprocas",
            paridad: "Paridad e imparidad",
            complementarios: "Ángulos Complementarios",
            sumaResta: "Suma y Resta de Ángulos",
        }
    }
    const c = content[language];
    return (
        <Card>
            <CardHeader>
                <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    <div>
                        <h4 className="font-semibold">{c.pitagoricas}</h4>
                        <ul className='list-disc pl-6 space-y-2'>
                            <li><BMath>{`\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1`}</BMath></li>
                            <li><BMath>{`1 + \\tan^2(\\alpha) = \\sec^2(\\alpha)`}</BMath></li>
                            <li><BMath>{`\\cot^2(\\alpha) + 1 = \\csc^2(\\alpha)`}</BMath></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold">{c.doble}</h4>
                         <ul className='list-disc pl-6 space-y-2'>
                            <li><BMath>{`\\sin(2\\alpha) = 2\\sin(\\alpha)\\cos(\\alpha)`}</BMath></li>
                            <li><BMath>{`\\cos(2\\alpha) = \\cos^2(\\alpha) - \\sin^2(\\alpha)`}</BMath></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold">{c.complementarios}</h4>
                        <ul className='list-disc pl-6 space-y-2'>
                           <li><IMath>{`\\sin(\\frac{\\pi}{2} - \\alpha) = \\cos(\\alpha)`}</IMath></li>
                           <li><IMath>{`\\cos(\\frac{\\pi}{2} - \\alpha) = \\sin(\\alpha)`}</IMath></li>
                           <li><IMath>{`\\tan(\\frac{\\pi}{2} - \\alpha) = \\cot(\\alpha)`}</IMath></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold">{c.paridad}</h4>
                        <ul className='list-disc pl-6 space-y-2'>
                           <li><IMath>{`\\sin(-\\alpha) = -\\sin(\\alpha)`}</IMath></li>
                           <li><IMath>{`\\cos(-\\alpha) = \\cos(\\alpha)`}</IMath></li>
                           <li><IMath>{`\\tan(-\\alpha) = -\\tan(\\alpha)`}</IMath></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">{c.reciprocas}</h4>
                         <ul className='list-disc pl-6 space-y-2'>
                            <li><IMath>{`\\csc(\\alpha) = \\frac{1}{\\sin(\\alpha)}`}</IMath></li>
                            <li><IMath>{`\\sec(\\alpha) = \\frac{1}{\\cos(\\alpha)}`}</IMath></li>
                            <li><IMath>{`\\cot(\\alpha) = \\frac{1}{\\tan(\\alpha)}`}</IMath></li>
                             <li><IMath>{`\\tan(\\alpha) = \\frac{\\sin(\\alpha)}{\\cos(\\alpha)}`}</IMath></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">{c.sumaResta}</h4>
                         <ul className='list-disc pl-6 space-y-2'>
                            <li><BMath>{`\\sin(\\alpha \\pm \\beta) = \\sin(\\alpha)\\cos(\\beta) \\pm \\cos(\\alpha)\\sin(\\beta)`}</BMath></li>
                            <li><BMath>{`\\cos(\\alpha \\pm \\beta) = \\cos(\\alpha)\\cos(\\beta) \\mp \\sin(\\alpha)\\sin(\\beta)`}</BMath></li>
                             <li><BMath>{`\\tan(\\alpha \\pm \\beta) = \\frac{\\tan(\\alpha) \\pm \\tan(\\beta)}{1 \\mp \\tan(\\alpha)tan(\\beta)}`}</BMath></li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const TrigLimitsTheory = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            specialLimitsTitle: "Special Trigonometric Limits",
            specialLimitsP1: "There are special trigonometric limits that are fundamental in calculus. They are used to solve limits involving trigonometric functions, especially indeterminate forms. Remember that these limits work when the angle is in radians.",
            squeezeTitle: "Squeeze Theorem (Intercalation Theorem)",
            squeezeP1: "The Squeeze Theorem is used to find the limit of a function by comparing it to two other functions whose limits are known.",
            squeezeP2: "If",
            squeezeP3: "for all x in an open interval containing c (except possibly at c itself), and if",
            squeezeP4: "then:",
            continuityTitle: "Continuity",
            continuityP1: "The continuity of a function on an interval can be exemplified as drawing the graph of said function with a pencil without lifting it. Informally, it means that the graph has no breaks, holes, or jumps.",
            continuityP2: "A function",
            continuityP3: "is continuous at a point",
            continuityP4: "if all three of the following conditions are met:",
            cond1: "is defined (i.e.,",
            cond1_p2: "is in the domain of",
            cond2: "exists.",
            cond3: "The limit equals the function's value:",
        },
        es: {
            specialLimitsTitle: "Límites Trigonométricos Especiales",
            specialLimitsP1: "Existen límites trigonométricos especiales que son fundamentales en el cálculo. Se utilizan para resolver límites que involucran funciones trigonométricas, especialmente en formas indeterminadas. Recuerde que estos límites funcionan cuando el ángulo está en radianes.",
            squeezeTitle: "Teorema de Intercalación (o del Sándwich)",
            squeezeP1: "El Teorema de Intercalación se utiliza para encontrar el límite de una función comparándola con otras dos funciones cuyos límites son conocidos.",
            squeezeP2: "Si",
            squeezeP3: "para todo x en un intervalo abierto que contiene a c (excepto posiblemente en c mismo), y si se cumple que",
            squeezeP4: "entonces:",
            continuityTitle: "Continuidad",
            continuityP1: "La continuidad de una función en un intervalo puede ejemplifcarse como un trazo con un lápiz, sin levantarlo, de la gráfica de dicha función. De manera informal entonces es que la gráfica no tenga rupturas, huecos o saltos.",
            continuityP2: "Una función",
            continuityP3: "es continua en un punto",
            continuityP4: "si se cumplen las tres condiciones siguientes:",
            cond1: "está definida (es decir,",
            cond1_p2: "está en el dominio de",
            cond2: "existe.",
            cond3: "El límite es igual al valor de la función:",
        }
    }

    const c = content[language];

    return (<>
        <TrigIdentities />

         <Card>
            <CardHeader>
                <CardTitle>{c.specialLimitsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>{c.specialLimitsP1}</p>
                 <ul className='list-disc pl-6 space-y-4 mt-2'>
                    <li>
                        <div className="bg-muted p-4 rounded-lg text-center">
                             <BMath>{`\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1`}</BMath>
                        </div>
                    </li>
                     <li>
                        <div className="bg-muted p-4 rounded-lg text-center">
                             <BMath>{`\\lim_{x \\to 0} \\frac{\\tan(x)}{x} = 1`}</BMath>
                        </div>
                    </li>
                    <li>
                         <div className="bg-muted p-4 rounded-lg text-center">
                             <BMath>{`\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x} = 0`}</BMath>
                        </div>
                    </li>
                </ul>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{c.squeezeTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>{c.squeezeP1}</p>
                <p>{c.squeezeP2} <IMath>h(x) \le f(x) \le g(x)</IMath> {c.squeezeP3} <IMath>{"\\lim_{x \\to c} h(x) = \\lim_{x \\to c} g(x) = L"}</IMath>, {c.squeezeP4}</p>
                <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{x \\to c} f(x) = L`}</BMath>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{c.continuityTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>{c.continuityP1}</p>
                <p>{c.continuityP2} <IMath>f</IMath> {c.continuityP3} <IMath>x=c</IMath> {c.continuityP4}</p>
                 <ol className='list-decimal pl-6 space-y-2 mt-2'>
                    <li><IMath>f(c)</IMath> {c.cond1} <IMath>c</IMath> {c.cond1_p2} <IMath>f</IMath>).</li>
                    <li><IMath>{`\\lim_{x \\to c} f(x)`}</IMath> {c.cond2}</li>
                    <li>{c.cond3} <IMath>{`\\lim_{x \\to c} f(x) = f(c)`}</IMath>.</li>
                </ol>
            </CardContent>
        </Card>
    </>)
}

type Module = {
  id: string;
  title: string;
  icon: React.ElementType;
  comingSoon?: boolean;
};

export function TrigLimitsContent({ module }: { module: Module }) {
  const { language } = useLanguage();
  return (
    <TooltipProvider>
       <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {language === 'es' ? 'Identidades, teoremas y límites especiales para funciones trigonométricas.' : 'Identities, theorems, and special limits for trigonometric functions.'}
                </p>
            </div>
            <div className="space-y-8">
                <TrigLimitsTheory />
            </div>
       </div>
    </TooltipProvider>
  );
}
