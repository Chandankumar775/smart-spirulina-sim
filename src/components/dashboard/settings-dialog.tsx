'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useSimulation } from '@/hooks/use-simulation';
import { SimulationSettings } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { state, dispatch } = useSimulation();

  const handleSettingsChange = (key: keyof SimulationSettings, value: number) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simulation Settings</DialogTitle>
          <DialogDescription>
            Tune the parameters of the simulation. Changes are applied in real-time.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="update-freq">Update Frequency</Label>
             <Select
              value={String(state.settings.updateFrequency)}
              onValueChange={(val) => handleSettingsChange('updateFrequency', Number(val))}
            >
              <SelectTrigger id="update-freq">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 second (Fast)</SelectItem>
                <SelectItem value="3">3 seconds (Normal)</SelectItem>
                <SelectItem value="5">5 seconds (Slow)</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="growth-rate">Growth Rate: {state.settings.growthRate.toFixed(2)}</Label>
            <Slider
              id="growth-rate"
              min={0.1}
              max={2}
              step={0.1}
              value={[state.settings.growthRate]}
              onValueChange={([val]) => handleSettingsChange('growthRate', val)}
            />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="contamination-prob">Contamination Probability: {(state.settings.contaminationProbability * 100).toFixed(0)}%</Label>
            <Slider
              id="contamination-prob"
              min={0}
              max={0.1}
              step={0.005}
              value={[state.settings.contaminationProbability]}
              onValueChange={([val]) => handleSettingsChange('contaminationProbability', val)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ai-freq">AI Check Frequency: {state.settings.aiCheckFrequency}s</Label>
            <Slider
              id="ai-freq"
              min={10}
              max={60}
              step={5}
              value={[state.settings.aiCheckFrequency]}
              onValueChange={([val]) => handleSettingsChange('aiCheckFrequency', val)}
            />
          </div>
        </div>
        <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
