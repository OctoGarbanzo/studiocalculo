'use server';

import { generatePracticeProblems, type GeneratePracticeProblemsInput } from '@/ai/flows/generate-practice-problems';

export async function getPracticeProblems(input: GeneratePracticeProblemsInput) {
  try {
    const result = await generatePracticeProblems(input);
    return result;
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate practice problems. Please try again." };
  }
}
