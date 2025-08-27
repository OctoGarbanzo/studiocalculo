'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IMath, BMath } from './math';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/hooks/use-language';
import { InteractiveGraph } from './interactive-graph';

const InteractiveFormula = ({ formula, tooltipText }: { formula: string; tooltipText: string }) => (
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

const DerivativesTheory = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Definition of the Derivative",
            p1: "The derivative of a function of a single variable at a chosen input value, when it exists, is the slope of the tangent line to the graph of the function at that point. It is the instantaneous rate of change of the function.",
            p2: "The derivative is formally defined using limits. The derivative of a function",
            p3: "with respect to",
            p4: "is the function",
            p5: "given by:",
            p6: "Let's break down this formula:",
            li1: "The term",
            li1_tt: "The change in the function's value (rise).",
            li1_p2: "represents the change in the function's output as the input changes by a small amount",
            li2: "The denominator",
            li2_tt: "The change in the function's input (run).",
            li2_p2: "is the change in the input value.",
            li3: "The fraction represents the",
            li3_tt: "Average rate of change, or slope of the secant line.",
            li3_p2: "which is the average rate of change between the points",
            li3_p3: "and",
            li4: "The",
            li4_tt: "The limit as h approaches zero.",
            li4_p2: "operation finds the instantaneous rate of change by making the interval",
            li4_p3: "infinitesimally small.",
            rulesTitle: "Common Derivative Rules",
            powerRule: "Power Rule",
            powerRuleDef: "If",
            powerRuleThen: "then",
            constantRule: "Constant Rule",
            sumDiffRule: "Sum/Difference Rule",
            productRule: "Product Rule"
        },
        es: {
            title: "Definición de la Derivada",
            p1: "La derivada de una función de una sola variable en un valor de entrada elegido, cuando existe, es la pendiente de la recta tangente a la gráfica de la función en ese punto. Es la tasa de cambio instantánea de la función.",
            p2: "La derivada se define formalmente usando límites. La derivada de una función",
            p3: "con respecto a",
            p4: "es la función",
            p5: "dada por:",
            p6: "Analicemos esta fórmula:",
            li1: "El término",
            li1_tt: "El cambio en el valor de la función (elevación).",
            li1_p2: "representa el cambio en la salida de la función a medida que la entrada cambia en una pequeña cantidad",
            li2: "El denominador",
            li2_tt: "El cambio en el valor de entrada (recorrido).",
            li2_p2: "es el cambio en el valor de entrada.",
            li3: "La fracción representa la",
            li3_tt: "Tasa de cambio promedio, o pendiente de la recta secante.",
            li3_p2: "que es la tasa de cambio promedio entre los puntos",
            li3_p3: "y",
            li4: "La operación de",
            li4_tt: "El límite cuando h se acerca a cero.",
            li4_p2: "encuentra la tasa de cambio instantánea haciendo el intervalo",
            li4_p3: "infinitesimalmente pequeño.",
            rulesTitle: "Reglas Comunes de Derivación",
            powerRule: "Regla de la Potencia",
            powerRuleDef: "Si",
            powerRuleThen: "entonces",
            constantRule: "Regla de la Constante",
            sumDiffRule: "Regla de la Suma/Diferencia",
            productRule: "Regla del Producto"
        }
    }

    const c = content[language];

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none space-y-4">
                <p>{c.p1}</p>
                <p>
                    {c.p2} <IMath>f(x)</IMath> {c.p3} <IMath>x</IMath> {c.p4} <IMath>f'(x)</IMath> {c.p5}
                </p>
                <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>
                        {`f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}`}
                    </BMath>
                </div>
                <div>
                    <p>{c.p6}</p>
                    <ul className='list-disc pl-6 space-y-2 mt-2'>
                        <li>{c.li1} <InteractiveFormula formula="f(x+h) - f(x)" tooltipText={c.li1_tt} /> {c.li1_p2} <IMath>h</IMath>.</li>
                        <li>{c.li2} <InteractiveFormula formula="h" tooltipText={c.li2_tt} /> {c.li2_p2}</li>
                        <li>{c.li3} <InteractiveFormula formula="\\frac{\\Delta y}{\\Delta x}" tooltipText={c.li3_tt} />, {c.li3_p2} <IMath>(x, f(x))</IMath> {c.li3_p3} <IMath>(x+h, f(x+h))</IMath>.</li>
                        <li>{c.li4} <InteractiveFormula formula="\\lim_{h \\to 0}" tooltipText={c.li4_tt} /> {c.li4_p2} <IMath>h</IMath> {c.li4_p3}</li>
                    </ul>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{c.rulesTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold">{c.powerRule}</h4>
                        <p>{c.powerRuleDef} <IMath>{`f(x) = x^n`}</IMath>, {c.powerRuleThen} <IMath>{`f'(x) = nx^{n-1}`}</IMath>.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">{c.constantRule}</h4>
                        <p>{c.powerRuleDef} <IMath>f(x) = c</IMath>, {c.powerRuleThen} <IMath>f'(x) = 0</IMath>.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">{c.sumDiffRule}</h4>
                        <p>{c.powerRuleDef} <IMath>{`h(x) = f(x) \\pm g(x)`}</IMath>, {c.powerRuleThen} <IMath>{`h'(x) = f'(x) \\pm g'(x)`}</IMath>.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">{c.productRule}</h4>
                        <p>{c.powerRuleDef} <IMath>h(x) = f(x)g(x)</IMath>, {c.powerRuleThen} <IMath>{`h'(x) = f'(x)g(x) + f(x)g'(x)`}</IMath>.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </>)
}

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
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const LimitsTheory = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Definition of a Limit",
            p1: "In mathematics, a limit is the value that a function (or sequence) approaches as the input (or index) approaches some value. Limits are essential to calculus and mathematical analysis, and are used to define continuity, derivatives, and integrals.",
            p2: "The limit of a function",
            p3: "as",
            p4: "approaches",
            p5: "is written as:",
            p6: "This means that the value of",
            p7: "can be made arbitrarily close to",
            p8: "by taking",
            p9: "sufficiently close to",
            p10: "Let's look at an example:",
            p11: "As",
            p12: "gets closer and closer to 2, the function",
            p13: "gets closer and closer to 4. Therefore, we say:",
            continuityTitle: "Continuity",
            continuityP1: "The continuity of a function on an interval can be exemplified as drawing the graph of said function with a pencil without lifting it. Informally, it means that the graph has no breaks, holes, or jumps.",
            continuityP2: "A function",
            continuityP3: "is continuous at a point",
            continuityP4: "if all three of the following conditions are met:",
            cond1: "is defined (i.e.,",
            cond1_p2: "is in the domain of",
            cond2: "exists.",
            cond3: "The limit equals the function's value:",
            oneSidedTitle: "One-Sided Limits",
            oneSidedP1: "Sometimes we are interested in the behavior of a function as it approaches a point from only one side. This leads to the concept of one-sided limits.",
            oneSidedP2: "The limit from the right means that x approaches c from values greater than c. It is denoted as:",
            oneSidedP3: "The limit from the left means that x approaches c from values less than c. It is denoted as:",
            oneSidedP4: "For the two-sided limit",
            oneSidedP5: "to exist, the limit from the left and the limit from the right must both exist and be equal.",
            specialLimitsTitle: "Special Trigonometric Limits",
            specialLimitsP1: "There are special trigonometric limits that are fundamental in calculus. They are used to solve limits involving trigonometric functions, especially indeterminate forms.",
            squeezeTitle: "Squeeze Theorem (Intercalation Theorem)",
            squeezeP1: "The Squeeze Theorem is used to find the limit of a function by comparing it to two other functions whose limits are known.",
            squeezeP2: "If",
            squeezeP3: "for all x in an open interval containing c (except possibly at c itself), and if",
            squeezeP4: "then",
        },
        es: {
            title: "Definición de un Límite",
            p1: "En matemáticas, un límite es el valor al que se aproxima una función (o secuencia) a medida que la entrada (o índice) se aproxima a algún valor. Los límites son esenciales para el cálculo y el análisis matemático, y se utilizan para definir continuidad, derivadas e integrales.",
            p2: "El límite de una función",
            p3: "cuando",
            p4: "se aproxima a",
            p5: "se escribe como:",
            p6: "Esto significa que el valor de",
            p7: "puede hacerse arbitrariamente cercano a",
            p8: "tomando",
            p9: "suficientemente cerca de",
            p10: "Veamos un ejemplo:",
            p11: "A medida que",
            p12: "se acerca más y más a 2, la función",
            p13: "se acerca más y más a 4. Por lo tanto, decimos:",
            continuityTitle: "Continuidad",
            continuityP1: "La continuidad de una función en un intervalo puede ejemplifcarse como un trazo con un lápiz, sin levantarlo, de la gráfica de dicha función. De manera informal entonces es que la gráfica no tenga rupturas, huecos o saltos.",
            continuityP2: "Una función",
            continuityP3: "es continua en un punto",
            continuityP4: "si se cumplen las tres condiciones siguientes:",
            cond1: "está definida (es decir,",
            cond1_p2: "está en el dominio de",
            cond2: "existe.",
            cond3: "El límite es igual al valor de la función:",
            oneSidedTitle: "Límites Laterales",
            oneSidedP1: "A veces nos interesa el comportamiento de una función a medida que se acerca a un punto desde un solo lado. Esto lleva al concepto de límites laterales.",
            oneSidedP2: "El límite por la derecha significa que x se aproxima a c desde valores mayores que c. Se denota como:",
            oneSidedP3: "El límite por la izquierda significa que x se aproxima a c desde valores menores que c. Se denota como:",
            oneSidedP4: "Para que el límite bilateral",
            oneSidedP5: "exista, el límite por la izquierda y el límite por la derecha deben existir y ser iguales.",
            specialLimitsTitle: "Límites Trigonométricos Especiales",
            specialLimitsP1: "Existen límites trigonométricos especiales que son fundamentales en el cálculo. Se utilizan para resolver límites que involucran funciones trigonométricas, especialmente en formas indeterminadas.",
            squeezeTitle: "Teorema de Intercalación (o del Sándwich)",
            squeezeP1: "El Teorema de Intercalación se utiliza para encontrar el límite de una función comparándola con otras dos funciones cuyos límites son conocidos.",
            squeezeP2: "Si",
            squeezeP3: "para todo x en un intervalo abierto que contiene a c (excepto posiblemente en c mismo), y si se cumple que",
            squeezeP4: "entonces:",
        }
    }

    const c = content[language];

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none space-y-4">
                <p>{c.p1}</p>
                <p>
                    {c.p2} <IMath>f(x)</IMath> {c.p3} <IMath>x</IMath> {c.p4} <IMath>c</IMath> {c.p5}
                </p>
                <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>
                        {`\\lim_{x \\to c} f(x) = L`}
                    </BMath>
                </div>
                <p>
                    {c.p6} <IMath>f(x)</IMath> {c.p7} <IMath>L</IMath> {c.p8} <IMath>x</IMath> {c.p9} <IMath>c</IMath>.
                </p>
                 <p>{c.p10}</p>
                <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{x \\to 2} x^2`}</BMath>
                </div>
                <p>
                    {c.p11} <IMath>x</IMath> {c.p12} <IMath>f(x) = x^2</IMath> {c.p13}
                </p>
                <div className="bg-muted p-4 rounded-lg text-center">
                     <BMath>{`\\lim_{x \\to 2} x^2 = 4`}</BMath>
                </div>
            </CardContent>
        </Card>
        
        <TrigIdentities />

        <Card>
            <CardHeader>
                <CardTitle>{c.oneSidedTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>{c.oneSidedP1}</p>
                <p>{c.oneSidedP2}</p>
                <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{x \\to c^+} f(x)`}</BMath>
                </div>
                <p>{c.oneSidedP3}</p>
                 <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{x \\to c^-} f(x)`}</BMath>
                </div>
                <p>{c.oneSidedP4} <IMath>{`\\lim_{x \\to c} f(x)`}</IMath> {c.oneSidedP5}</p>
                <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L`}</BMath>
                </div>
            </CardContent>
        </Card>

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
                             <BMath>{`\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x} = 0`}</BMath>
                        </div>
                    </li>
                     <li>
                         <div className="bg-muted p-4 rounded-lg text-center">
                             <BMath>{`\\lim_{x \\to 0} \\frac{\\tan(x)}{x} = 1`}</BMath>
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

export function TheoryTab({ module }: { module: { id: string; title: string } }) {
  return (
    <TooltipProvider>
      <div className="space-y-8">
        {module.id === 'derivatives' && <DerivativesTheory />}
        {module.id === 'limits' && <LimitsTheory />}
      </div>
    </TooltipProvider>
  );
}
