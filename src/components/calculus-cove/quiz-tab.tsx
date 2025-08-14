
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

const quizQuestions_en = [
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

const quizQuestions_es = [
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

export function QuizTab({ module }: { module: { id: string; title: string } }) {
    const { language } = useLanguage();
    const quizQuestions = language === 'en' ? quizQuestions_en : quizQuestions_es;

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{correct: boolean, message: string} | null>(null);
    const question = quizQuestions[0];

    const feedbackMessages = {
        en: {
            correct: "Correct! Excellent job.",
            incorrect: `Not quite. The correct answer is ${question.correctAnswer}.`
        },
        es: {
            correct: "¡Correcto! Excelente trabajo.",
            incorrect: `No es correcto. La respuesta correcta es ${question.correctAnswer}.`
        }
    }

    const handleCheckAnswer = () => {
        if (!selectedAnswer) return;

        if(selectedAnswer === question.correctAnswer) {
            setFeedback({correct: true, message: feedbackMessages[language].correct })
        } else {
            setFeedback({correct: false, message: feedbackMessages[language].incorrect })
        }
    }

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setFeedback(null);
        // Logic to load next question would go here
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
                <CardDescription>{description}</CardDescription>
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
                            {feedback.message}
                        </AlertDescription>
                    </Alert>
                )}

                <div className='flex justify-end'>
                    {feedback ? (
                         <Button onClick={handleNextQuestion}>{nextButton}</Button>
                    ) : (
                        <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>{checkButton}</Button>
                    )}
                </div>

            </CardContent>
        </Card>
    </div>
  );
}
