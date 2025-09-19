
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SystemDiagramIcon } from '@/components/icons';
import { useSimulation } from '@/hooks/use-simulation';
import { cn } from '@/lib/utils';
import { Leaf, TestTube2, Thermometer } from 'lucide-react';
import SecondaryMetrics from './live-metrics';


const MetricDisplay = ({ icon: Icon, label, value, unit, statusColor }: { icon: React.ElementType, label: string, value: number, unit: string, statusColor: string }) => (
    <div className="flex-1 min-w-[120px] bg-background/50 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-foreground/80 mb-1">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </div>
        <div className="text-2xl font-bold text-white flex items-baseline justify-center gap-1">
            <span>{value.toFixed(1)}</span>
            <span className="text-sm font-normal text-foreground/70">{unit}</span>
        </div>
        <div className={cn("w-full h-1 rounded-full mt-2", statusColor)} />
    </div>
);


export default function SystemDiagram() {
    const { state } = useSimulation();
    const { currentMetrics, controls, scenario } = state;
    
    const getStatusColor = (key: 'growthScore' | 'ph' | 'temperature', value: number) => {
        switch (key) {
            case 'growthScore': return value > 80 ? 'bg-green-400' : value > 50 ? 'bg-yellow-400' : 'bg-red-400';
            case 'ph': return value > 9 && value < 10.5 ? 'bg-green-400' : 'bg-yellow-400';
            case 'temperature': return value > 28 && value < 32 ? 'bg-green-400' : 'bg-yellow-400';
            default: return 'bg-gray-400';
        }
    };
    
    const cultureHealth = scenario === 'contamination' ? 'hsl(210, 20%, 40%)' : 'hsl(210, 80%, 60%)';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 relative overflow-hidden bg-gray-800 border-gray-700 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-white">System Status</CardTitle>
                    <CardDescription className="text-gray-400">Live diagram of the cultivation tank.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="relative">
                        <SystemDiagramIcon
                            waterLevel={currentMetrics.waterLevel}
                            cultureColor={cultureHealth}
                            mixerOn={controls.mixerOn}
                            lightOn={controls.lightOn}
                        />
                        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-center gap-2 md:gap-4">
                           <MetricDisplay icon={Leaf} label="Growth Score" value={currentMetrics.growthScore} unit="%" statusColor={getStatusColor('growthScore', currentMetrics.growthScore)} />
                           <MetricDisplay icon={TestTube2} label="pH Level" value={currentMetrics.ph} unit="" statusColor={getStatusColor('ph', currentMetrics.ph)} />
                           <MetricDisplay icon={Thermometer} label="Temperature" value={currentMetrics.temperature} unit="°C" statusColor={getStatusColor('temperature', currentMetrics.temperature)} />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Secondary Metrics</CardTitle>
                    <CardDescription>Other sensor readings.</CardDescription>
                </CardHeader>
                <SecondaryMetrics />
            </Card>
        </div>
    );
}
