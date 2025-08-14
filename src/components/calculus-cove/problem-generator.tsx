
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getPracticeProblems } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { BMath } from './math';
import { useLanguage } from '@/hooks/use-language';

export function ProblemGenerator({ module }: { module: { id: string; title: string } }) {
  const [problems, setProblems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setProblems([]);

    const result = await getPracticeProblems({ topic: module.title, quantity: 5 });
    
    setIsLoading(false);
    
    if (result.error) {
      toast({
        variant: 'destructive',
        title: language === 'es' ? 'Ocurrió un error' : 'An error occurred',
        description: result.error,
      });
    } else if (result.problems) {
      setProblems(result.problems);
    }
  };

  const content = {
    en: {
      title: "Practice Problem Generator",
      description: `Generate new problems for the topic of ${module.title} using AI.`,
      placeholder: "Click the button to generate practice problems.",
      buttonText: "Generate Problems"
    },
    es: {
      title: "Generador de Problemas de Práctica",
      description: `Genera nuevos problemas para el tema de ${module.title} usando IA.`,
      placeholder: "Haz clic en el botón para generar problemas de práctica.",
      buttonText: "Generar Problemas"
    }
  }

  const { title, description, placeholder, buttonText } = content[language];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : problems.length > 0 ? (
          <ul className="space-y-4">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <span className="font-bold text-primary">{index + 1}.</span>
                <div><BMath>{problem}</BMath></div>
              </li>
            ))}
          </ul>
        ) : (
           <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-40 border-2 border-dashed rounded-lg">
                <Wand2 className="h-8 w-8 mb-2"/>
                <p>{placeholder}</p>
           </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
