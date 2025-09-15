'use client';

import { useMemo, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useSimulation } from '@/hooks/use-simulation';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MetricKey = 'ph' | 'dissolvedOxygen' | 'turbidity' | 'waterLevel' | 'temperature';

const chartConfigs: Record<MetricKey, { name: string; color: string; predColor: string }> = {
  ph: { name: 'pH Level', color: 'hsl(var(--chart-1))', predColor: 'hsl(var(--chart-1))' },
  dissolvedOxygen: { name: 'Dissolved Oxygen (mg/L)', color: 'hsl(var(--chart-2))', predColor: 'hsl(var(--chart-2))' },
  turbidity: { name: 'Turbidity / Density', color: 'hsl(var(--chart-3))', predColor: 'hsl(var(--chart-3))' },
  waterLevel: { name: 'Water Level (%)', color: 'hsl(var(--chart-4))', predColor: 'hsl(var(--chart-4))' },
  temperature: { name: 'Temperature (°C)', color: 'hsl(var(--chart-5))', predColor: 'hsl(var(--chart-5))' },
};

export default function AnalyticsPanel() {
  const { state } = useSimulation();
  const [activeChart, setActiveChart] = useState<MetricKey>('turbidity');
  const [timeRange, setTimeRange] = useState('1h');

  const chartData = useMemo(() => {
    const now = Date.now();
    let limit;
    switch (timeRange) {
      case '1h': limit = now - 60 * 60 * 1000; break;
      case '24h': limit = now - 24 * 60 * 60 * 1000; break;
      default: limit = 0;
    }
    
    const filtered = state.metricsHistory.filter(h => h.timestamp > limit);
    if(filtered.length === 0) return [];

    const lastEntry = filtered[filtered.length - 1];
    const prediction = {
      ...lastEntry,
      timestamp: lastEntry.timestamp + 5 * 60 * 1000, // 5 min into future
      ph_pred: lastEntry.ph * (1 + (Math.random() - 0.5) * 0.02),
      dissolvedOxygen_pred: lastEntry.dissolvedOxygen * (1 + (Math.random() - 0.5) * 0.05),
      turbidity_pred: lastEntry.turbidity * (1 + state.settings.growthRate * 0.1),
      waterLevel_pred: lastEntry.waterLevel - 0.1,
      temperature_pred: lastEntry.temperature,
    };

    return [...filtered, prediction];
  }, [state.metricsHistory, state.settings.growthRate, timeRange]);
  
  if (!state.isRunning) {
    return (
       <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Start the simulation to see historical data.</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
        </CardContent>
       </Card>
    );
  }

  const renderChart = (metric: MetricKey) => (
    <div className="h-72">
        <ChartContainer
            config={{
                [metric]: {
                    label: chartConfigs[metric].name,
                    color: chartConfigs[metric].color,
                },
                [`${metric}_pred`]: {
                    label: 'Prediction',
                    color: chartConfigs[metric].predColor,
                },
            }}
            className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip
                content={<ChartTooltipContent
                    formatter={(value, name) => (
                        <div className="flex items-center justify-between w-full">
                            <span>{name === `${metric}_pred` ? 'Prediction' : chartConfigs[metric].name}</span>
                            <span className="font-bold ml-4">{Number(value).toFixed(2)}</span>
                        </div>
                    )}
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                />}
                cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={metric}
                name={chartConfigs[metric].name}
                stroke={chartConfigs[metric].color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey={`${metric}_pred`}
                name="Prediction"
                stroke={chartConfigs[metric].predColor}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Historical Trends</CardTitle>
                <CardDescription>Time-series data for key system metrics.</CardDescription>
            </div>
            <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
                <TabsList>
                    <TabsTrigger value="1h">1H</TabsTrigger>
                    <TabsTrigger value="24h">24H</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeChart} onValueChange={(v) => setActiveChart(v as MetricKey)} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="turbidity">Biomass</TabsTrigger>
                <TabsTrigger value="ph">pH</TabsTrigger>
                <TabsTrigger value="dissolvedOxygen">Oxygen</TabsTrigger>
                <TabsTrigger value="waterLevel">Water Level</TabsTrigger>
                <TabsTrigger value="temperature">Temp</TabsTrigger>
            </TabsList>
            <div className="pt-4">
                {renderChart(activeChart)}
            </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
