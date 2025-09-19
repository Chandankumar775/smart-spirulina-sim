import { SimulationState, Metrics, SimulationSettings, ControlState, HarvestReport } from './types';

export const INITIAL_METRICS: Metrics = {
  timestamp: Date.now(),
  waterLevel: 85.0,
  ph: 9.5,
  temperature: 29.5,
  lightIntensity: 55000,
  odorIndex: 10.0,
  growthScore: 75.0,
};

export const INITIAL_SETTINGS: SimulationSettings = {
  updateFrequency: 1, // seconds
  growthRate: 1.0, // multiplier
  contaminationProbability: 0.005,
  aiCheckFrequency: 30, // seconds
};

export const INITIAL_CONTROLS: ControlState = {
  mixerOn: false,
  lightOn: true,
};

const MOCK_HARVESTS: HarvestReport[] = [
    {
        id: 'harvest-1',
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
        weight: 155.6,
        quality: 92.5,
        waterReused: 95.1
    },
    {
        id: 'harvest-2',
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
        weight: 142.1,
        quality: 94.2,
        waterReused: 94.5
    },
    {
        id: 'harvest-3',
        timestamp: Date.now() - 11 * 24 * 60 * 60 * 1000, // 11 days ago
        weight: 163.8,
        quality: 88.9,
        waterReused: 93.2
    }
];


export const INITIAL_STATE: SimulationState = {
  isRunning: false,
  scenario: 'normal',
  currentMetrics: INITIAL_METRICS,
  metricsHistory: [INITIAL_METRICS],
  settings: INITIAL_SETTINGS,
  controls: INITIAL_CONTROLS,
  logs: [],
  harvests: MOCK_HARVESTS,
};

export const METRIC_RANGES = {
  ph: { min: 8.0, max: 11.0, optimal: [9.0, 10.5] },
  temperature: { min: 20, max: 40, optimal: [28, 32] },
};
