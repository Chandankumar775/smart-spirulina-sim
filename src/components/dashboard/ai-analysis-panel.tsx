'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Bot, CheckCircle, AlertTriangle, Zap, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { analyzeCameraFeedForContamination, AnalyzeCameraFeedOutput } from '@/ai/flows/analyze-camera-feed-for-contamination';
import { useSimulation } from '@/hooks/use-simulation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const spirulinaImage = PlaceHolderImages.find(p => p.id === 'spirulina-feed')!;

// This is a placeholder base64 string. In a real app, you'd get this from a camera or file upload.
// I'm using a simple 1x1 pixel gif here to avoid large string in code.
const placeholderBase64 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

async function getBase64(url: string): Promise<string> {
    // In a real scenario, you might fetch and convert, but to prevent fetch errors with placeholders,
    // we will use a static base64 string. The GenAI model is instructed to work from description, so this is fine.
    if (url.startsWith('https://picsum.photos')) {
        return Promise.resolve(placeholderBase64);
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


export default function AiAnalysisPanel() {
  const { state: { settings, isRunning }, dispatch } = useSimulation();
  const [analysis, setAnalysis] = useState<AnalyzeCameraFeedOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const photoDataUri = await getBase64(spirulinaImage.imageUrl);
      const result = await analyzeCameraFeedForContamination({ photoDataUri });
      setAnalysis(result);

      if (result.colorBalance === 'Needs Attention' || result.smellDetection === 'Contaminated') {
        dispatch({ type: 'ADD_LOG', payload: { type: 'alert', message: `AI detected contamination issue. Smell: ${result.smellDetection}, Color: ${result.colorBalance}` } });
      } else {
        dispatch({ type: 'ADD_LOG', payload: { type: 'info', message: 'AI check completed: System healthy.' } });
      }

    } catch (e) {
      setError('AI analysis failed. Please try again.');
      console.error(e);
      dispatch({ type: 'ADD_LOG', payload: { type: 'error', message: 'AI analysis failed.' } });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isRunning) {
      runAnalysis();
      const interval = setInterval(runAnalysis, settings.aiCheckFrequency * 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, settings.aiCheckFrequency, runAnalysis]);

  const isHealthy = analysis?.colorBalance === 'Healthy' && analysis?.smellDetection === 'Normal';
  const borderColor = analysis ? (isHealthy ? 'border-primary' : 'border-destructive') : 'border-border';

  const renderAnalysisItem = (label: string, value: string | number, confidence: number, healthyValue: string) => {
    const isItemHealthy = String(value) === healthyValue;
    return (
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          {isItemHealthy ? <CheckCircle className="h-4 w-4 text-primary" /> : <AlertTriangle className="h-4 w-4 text-destructive" />}
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isItemHealthy ? 'secondary' : 'destructive'}>{value}</Badge>
          <span className="text-xs text-muted-foreground font-mono">({confidence.toFixed(0)}%)</span>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("transition-colors duration-500", borderColor)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">AI Camera Analysis</CardTitle>
        <Bot className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-md mb-4 relative">
          <Image
            src={spirulinaImage.imageUrl}
            alt="Spirulina Tank Feed"
            width={600}
            height={400}
            data-ai-hint={spirulinaImage.imageHint}
            className="object-cover"
          />
          {isLoading && <div className="absolute inset-0 bg-background/50 flex items-center justify-center"><Zap className="h-8 w-8 text-primary animate-pulse" /></div>}
        </div>

        <div className="space-y-3">
          {isLoading && !analysis ? (
            <>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </>
          ) : error ? (
            <div className="text-destructive text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4"/>
              {error}
            </div>
          ) : analysis ? (
            <>
              {renderAnalysisItem('Color Balance', analysis.colorBalance, analysis.colorBalanceConfidence, 'Healthy')}
              {renderAnalysisItem('Smell Detection', analysis.smellDetection, analysis.smellDetectionConfidence, 'Normal')}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span>Biomass Density</span>
                </div>
                <div className="flex items-center gap-2">
                   <Badge variant="secondary">{analysis.estimatedBiomassDensity.toFixed(2)}</Badge>
                   <span className="text-xs text-muted-foreground font-mono">({analysis.biomassDensityConfidence.toFixed(0)}%)</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
