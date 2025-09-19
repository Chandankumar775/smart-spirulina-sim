"use client";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type ConfidenceGaugeProps = {
    value: number;
    label: string;
};

export default function ConfidenceGauge({ value, label }: ConfidenceGaugeProps) {
    const isHealthy = value > 80;
    const color = isHealthy ? 'hsl(var(--primary))' : value > 50 ? '#f59e0b' : 'hsl(var(--destructive))';

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20">
                <CircularProgressbar
                    value={value}
                    text={`${value.toFixed(0)}%`}
                    styles={buildStyles({
                        pathColor: color,
                        textColor: 'hsl(var(--foreground))',
                        trailColor: 'hsl(var(--muted))',
                        textSize: '24px',
                    })}
                />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
    );
}
