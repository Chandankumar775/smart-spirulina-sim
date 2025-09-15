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
import type { Scenario } from '@/lib/types';

const AnalyzeCameraFeedInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the camera feed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  scenario: z.enum(['normal', 'contamination', 'low-light', 'rapid-growth']).describe('The current simulation scenario.'),
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

const analyzeCameraFeedForContaminationFlow = ai.defineFlow(
  {
    name: 'analyzeCameraFeedForContaminationFlow',
    inputSchema: AnalyzeCameraFeedInputSchema,
    outputSchema: AnalyzeCameraFeedOutputSchema,
  },
  async ({ scenario }) => {
    // Faked response for demo purposes, based on scenario
    const isContaminated = scenario === 'contamination';
    
    if (isContaminated) {
      return {
        colorBalance: 'Needs Attention',
        estimatedBiomassDensity: 120.5,
        smellDetection: 'Contaminated',
        colorBalanceConfidence: 91.3,
        biomassDensityConfidence: 89.1,
        smellDetectionConfidence: 94.6,
      };
    }

    const isRapidGrowth = scenario === 'rapid-growth';

    return {
      colorBalance: 'Healthy',
      estimatedBiomassDensity: isRapidGrowth ? 150.2 : 85.3,
      smellDetection: 'Normal',
      colorBalanceConfidence: 98.2,
      biomassDensityConfidence: 96.5,
      smellDetectionConfidence: 99.1,
    };
  }
);
