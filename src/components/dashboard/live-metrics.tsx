'use client';

import { Droplets, Thermometer, Sun, Wind, TestTube2, Percent, Activity, Leaf } from 'lucide-react';
import MetricCard from './metric-card';
import { useSimulation } from '@/hooks/use-simulation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const metricConfig = {
  waterLevel: { label: 'Water Level', icon: Droplets, unit: '%' },
  ph: { label: 'pH Level', icon: TestTube2, unit: '' },
  dissolvedOxygen: { label: 'Dissolved Oxygen', icon: Wind, unit: 'mg/L' },
  turbidity: { label: 'Turbidity', icon: Activity, unit: 'NTU' },
  temperature: { label: 'Temperature', icon: Thermometer, unit: '°C' },
  lightIntensity: { label: 'Light Intensity', icon: Sun, unit: 'lux' },
  odorIndex: { label: 'Odor Index', icon: Wind, unit: '' },
  growthScore: { label: 'Growth Score', icon: Leaf, unit: '%' },
};

type MetricKey = keyof typeof metricConfig;

export default function LiveMetrics() {
  const { state } = useSimulation();

  if (!state.isRunning) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Metrics</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)] flex items-center justify-center text-muted-foreground">
          <p>Simulation paused. Click "Start Demo" on the home page.</p>
        </CardContent>
      </Card>
    );
  }

  const getMetricStatus = (key: MetricKey, value: number) => {
    switch (key) {
      case 'waterLevel':
        return value < 70 ? 'error' : value < 80 ? 'warning' : 'ok';
      case 'ph':
        return value < 8 || value > 11 ? 'error' : value < 9 || value > 10.5 ? 'warning' : 'ok';
      case 'dissolvedOxygen':
        return value < 4 ? 'error' : value < 6 ? 'warning' : 'ok';
      case 'turbidity':
        return value > 200 ? 'error' : value > 150 ? 'warning' : 'ok';
      case 'temperature':
        return value < 25 || value > 35 ? 'error' : value < 28 || value > 32 ? 'warning' : 'ok';
      case 'odorIndex':
        return value > 70 ? 'error' : value > 50 ? 'warning' : 'ok';
      case 'growthScore':
        return value < 50 ? 'warning' : 'ok';
      default:
        return 'ok';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.entries(state.currentMetrics).map(([key, value]) => {
        if (key === 'timestamp') return null;
        const config = metricConfig[key as MetricKey];
        if (!config) return null;
        
        const history = state.metricsHistory.map(h => ({ value: h[key as MetricKey] as number, timestamp: h.timestamp }));

        return (
          <MetricCard
            key={key}
            label={config.label}
            value={value}
            unit={config.unit}
            icon={config.icon}
            status={getMetricStatus(key as MetricKey, value)}
            data={history}
          />
        );
      })}
    </div>
  );
}
