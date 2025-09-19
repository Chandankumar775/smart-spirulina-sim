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
  async ({ scenario, photoDataUri }) => {
    // Faked response for demo purposes
    // If a real photo was submitted, pretend to analyze it by adding some randomness.
    const isManualAnalysis = photoDataUri.length > 100; // a simple check to see if it's not the placeholder
    
    if (isManualAnalysis) {
        // Simulate a "real" analysis with some randomness
        const isContaminated = Math.random() > 0.85; // 15% chance of mock contamination on manual check
        if (isContaminated) {
            return {
                colorBalance: 'Needs Attention',
                estimatedBiomassDensity: 110 + Math.random() * 20,
                smellDetection: 'Contaminated',
                colorBalanceConfidence: 85 + Math.random() * 10,
                biomassDensityConfidence: 80 + Math.random() * 15,
                smellDetectionConfidence: 90 + Math.random() * 9,
            };
        }
         return {
            colorBalance: 'Healthy',
            estimatedBiomassDensity: 140 + Math.random() * 20,
            smellDetection: 'Normal',
            colorBalanceConfidence: 95 + Math.random() * 4,
            biomassDensityConfidence: 92 + Math.random() * 7,
            smellDetectionConfidence: 98 + Math.random() * 2,
        };
    }
    
    // Otherwise, use the scenario-based mock data
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
