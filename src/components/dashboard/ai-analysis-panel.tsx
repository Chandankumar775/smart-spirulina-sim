'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Bot, CheckCircle, AlertTriangle, Zap, Percent, Upload, Camera, FlaskConical, Droplets, Microscope, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { analyzeCameraFeedForContamination, AnalyzeCameraFeedOutput } from '@/ai/flows/analyze-camera-feed-for-contamination';
import { useSimulation } from '@/hooks/use-simulation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '../ui/separator';


export default function AiAnalysisPanel() {
  const { state: { settings, isRunning, scenario }, dispatch } = useSimulation();
  const [analysis, setAnalysis] = useState<AnalyzeCameraFeedOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not available in this browser.');
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);
  

  const runAnalysis = useCallback(async (imageDataUri?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeCameraFeedForContamination({ photoDataUri: imageDataUri || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", scenario });
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
  }, [dispatch, scenario]);

  useEffect(() => {
    if (isRunning) {
      runAnalysis();
      const interval = setInterval(() => runAnalysis(), settings.aiCheckFrequency * 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, settings.aiCheckFrequency, runAnalysis]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        runAnalysis(dataUri);
        dispatch({ type: 'ADD_LOG', payload: { type: 'info', message: 'Manual analysis initiated from uploaded image.' } });
      };
      reader.onerror = () => {
        toast({
            variant: 'destructive',
            title: 'File Read Error',
            description: 'Could not read the selected file.',
        });
      }
      reader.readAsDataURL(file);
    }
  };


  const isHealthy = analysis?.algaeHealth === 'Optimal' && analysis?.contaminationType === 'None';
  const borderColor = analysis ? (isHealthy ? 'border-primary' : 'border-destructive') : 'border-border';

  const renderAnalysisItem = (Icon: React.ElementType, label: string, value: string | number, healthyValues: (string|number)[]) => {
    const isItemHealthy = healthyValues.includes(String(value));
    return (
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className={cn("h-4 w-4", isItemHealthy ? 'text-primary' : 'text-destructive')} />
          <span>{label}</span>
        </div>
        <Badge variant={isItemHealthy ? 'secondary' : 'destructive'}>{value}</Badge>
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
        <div className="aspect-video w-full overflow-hidden rounded-md mb-4 relative bg-muted flex items-center justify-center">
          <video ref={videoRef} className={cn("w-full aspect-video rounded-md", hasCameraPermission ? "block" : "hidden")} autoPlay muted />
          {hasCameraPermission === false && (
             <div className="p-4">
                <Alert variant="destructive">
                    <Camera className="h-4 w-4"/>
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access in your browser to use this feature. You can still upload an image.
                    </AlertDescription>
                </Alert>
             </div>
          )}
           {hasCameraPermission === null && (
             <Zap className="h-8 w-8 text-primary animate-pulse" />
          )}

          {isLoading && <div className="absolute inset-0 bg-background/50 flex items-center justify-center"><Zap className="h-8 w-8 text-primary animate-pulse" /></div>}
        </div>
        
        {imagePreview && (
             <div className="aspect-video w-full overflow-hidden rounded-md mb-4 relative bg-muted">
                <Image 
                    src={imagePreview} 
                    alt="Uploaded spirulina tank" 
                    fill 
                    className="object-cover" 
                />
            </div>
        )}

        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
        />

        <div className="space-y-3">
           <Button onClick={handleUploadClick} disabled={isLoading} className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Tank Image
          </Button>

          {isLoading && !analysis ? (
            <div className='space-y-2 pt-2'>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : error ? (
            <div className="text-destructive text-sm flex items-center gap-2 pt-2">
              <AlertTriangle className="h-4 w-4"/>
              {error}
            </div>
          ) : analysis && imagePreview ? ( // only show full report on manual upload
            <div className="space-y-4 pt-4">
                <CardTitle className="text-lg">AI Analysis Report</CardTitle>
                <div className="grid gap-3">
                    {renderAnalysisItem(CheckCircle, 'Overall Health', analysis.algaeHealth, ['Optimal'])}
                    {renderAnalysisItem(FlaskConical, 'Color Balance', analysis.colorBalance, ['Healthy'])}
                    {renderAnalysisItem(Droplets, 'Water Clarity', analysis.waterClarity, ['Clear'])}
                    {renderAnalysisItem(Microscope, 'Contamination', analysis.contaminationType, ['None'])}
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
                </div>
                <Separator />
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <FileText className="h-4 w-4" />
                       <h4 className="font-medium">Recommendation</h4>
                    </div>
                    <p className="text-sm text-foreground/80 p-2 bg-accent/50 rounded-md">{analysis.recommendation}</p>
                </div>
            </div>
          ) : analysis ? (
            <div className='pt-2 text-sm text-center text-muted-foreground'>
                Upload an image to generate a detailed report.
            </div>
          ): null}
        </div>
      </CardContent>
    </Card>
  );
}
