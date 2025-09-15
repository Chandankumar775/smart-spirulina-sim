export type MetricKey =
  | 'waterLevel'
  | 'ph'
  | 'dissolvedOxygen'
  | 'turbidity'
  | 'temperature'
  | 'lightIntensity'
  | 'odorIndex'
  | 'growthScore';

export type Metrics = {
  timestamp: number;
} & {
  [key in MetricKey]: number;
};

export type Scenario = 'normal' | 'contamination' | 'low-light' | 'rapid-growth';

export type SimulationSettings = {
  updateFrequency: number;
  growthRate: number;
  contaminationProbability: number;
  aiCheckFrequency: number;
};

export type ControlState = {
  mixerOn: boolean;
  lightOn: boolean;
};

export type LogType = 'info' | 'alert' | 'error' | 'control' | 'harvest';

export interface LogEntry {
  id: string;
  timestamp: number;
  type: LogType;
  message: string;
}

export interface HarvestReport {
  id: string;
  timestamp: number;
  weight: number;
  quality: number;
  waterReused: number;
}

export interface SimulationState {
  isRunning: boolean;
  scenario: Scenario;
  currentMetrics: Metrics;
  metricsHistory: Metrics[];
  settings: SimulationSettings;
  controls: ControlState;
  logs: LogEntry[];
  harvests: HarvestReport[];
}
