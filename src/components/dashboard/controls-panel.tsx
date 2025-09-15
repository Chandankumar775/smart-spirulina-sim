'use client';

import { Layers, Lightbulb, LightbulbOff, Droplets, Combine, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSimulation } from '@/hooks/use-simulation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function ControlsPanel() {
  const { state: { controls }, dispatch } = useSimulation();

  const handleControlClick = (control: 'mixer' | 'light' | 'harvest' | 'flush') => {
    dispatch({ type: 'LOG_CONTROL_ACTION', payload: control });
    switch (control) {
      case 'mixer':
        dispatch({ type: 'TOGGLE_MIXER' });
        break;
      case 'light':
        dispatch({ type: 'TOGGLE_LIGHT' });
        break;
      case 'harvest':
        dispatch({ type: 'TRIGGER_HARVEST' });
        break;
      case 'flush':
        dispatch({ type: 'FLUSH_WATER' });
        break;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">System Controls</CardTitle>
        <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={controls.mixerOn ? "default" : "outline"}
            onClick={() => handleControlClick('mixer')}
            className="flex flex-col h-20 gap-1"
          >
            <Layers className="h-6 w-6" />
            <span>Mixer</span>
            <span className={cn("text-xs", controls.mixerOn ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {controls.mixerOn ? 'ON' : 'OFF'}
            </span>
          </Button>

          <Button
            variant={controls.lightOn ? "default" : "outline"}
            onClick={() => handleControlClick('light')}
            className="flex flex-col h-20 gap-1"
          >
            {controls.lightOn ? <Lightbulb className="h-6 w-6" /> : <LightbulbOff className="h-6 w-6" />}
            <span>Light</span>
             <span className={cn("text-xs", controls.lightOn ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {controls.lightOn ? 'ON' : 'OFF'}
            </span>
          </Button>

          <Button variant="outline" onClick={() => handleControlClick('flush')} className="flex flex-col h-20 gap-1">
            <Droplets className="h-6 w-6" />
            <span>Flush Water</span>
          </Button>

          <Button variant="outline" onClick={() => handleControlClick('harvest')} className="flex flex-col h-20 gap-1 bg-accent/20 border-accent text-accent-foreground hover:bg-accent/30">
            <Combine className="h-6 w-6" />
            <span>Trigger Harvest</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
