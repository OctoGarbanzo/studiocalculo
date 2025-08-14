
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { IMath } from './math';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const derivatives_questions_en = [
    {
        question: "What is the derivative of",
        formula: "f(x) = 3x^4 + 2x^2 - 5",
        options: [
            "f'(x) = 12x^3 + 4x",
            "f'(x) = 12x^3 + 4x - 5",
            "f'(x) = 3x^3 + 2x",
            "f'(x) = 4x^3 + 2x",
        ],
        correctAnswer: "f'(x) = 12x^3 + 4x",
    }
];

const derivatives_questions_es = [
    {
        question: "¿Cuál es la derivada de",
        formula: "f(x) = 3x^4 + 2x^2 - 5",
        options: [
            "f'(x) = 12x^3 + 4x",
            "f'(x) = 12x^3 + 4x - 5",
            "f'(x) = 3x^3 + 2x",
            "f'(x) = 4x^3 + 2x",
        ],
        correctAnswer: "f'(x) = 12x^3 + 4x",
    }
];

const limits_questions_en = [
    {
        question: "What is the value of the limit",
        formula: "\\lim_{x \\to 2} (x^2 + 3x - 1)",
        options: [
            "9",
            "10",
            "8",
            "Does not exist",
        ],
        correctAnswer: "9",
    },
     {
        question: "Evaluate the limit:",
        formula: "\\lim_{x \\to 0} \\frac{\\sin(x)}{x}",
        options: [
            "0",
            "1",
            "\\infty",
            "Does not exist",
        ],
        correctAnswer: "1",
    }
];

const limits_questions_es = [
    {
        question: "¿Cuál es el valor del límite",
        formula: "\\lim_{x \\to 2} (x^2 + 3x - 1)",
        options: [
            "9",
            "10",
            "8",
            "No existe",
        ],
        correctAnswer: "9",
    },
    {
        question: "Evalúa el límite:",
        formula: "\\lim_{x \\to 0} \\frac{\\sin(x)}{x}",
        options: [
            "0",
            "1",
            "\\infty",
            "No existe",
        ],
        correctAnswer: "1",
    }
];

const getQuestionsForModule = (moduleId: string, language: 'en' | 'es') => {
    switch(moduleId) {
        case 'limits':
            return language === 'en' ? limits_questions_en : limits_questions_es;
        case 'derivatives':
            return language === 'en' ? derivatives_questions_en : derivatives_questions_es;
        default:
            return [];
    }
}


export function QuizTab({ module }: { module: { id: string; title: string } }) {
    const { language } = useLanguage();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{correct: boolean, message: string} | null>(null);
    const [score, setScore] = useState(0);
    
    const quizQuestions = getQuestionsForModule(module.id, language);

    if (quizQuestions.length === 0) {
        return <p>Quiz coming soon for this module!</p>
    }
    
    const question = quizQuestions[currentQuestionIndex];

    const feedbackMessages = {
        en: {
            correct: "Correct! Excellent job.",
            incorrect: `Not quite. The correct answer is`
        },
        es: {
            correct: "¡Correcto! Excelente trabajo.",
            incorrect: `No es correcto. La respuesta correcta es`
        }
    }

    const handleCheckAnswer = () => {
        if (!selectedAnswer) return;

        if(selectedAnswer === question.correctAnswer) {
            setFeedback({correct: true, message: feedbackMessages[language].correct });
            setScore(prev => prev + 1);
        } else {
            setFeedback({correct: false, message: `${feedbackMessages[language].incorrect}` });
        }
    }

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setFeedback(null);
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // End of quiz
            alert(`Quiz finished! Your score: ${score}/${quizQuestions.length}`);
        }
    }

    const content = {
        en: {
            title: `Topic Quiz: ${module.title}`,
            description: "Test your knowledge with a quick question.",
            checkButton: "Check Answer",
            nextButton: "Next Question",
            success: "Success!",
            incorrect: "Incorrect"
        },
        es: {
            title: `Quiz del Tema: ${module.title}`,
            description: "Pon a prueba tus conocimientos con una pregunta rápida.",
            checkButton: "Verificar Respuesta",
            nextButton: "Siguiente Pregunta",
            success: "¡Éxito!",
            incorrect: "Incorrecto"
        }
    }

    const { title, description, checkButton, nextButton, success, incorrect } = content[language];


  return (
    <div className='max-w-2xl mx-auto'>
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description} ({currentQuestionIndex + 1}/{quizQuestions.length})</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
                <div className='p-4 bg-muted rounded-lg'>
                    <p className='text-lg'>{question.question} <IMath>{question.formula}</IMath>?</p>
                </div>
                
                <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer} disabled={!!feedback}>
                    {question.options.map((option, index) => (
                         <Label key={index} htmlFor={`r${index}`} className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${selectedAnswer === option ? 'border-primary' : ''} hover:bg-muted/50`}>
                            <RadioGroupItem value={option} id={`r${index}`} />
                            <IMath>{option}</IMath>
                        </Label>
                    ))}
                </RadioGroup>

                {feedback && (
                    <Alert variant={feedback.correct ? 'default' : 'destructive'} className={feedback.correct ? 'border-green-500/50 text-green-700 dark:text-green-400' : ''}>
                        {feedback.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <AlertTitle>{feedback.correct ? success : incorrect}</AlertTitle>
                        <AlertDescription className={feedback.correct ? 'text-green-700 dark:text-green-400' : ''}>
                           {feedback.message} {!feedback.correct && <IMath>{question.correctAnswer}</IMath>}
                        </AlertDescription>
                    </Alert>
                )}

                <div className='flex justify-end'>
                    {feedback ? (
                         <Button onClick={handleNextQuestion}>{currentQuestionIndex < quizQuestions.length - 1 ? nextButton : (language === 'es' ? 'Finalizar Quiz' : 'Finish Quiz')}</Button>
                    ) : (
                        <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>{checkButton}</Button>
                    )}
                </div>

            </CardContent>
        </Card>
    </div>
  );
}
