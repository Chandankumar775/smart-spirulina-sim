'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalyticsPanel from './analytics-panel';
import HarvestLogsPanel from './harvest-logs-panel';
import SystemLogsPanel from './system-logs-panel';

export default function MainTabs() {
  return (
    <Tabs defaultValue="analytics" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="analytics">Analytics & Trends</TabsTrigger>
        <TabsTrigger value="harvests">Harvest Logs</TabsTrigger>
        <TabsTrigger value="logs">Alerts & System Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="analytics">
        <AnalyticsPanel />
      </TabsContent>
      <TabsContent value="harvests">
        <HarvestLogsPanel />
      </TabsContent>
      <TabsContent value="logs">
        <SystemLogsPanel />
      </TabsContent>
    </Tabs>
  );
}
