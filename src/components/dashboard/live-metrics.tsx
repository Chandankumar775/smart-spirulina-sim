'use client';

import { useEffect, useState } from 'react';
import { Droplets, Thermometer, Sun, Wind, TestTube2, Activity, Leaf } from 'lucide-react';
import MetricCard from './metric-card';
import { useSimulation } from '@/hooks/use-simulation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const metricConfig = {
  growthScore: { label: 'Growth Score', icon: Leaf, unit: '%' },
  ph: { label: 'pH Level', icon: TestTube2, unit: '' },
  temperature: { label: 'Temperature', icon: Thermometer, unit: '°C' },
  lightIntensity: { label: 'Light Intensity', icon: Sun, unit: 'lux' },
  odorIndex: { label: 'Odor Index', icon: Wind, unit: '' },
  waterLevel: { label: 'Water Level', icon: Droplets, unit: '%' },
};

type MetricKey = keyof typeof metricConfig;

export default function LiveMetrics() {
  const { state } = useSimulation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient || !state.isRunning) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          </div>
        </CardContent>
      </Card>
    );
  }

  const metricKeys = Object.keys(metricConfig) as MetricKey[];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {metricKeys.map((key) => {
        const value = state.currentMetrics[key];
        if (value === undefined) return null;
        
        const config = metricConfig[key];
        const history = state.metricsHistory.map(h => ({ value: h[key] as number, timestamp: h.timestamp }));

        return (
          <MetricCard
            key={key}
            label={config.label}
            value={value}
            unit={config.unit}
            icon={config.icon}
            status={getMetricStatus(key, value)}
            data={history}
            className={key === 'growthScore' ? 'lg:col-span-2' : ''}
          />
        );
      })}
    </div>
  );
}
