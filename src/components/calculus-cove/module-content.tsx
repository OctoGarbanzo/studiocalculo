
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TheoryTab } from './theory-tab';
import { PracticeTab } from './practice-tab';
import { QuizTab } from './quiz-tab';
import { useLanguage } from '@/hooks/use-language';

type Module = {
  id: string;
  title: string;
  icon: React.ElementType;
  comingSoon?: boolean;
};

export function ModuleContent({ module }: { module: Module }) {
  const { language } = useLanguage();

  if (module.comingSoon) {
      return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
                 <module.icon className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{module.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {language === 'es' ? 'Este módulo está en construcción y estará disponible pronto.' : 'This module is under construction and will be available soon!'}
            </p>
          </div>
      )
  }
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
       <div className="mb-8">
         <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
         <p className="mt-2 text-lg text-muted-foreground">
            {language === 'es' ? 'Explora conceptos, practica problemas y pon a prueba tus conocimientos.' : 'Explore concepts, practice problems, and test your knowledge.'}
         </p>
       </div>
      <Tabs defaultValue="theory">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid md:grid-cols-3">
          <TabsTrigger value="theory">{language === 'es' ? 'Teoría' : 'Theory'}</TabsTrigger>
          <TabsTrigger value="practice">{language === 'es' ? 'Práctica' : 'Practice'}</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="theory" className="mt-6">
          <TheoryTab module={module} />
        </TabsContent>
        <TabsContent value="practice" className="mt-6">
          <PracticeTab module={module} />
        </TabsContent>
        <TabsContent value="quiz" className="mt-6">
          <QuizTab module={module} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
