'use client';

import { Droplets, Thermometer, Sun, Wind, TestTube2, Activity, Leaf } from 'lucide-react';
import { useSimulation } from '@/hooks/use-simulation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { MetricKey } from '@/lib/types';

const metricConfig = {
  lightIntensity: { label: 'Light Intensity', icon: Sun, unit: 'lux' },
  odorIndex: { label: 'Odor Index', icon: Wind, unit: '' },
  waterLevel: { label: 'Water Level', icon: Droplets, unit: '%' },
};

const statusColors = {
  ok: 'text-primary',
  warning: 'text-yellow-500',
  error: 'text-destructive',
};

const getMetricStatus = (key: MetricKey, value: number) => {
    switch (key) {
      case 'waterLevel':
        return value < 70 ? 'error' : value < 80 ? 'warning' : 'ok';
      case 'ph':
        return value < 8 || value > 11 ? 'error' : value < 9 || value > 10.5 ? 'warning' : 'ok';
      case 'temperature':
        return value < 25 || value > 35 ? 'error' : value < 28 || value > 32 ? 'warning' : 'ok';
      case 'odorIndex':
        return value > 70 ? 'error' : value > 50 ? 'warning' : 'ok';
      case 'growthScore':
        return value < 50 ? 'warning' : value > 90 ? 'ok' : 'ok';
      default:
        return 'ok';
    }
  };


export default function SecondaryMetrics() {
  const { state } = useSimulation();

  if (!state.isRunning) {
    return (
        <CardContent className="grid grid-cols-2 gap-4">
            {Object.keys(metricConfig).map((key) => (
                <div key={key} className="p-4 border rounded-lg bg-card shadow-sm">
                    <div className="flex items-center justify-between pb-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <Skeleton className="h-6 w-1/3 mb-1" />
                    <Skeleton className="h-3 w-1/4" />
                </div>
            ))}
        </CardContent>
    );
  }

  const metricKeys = Object.keys(metricConfig) as MetricKey[];

  return (
    <CardContent className="grid grid-cols-2 gap-4 pt-6">
      {metricKeys.map((key) => {
        const value = state.currentMetrics[key];
        if (value === undefined) return null;
        
        const config = metricConfig[key];
        const status = getMetricStatus(key, value);
        const Icon = config.icon;

        return (
          <div key={key} className="p-3 rounded-lg border bg-background flex flex-col justify-between hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-sm font-medium">{config.label}</span>
                <Icon className="h-4 w-4" />
            </div>
            <div>
                 <div className="text-xl font-bold flex items-baseline gap-1">
                    <span>{value.toFixed(1)}</span>
                    <span className="text-xs font-normal text-muted-foreground">{config.unit}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className={cn('h-2 w-2 rounded-full', statusColors[status].replace('text-', 'bg-'))} />
                    <span className={cn('capitalize',statusColors[status])}>
                        {status}
                    </span>
                </div>
            </div>
          </div>
        );
      })}
    </CardContent>
  );
}
