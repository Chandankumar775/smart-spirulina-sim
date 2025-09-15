'use server';
/**
 * @fileOverview Analyzes the simulated camera feed for signs of contamination and estimates biomass density.
 *
 * - analyzeCameraFeedForContamination - A function that handles the camera feed analysis process.
 * - AnalyzeCameraFeedInput - The input type for the analyzeCameraFeedForContamination function.
 * - AnalyzeCameraFeedOutput - The return type for the analyzeCameraFeedForContamination function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCameraFeedInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the camera feed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeCameraFeedInput = z.infer<typeof AnalyzeCameraFeedInputSchema>;

const AnalyzeCameraFeedOutputSchema = z.object({
  colorBalance: z.enum(['Healthy', 'Needs Attention']).describe('The color balance of the spirulina culture.'),
  estimatedBiomassDensity: z.number().describe('The estimated biomass density of the spirulina culture.'),
  smellDetection: z.enum(['Normal', 'Contaminated']).describe('The smell detection of the spirulina culture.'),
  colorBalanceConfidence: z.number().min(0).max(100).describe('Confidence score for color balance (0-100%).'),
  biomassDensityConfidence: z.number().min(0).max(100).describe('Confidence score for biomass density (0-100%).'),
  smellDetectionConfidence: z.number().min(0).max(100).describe('Confidence score for smell detection (0-100%).'),
});
export type AnalyzeCameraFeedOutput = z.infer<typeof AnalyzeCameraFeedOutputSchema>;

export async function analyzeCameraFeedForContamination(input: AnalyzeCameraFeedInput): Promise<AnalyzeCameraFeedOutput> {
  return analyzeCameraFeedForContaminationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCameraFeedForContaminationPrompt',
  input: {schema: AnalyzeCameraFeedInputSchema},
  output: {schema: AnalyzeCameraFeedOutputSchema},
  prompt: `You are an AI assistant that analyzes a camera feed of a spirulina culture to detect contamination and estimate biomass density.

  Analyze the following camera feed:
  {{media url=photoDataUri}}

  Based on the image, determine the color balance (Healthy or Needs Attention), estimate the biomass density (numeric value), and detect the smell (Normal or Contaminated).
  Also, provide confidence scores (0-100%) for each of the three metrics.

  Make sure the output strictly adheres to the AnalyzeCameraFeedOutputSchema.`,
});

const analyzeCameraFeedForContaminationFlow = ai.defineFlow(
  {
    name: 'analyzeCameraFeedForContaminationFlow',
    inputSchema: AnalyzeCameraFeedInputSchema,
    outputSchema: AnalyzeCameraFeedOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
