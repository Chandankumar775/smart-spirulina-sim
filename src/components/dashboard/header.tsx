'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, TestTube, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SpirulinaTankIcon } from '@/components/icons';
import { useSimulation } from '@/hooks/use-simulation';
import SettingsDialog from './settings-dialog';
import { Scenario } from '@/lib/types';

export default function DashboardHeader() {
  const { state: { scenario }, dispatch } = useSimulation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleScenarioChange = (value: Scenario) => {
    dispatch({ type: 'SET_SCENARIO', payload: value });
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <SpirulinaTankIcon className="h-8 w-8 text-primary" />
          <span className="text-lg font-bold hidden sm:inline-block">Smart Spirulina Sim</span>
        </Link>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="relative flex items-center gap-2">
              <Select value={scenario} onValueChange={handleScenarioChange}>
                <SelectTrigger id="scenario-select" className="w-[180px]">
                  <SelectValue placeholder="Select Scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal Growth</SelectItem>
                  <SelectItem value="contamination">Contamination Event</SelectItem>
                  <SelectItem value="low-light">Low-light Failure</SelectItem>
                  <SelectItem value="rapid-growth">Rapid Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </header>
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}
