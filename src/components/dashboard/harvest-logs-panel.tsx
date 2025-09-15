'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { useSimulation } from '@/hooks/use-simulation';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function HarvestLogsPanel() {
  const { state: { harvests } } = useSimulation();

  const handleExport = () => {
    alert("Simulating harvest report download...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Harvest History</CardTitle>
        <CardDescription>Records of all completed spirulina harvests.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Weight (g)</TableHead>
                <TableHead className="text-center">Quality</TableHead>
                <TableHead className="text-right">Water Reused (%)</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {harvests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                    No harvests recorded yet.
                  </TableCell>
                </TableRow>
              ) : (
                harvests.map((harvest) => (
                  <TableRow key={harvest.id}>
                    <TableCell>{new Date(harvest.timestamp).toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono">{harvest.weight.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={harvest.quality > 85 ? 'default' : 'secondary'}>
                        {harvest.quality.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{harvest.waterReused.toFixed(1)}%</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
