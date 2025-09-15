'use client';

import type { LucideProps } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MetricCardProps = {
  label: string;
  value: number;
  unit: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  status: 'ok' | 'warning' | 'error';
  data: { value: number; timestamp: number }[];
  className?: string;
};

const statusColors = {
  ok: 'text-primary',
  warning: 'text-yellow-500',
  error: 'text-destructive',
};

const sparklineColors = {
  ok: 'hsl(var(--primary))',
  warning: '#f59e0b',
  error: 'hsl(var(--destructive))',
};

export default function MetricCard({ label, value, unit, icon: Icon, status, data, className }: MetricCardProps) {
  const latestData = data.slice(-30);

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-lg hover:-translate-y-1", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-bold flex items-baseline gap-1">
              <span>{value.toFixed(1)}</span>
              <span className="text-sm font-normal text-muted-foreground">{unit}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className={cn('h-2 w-2 rounded-full', statusColors[status].replace('text-', 'bg-'))} />
              <span className={cn(statusColors[status])}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          </div>
          <div className="h-10 w-20">
            {latestData.length > 1 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={latestData}>
                   <Tooltip
                    contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                        fontSize: "12px",
                        padding: "4px 8px"
                    }}
                    labelFormatter={(label) => new Date(data[label as number]?.timestamp).toLocaleTimeString()}
                    formatter={(val) => [`${(val as number).toFixed(2)} ${unit}`, null]}
                   />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={sparklineColors[status]}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
