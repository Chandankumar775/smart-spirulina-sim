'use client';

import AiAnalysisPanel from '@/components/dashboard/ai-analysis-panel';
import ControlsPanel from '@/components/dashboard/controls-panel';
import DashboardHeader from '@/components/dashboard/header';
import SystemDiagram from '@/components/dashboard/system-diagram';
import MainTabs from '@/components/dashboard/main-tabs';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <SystemDiagram />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <AiAnalysisPanel />
            <ControlsPanel />
          </div>
          <div className="lg:col-span-12">
            <MainTabs />
          </div>
        </div>
      </main>
    </div>
  );
}
