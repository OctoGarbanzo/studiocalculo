
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IMath, BMath } from './math';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useLanguage } from '@/hooks/use-language';
import { StepByStepLimitSolutions } from './step-by-step-limit-solutions';

const InfinityLimitsTheory = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            introTitle: "Limits When the Variable Tends to Infinity",
            introP1: "It is common that, when calculating the limit of a quotient of polynomials by direct substitution, the operation becomes indeterminate. For example, in the following case, the quotient is indeterminate when a direct substitution is performed:",
            introP2: "In this case, it is not yet possible to state whether the limit exists or not.",
            introP3: "However, a graphical analysis of this function shows that as the value of n increases, the value of the function also increases; thus, it can be deduced that the limit of this quotient, as n tends to infinity, is infinity.",
            algebraicTitle: "Algebraic Calculation",
            algebraicP1: 'To calculate it algebraically, sometimes the quotient must be operated on with a "convenient value" in a way that allows simplifying the expression to determine the limit. Returning to the initial example, we can multiply the quotient by 1 and rewrite it as:',
            algebraicP2: "By multiplying the numerator and denominator of the quotient by",
            algebraicP3: ", the following expression is obtained:",
            algebraicP4: "Which can be simplified to finally conclude that the limit is infinity:",
            rulesTitle: "Rules for Calculating Limits of Rational Functions",
            rulesP1: "As can be seen, it is not always possible or efficient to perform a graphical analysis or to determine how the algebraic expression can be manipulated to conclude if the limit exists and what it is. Therefore, it is convenient to know some rules that allow them to be calculated immediately.",
            sameDegreeTitle: "Numerator and Denominator with the Same Degree",
            sameDegreeP1: "If the numerator and denominator have the same degree, the limit as n tends to infinity is the quotient of the coefficients of the highest degree powers.",
            greaterDegreeTitle: "Numerator with a Greater Degree than the Denominator",
            greaterDegreeP1: "If the numerator has a greater degree than the denominator, the limit as n tends to infinity is ±∞, depending on the sign of the highest degree coefficient.",
            lesserDegreeTitle: "Denominator with a Greater Degree than the Numerator",
            lesserDegreeP1: "If the denominator has a greater degree, the limit is 0."
        },
        es: {
            introTitle: "Límites cuando la variable tiende a infinito",
            introP1: "Es frecuente que, cuando se calcula el límite del cociente de polinomios por sustitución directa la operación se indetermine. Por ejemplo, en el siguiente caso, el cociente queda indeterminado cuando se realiza una sustitución directa:",
            introP2: "En este caso, todavía no es posible afirmar si el límite existe o no.",
            introP3: "En cambio, si se realiza un análisis gráfico de esta función se puede observar que conforme aumenta el valor de n también aumenta el valor de la función; así se puede deducir que el límite de este cociente, cuando n tiende a infinito, es infinito.",
            algebraicTitle: "Cálculo algebraico",
            algebraicP1: 'Para poder calcularlo algebraicamente, en ocasiones se debe operar el cociente con un "valor conveniente" de tal manera que permita simplificar la expresión para determinar el límite. Retomando el ejemplo inicial, podemos multiplicar el cociente por 1 y reescribirlo como:',
            algebraicP2: "Así multiplicando el numerador y el denominador del cociente por",
            algebraicP3: ", se obtiene la siguiente expresión:",
            algebraicP4: "La cual se puede simplificar para finalmente concluir que el límite es infinito:",
            rulesTitle: "Reglas para el cálculo de límites de funciones racionales",
            rulesP1: "Como se puede observar no siempre es posible o eficiente realizar un análisis gráfico o bien determinar cómo se puede manipular la expresión algebraica para concluir si el límite existe y cuál es. Por ello, es conveniente conocer algunas reglas que permiten calcularlos de forma inmediata.",
            sameDegreeTitle: "Límite del cociente de polinomios con numerador y denominador con el mismo grado",
            sameDegreeP1: "Si el numerador y denominador tienen el mismo grado el límite cuando n tiende a infinito es el cociente entre los coeficientes de las potencias de mayor grado.",
            greaterDegreeTitle: "Límite de cociente de polinomios en el cual el numerador tiene grado mayor que el denominador",
            greaterDegreeP1: "Si el numerador es de grado mayor que el denominador el limite cuando n tiende a infinito es ±∞, dependiendo del signo del coeficiente de mayor grado.",
            lesserDegreeTitle: "Límite del cociente cuando el denominador tiene grado mayor grado que el numerador",
            lesserDegreeP1: "Si el denominador tiene mayor grado el límite es 0."
        }
    }

    const c = content[language];

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>{c.introTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>{c.introP1}</p>
                <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{n \\to \\infty} \\frac{n^2+n}{n+1} = \\frac{\\infty}{\\infty}`}</BMath>
                </div>
                <p>{c.introP2}</p>
                <p>{c.introP3}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>{c.algebraicTitle}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>{c.algebraicP1}</p>
                 <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{n \\to \\infty} \\frac{n^2+n}{n+1} \\cdot 1 = \\lim_{n \\to \\infty} \\frac{n^2+n}{n+1} \\cdot \\frac{1/n}{1/n}`}</BMath>
                </div>
                <p>{c.algebraicP2} <IMath>1/n</IMath>{c.algebraicP3}</p>
                 <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{n \\to \\infty} \\frac{n+1}{1+1/n}`}</BMath>
                </div>
                <p>{c.algebraicP4}</p>
                 <div className="bg-muted p-4 rounded-lg text-center">
                    <BMath>{`\\lim_{n \\to \\infty} \\frac{n+1}{1+1/n} = \\frac{\\infty+1}{1+0} = \\infty`}</BMath>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>{c.rulesTitle}</CardTitle>
            </CardHeader>
             <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                <p>{c.rulesP1}</p>
                
                <h4 className="font-semibold pt-4">{c.sameDegreeTitle}</h4>
                <p>{c.sameDegreeP1}</p>
                <BMath>{`\\lim_{n \\to \\infty} \\frac{a_k n^k + \\dots + a_0}{b_k n^k + \\dots + b_0} = \\frac{a_k}{b_k}`}</BMath>

                <h4 className="font-semibold pt-4">{c.greaterDegreeTitle}</h4>
                <p>{c.greaterDegreeP1}</p>
                <BMath>{`\\lim_{n \\to \\infty} \\frac{a_k n^k + \\dots}{b_j n^j + \\dots} = \\pm\\infty, \\quad k > j`}</BMath>

                <h4 className="font-semibold pt-4">{c.lesserDegreeTitle}</h4>
                <p>{c.lesserDegreeP1}</p>
                <BMath>{`\\lim_{n \\to \\infty} \\frac{a_k n^k + \\dots}{b_j n^j + \\dots} = 0, \\quad k < j`}</BMath>
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

export function InfinityLimitsContent({ module }: { module: Module }) {
  const { language } = useLanguage();
  return (
    <TooltipProvider>
       <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {language === 'es' ? 'Explora el comportamiento de las funciones cuando la variable tiende a infinito.' : 'Explore the behavior of functions as the variable approaches infinity.'}
                </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                    <InfinityLimitsTheory />
                </div>
                <div className="space-y-8">
                    <StepByStepLimitSolutions filter="infinity" />
                </div>
            </div>
       </div>
    </TooltipProvider>
  );
}
