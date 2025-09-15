import { SimulationState, Metrics, SimulationSettings, ControlState } from './types';

export const INITIAL_METRICS: Metrics = {
  timestamp: Date.now(),
  waterLevel: 85.0,
  ph: 9.5,
  dissolvedOxygen: 7.2,
  turbidity: 45.0,
  temperature: 29.5,
  lightIntensity: 55000,
  odorIndex: 10.0,
  growthScore: 75.0,
};

export const INITIAL_SETTINGS: SimulationSettings = {
  updateFrequency: 3, // seconds
  growthRate: 1.0, // multiplier
  contaminationProbability: 0.005,
  aiCheckFrequency: 30, // seconds
};

export const INITIAL_CONTROLS: ControlState = {
  mixerOn: false,
  lightOn: true,
};

export const INITIAL_STATE: SimulationState = {
  isRunning: false,
  scenario: 'normal',
  currentMetrics: INITIAL_METRICS,
  metricsHistory: [INITIAL_METRICS],
  settings: INITIAL_SETTINGS,
  controls: INITIAL_CONTROLS,
  logs: [],
  harvests: [],
};

export const METRIC_RANGES = {
  ph: { min: 8.0, max: 11.0, optimal: [9.0, 10.5] },
  temperature: { min: 20, max: 40, optimal: [28, 32] },
  dissolvedOxygen: { min: 2, max: 15, optimal: [6, 10] },
};
