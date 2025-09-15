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

const analyzeCameraFeedForContaminationFlow = ai.defineFlow(
  {
    name: 'analyzeCameraFeedForContaminationFlow',
    inputSchema: AnalyzeCameraFeedInputSchema,
    outputSchema: AnalyzeCameraFeedOutputSchema,
  },
  async input => {
    // Faked response for demo purposes
    const isContaminated = Math.random() < 0.2; // 20% chance of contamination for demo
    
    if (isContaminated) {
      return {
        colorBalance: 'Needs Attention',
        estimatedBiomassDensity: 120.5,
        smellDetection: 'Contaminated',
        colorBalanceConfidence: Math.random() * 15 + 80, // 80-95%
        biomassDensityConfidence: Math.random() * 10 + 85, // 85-95%
        smellDetectionConfidence: Math.random() * 20 + 75, // 75-95%
      };
    }

    return {
      colorBalance: 'Healthy',
      estimatedBiomassDensity: 85.3,
      smellDetection: 'Normal',
      colorBalanceConfidence: Math.random() * 10 + 90, // 90-100%
      biomassDensityConfidence: Math.random() * 5 + 95, // 95-100%
      smellDetectionConfidence: Math.random() * 5 + 95, // 95-100%
    };
  }
);
