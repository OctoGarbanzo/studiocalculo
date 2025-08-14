
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating practice problems for calculus topics.
 *
 * The flow takes a topic as input and returns a set of practice problems related to that topic.
 *
 * @module src/ai/flows/generate-practice-problems
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const GeneratePracticeProblemsInputSchema = z.object({
  topic: z.string().describe('The calculus topic for which to generate practice problems.'),
  quantity: z.number().default(5).describe('The quantity of problems to generate'),
});
export type GeneratePracticeProblemsInput = z.infer<typeof GeneratePracticeProblemsInputSchema>;

const GeneratePracticeProblemsOutputSchema = z.object({
  problems: z.array(z.string()).describe('An array of practice problems for the given topic.'),
});
export type GeneratePracticeProblemsOutput = z.infer<typeof GeneratePracticeProblemsOutputSchema>;


export async function generatePracticeProblems(input: GeneratePracticeProblemsInput): Promise<GeneratePracticeProblemsOutput> {
  return generatePracticeProblemsFlow(input);
}


const generatePracticeProblemsPrompt = ai.definePrompt({
  name: 'generatePracticeProblemsPrompt',
  input: {
    schema: GeneratePracticeProblemsInputSchema,
  },
  output: {
    schema: GeneratePracticeProblemsOutputSchema,
  },
  prompt: `Eres un profesor de cálculo que está generando problemas de práctica para tus estudiantes.

  Genera {{quantity}} problemas de práctica para el siguiente tema:

  {{topic}}

  Asegúrate de que los problemas sean diversos y cubran un rango de dificultades.

  La salida DEBE ser un array JSON de strings, donde cada string es un problema de práctica. No incluyas ningún otro texto además del JSON.
  `,
});

const generatePracticeProblemsFlow = ai.defineFlow(
  {
    name: 'generatePracticeProblemsFlow',
    inputSchema: GeneratePracticeProblemsInputSchema,
    outputSchema: GeneratePracticeProblemsOutputSchema,
  },
  async input => {
    const {output} = await generatePracticeProblemsPrompt(input);
    return output!;
  }
);
