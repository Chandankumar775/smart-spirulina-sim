import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SpirulinaTankIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <Card className="w-full max-w-lg text-center shadow-2xl">
        <CardHeader className="p-8">
          <div className="mx-auto mb-6">
            <SpirulinaTankIcon className="h-32 w-32 text-primary" />
          </div>
          <CardTitle className="text-4xl font-bold text-primary font-headline">
            Smart Spirulina Sim
          </CardTitle>
          <p className="text-muted-foreground pt-2">
            Simulating a smart, AI-powered spirulina cultivation system.
          </p>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <Button asChild size="lg" className="w-full font-bold text-lg">
            <Link href="/dashboard">Start Demo</Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            No hardware connected. All data is from a live simulation.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
