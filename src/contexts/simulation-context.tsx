'use client';

import { createContext, useReducer, useEffect, Dispatch, ReactNode } from 'react';
import { SimulationState, Metrics, Scenario, SimulationSettings, LogEntry, HarvestReport } from '@/lib/types';
import { INITIAL_STATE, METRIC_RANGES } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/use-local-storage';

type Action =
  | { type: 'TICK' }
  | { type: 'SET_RUNNING'; payload: boolean }
  | { type: 'SET_SCENARIO'; payload: Scenario }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SimulationSettings> }
  | { type: 'TOGGLE_MIXER' }
  | { type: 'TOGGLE_LIGHT' }
  | { type: 'FLUSH_WATER' }
  | { type: 'TRIGGER_HARVEST' }
  | { type: 'ADD_LOG'; payload: Omit<LogEntry, 'id' | 'timestamp'> }
  | { type: 'LOG_CONTROL_ACTION', payload: string };

const reducer = (state: SimulationState, action: Action): SimulationState => {
  switch (action.type) {
    case 'TICK': {
      let newMetrics = { ...state.currentMetrics };
      const { settings, controls, scenario } = state;

      // Base random fluctuations
      const fluctuate = (value: number, amount: number) => value + (Math.random() - 0.5) * amount;

      newMetrics.ph = fluctuate(newMetrics.ph, 0.02 * settings.growthRate);
      newMetrics.temperature = fluctuate(newMetrics.temperature, 0.1);
      newMetrics.dissolvedOxygen = fluctuate(newMetrics.dissolvedOxygen, 0.1);
      
      // Growth
      let growthFactor = 0.1 * settings.growthRate;
      if (controls.lightOn) growthFactor *= 1.5;
      if (controls.mixerOn) growthFactor *= 1.2;
      newMetrics.turbidity = Math.min(300, newMetrics.turbidity + growthFactor);
      
      // Scenario effects
      switch(scenario) {
        case 'contamination':
          newMetrics.odorIndex = Math.min(100, newMetrics.odorIndex + 2 * settings.growthRate);
          newMetrics.ph -= 0.05;
          break;
        case 'low-light':
          newMetrics.lightIntensity = Math.max(5000, newMetrics.lightIntensity - 1000);
          newMetrics.turbidity = Math.max(20, newMetrics.turbidity - 0.05 * settings.growthRate);
          break;
        case 'rapid-growth':
          newMetrics.turbidity = Math.min(300, newMetrics.turbidity + growthFactor * 1.5);
          break;
        default: // normal
           newMetrics.odorIndex = Math.max(5, newMetrics.odorIndex - 0.1);
           newMetrics.lightIntensity = fluctuate(55000, 1000);
      }

      // Random contamination event
      if (Math.random() < settings.contaminationProbability) {
          return { ...state, scenario: 'contamination' };
      }

      // Clamp values
      newMetrics.ph = Math.max(METRIC_RANGES.ph.min, Math.min(METRIC_RANGES.ph.max, newMetrics.ph));
      newMetrics.odorIndex = Math.max(0, Math.min(100, newMetrics.odorIndex));
      
      // Update growth score
      newMetrics.growthScore = (newMetrics.turbidity / 300) * 100;
      
      const newHistory = [...state.metricsHistory, { ...newMetrics, timestamp: Date.now() }];
      // Keep history to a reasonable size
      if (newHistory.length > 5000) {
        newHistory.splice(0, newHistory.length - 5000);
      }

      return { ...state, currentMetrics: newMetrics, metricsHistory: newHistory };
    }
    case 'SET_RUNNING':
      return { ...state, isRunning: action.payload };
    case 'SET_SCENARIO': {
        const logs = [...state.logs, { id: Date.now().toString(), timestamp: Date.now(), type: 'info', message: `Scenario changed to: ${action.payload}` } as LogEntry];
        return { ...state, scenario: action.payload, logs };
    }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'TOGGLE_MIXER':
      return { ...state, controls: { ...state.controls, mixerOn: !state.controls.mixerOn } };
    case 'TOGGLE_LIGHT':
      return { ...state, controls: { ...state.controls, lightOn: !state.controls.lightOn } };
    case 'FLUSH_WATER': {
        let newMetrics = { ...state.currentMetrics };
        newMetrics.waterLevel = 60;
        setTimeout(() => {
            // This needs to dispatch another action, but for simplicity we'll just show it in logs
        }, 5000);
        return { ...state, currentMetrics: newMetrics };
    }
    case 'TRIGGER_HARVEST': {
        const harvestedAmount = state.currentMetrics.turbidity * 0.8;
        const newReport: HarvestReport = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            weight: harvestedAmount,
            quality: Math.max(0, 100 - state.currentMetrics.odorIndex),
            waterReused: 95.0,
        };
        const newMetrics = { ...state.currentMetrics, turbidity: state.currentMetrics.turbidity * 0.2 };
        return {
            ...state,
            currentMetrics: newMetrics,
            harvests: [newReport, ...state.harvests],
            logs: [...state.logs, { id: Date.now().toString(), timestamp: Date.now(), type: 'harvest', message: `Harvest completed. Weight: ${harvestedAmount.toFixed(2)}g.` } as LogEntry]
        }
    }
    case 'ADD_LOG': {
        const newLog: LogEntry = {
            ...action.payload,
            id: Date.now().toString() + Math.random(),
            timestamp: Date.now(),
        };
        const newLogs = [newLog, ...state.logs];
        if (newLogs.length > 100) newLogs.pop();
        return { ...state, logs: newLogs };
    }
    case 'LOG_CONTROL_ACTION': {
         const newLog: LogEntry = {
            id: Date.now().toString() + Math.random(),
            timestamp: Date.now(),
            type: 'control',
            message: `Control action: ${action.payload}`
         };
         const newLogs = [newLog, ...state.logs];
         if (newLogs.length > 100) newLogs.pop();
         return { ...state, logs: newLogs };
    }
    default:
      return state;
  }
};

export const SimulationContext = createContext<{ state: SimulationState; dispatch: Dispatch<Action> } | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [storedState, setStoredState] = useLocalStorage<SimulationState>('simulationState', INITIAL_STATE);
  const [state, dispatch] = useReducer(reducer, storedState);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  useEffect(() => {
    dispatch({ type: 'SET_RUNNING', payload: true });
    
    const tickInterval = setInterval(() => {
        dispatch({ type: 'TICK' });
    }, state.settings.updateFrequency * 1000);

    return () => {
        clearInterval(tickInterval);
    };
  }, [state.settings.updateFrequency]);

  return (
    <SimulationContext.Provider value={{ state, dispatch }}>
      {children}
    </SimulationContext.Provider>
  );
};
