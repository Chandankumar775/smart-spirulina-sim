'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSimulation } from '@/hooks/use-simulation';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info, Power, Wrench, XCircle } from 'lucide-react';
import type { LogEntry } from '@/lib/types';

const logIcons = {
  alert: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  info: <Info className="h-4 w-4 text-blue-500" />,
  control: <Wrench className="h-4 w-4 text-gray-500" />,
  error: <XCircle className="h-4 w-4 text-destructive" />,
  harvest: <Power className="h-4 w-4 text-primary" />,
};

const logColors = {
  alert: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
  control: 'text-gray-600 dark:text-gray-400',
  error: 'text-destructive',
  harvest: 'text-primary',
};

export default function SystemLogsPanel() {
  const { state: { logs } } = useSimulation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Logs</CardTitle>
        <CardDescription>Real-time stream of alerts and system events.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full pr-4">
          <div className="space-y-3">
            {logs.length === 0 ? (
               <div className="text-center text-muted-foreground py-16">
                 No logs yet. System events will appear here.
               </div>
            ) : (
                logs.map((log: LogEntry) => (
                <div key={log.id} className="flex items-start gap-3 text-sm">
                    <div>{logIcons[log.type]}</div>
                    <div className="flex-1 grid grid-cols-12 gap-2">
                        <span className="col-span-3 text-muted-foreground">
                            {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                        <p className={cn("col-span-9", logColors[log.type])}>{log.message}</p>
                    </div>
                </div>
                ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
