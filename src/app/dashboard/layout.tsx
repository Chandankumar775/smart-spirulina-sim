import { SimulationProvider } from '@/contexts/simulation-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SimulationProvider>{children}</SimulationProvider>;
}
