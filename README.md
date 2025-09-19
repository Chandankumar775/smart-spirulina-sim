# Smart Spirulina Sim

This is a working prototype web app that simulates an IoT/AI Spirulina growing system using mock/fake data. The prototype behaves like a connected system with live-updating values, simulated AI camera checks, harvest cycles, alerts, and remote controls, all driven by simulated mock data.

## How to Start the Demo

1.  Navigate to the application's home page.
2.  You will see the title "Smart Spirulina Sim" and a tagline.
3.  Click the "Start Demo" button.
4.  This will navigate you to the main dashboard and start the live simulation.

## How to Run Scenarios

The simulation starts in "Normal Growth" mode by default. You can switch to other scenarios to observe different system behaviors.

1.  On the dashboard, locate the "Demo Scenario" dropdown in the header.
2.  Select one of the available scenarios:
    *   **Normal Growth**: The default, stable growth pattern.
    *   **Contamination Event**: Simulates a contamination, causing odor and turbidity to spike, and AI to detect issues.
    *   **Low-light Failure**: Simulates a failure in the lighting system, affecting growth.
    *   **Rapid Growth**: Simulates ideal conditions leading to faster growth and an earlier "Harvest Ready" state.
3.  The dashboard metrics, alerts, and AI analysis will update to reflect the chosen scenario.

## Mock Data & Simulation Parameters

The application uses a client-side simulation engine to generate mock data in real-time. You have control over several simulation parameters.

1.  Click the **Settings** (gear icon) button in the dashboard header to open the settings panel.
2.  Inside the settings panel, you can adjust:
    *   **Update Frequency**: How often the data refreshes (e.g., 1s, 5s, 10s).
    *   **Growth Rate**: Adjusts the speed of spirulina biomass growth.
    *   **Contamination Probability**: Increases or decreases the chance of a random contamination event.
    *   **AI Check Frequency**: How often the simulated AI camera analysis runs.
3.  The changes will be applied to the simulation instantly.

## Demo Script for Presentation

Here is a sample script to demonstrate the key features of the prototype.

1.  **Start on the Landing Page**:
    *   Briefly introduce the project: "This is the Smart Spirulina Sim, a prototype of an AI-powered cultivation system."
    *   Click "Start Demo" to launch the dashboard.

2.  **Show Normal Growth (Dashboard Overview)**:
    *   Point out the live-updating metrics on the left: "Here you can see the live dashboard monitoring key metrics like pH, temperature, and growth score, all updated in real-time from our simulated sensors."
    *   Show the sparklines: "Each metric includes a mini-chart showing its recent trend."
    *   Explain the AI panel: "On the right, we have a simulated AI camera feed. The AI continuously analyzes for color, density, and smell to ensure the culture is healthy."

3.  **Trigger a Contamination Event**:
    *   Go to the "Demo Scenario" dropdown and select "Contamination Event".
    *   "Now, let's simulate a problem. I'm triggering a contamination event."
    *   Point to the metrics: "Notice the 'Odor Index' and 'Turbidity' are spiking."
    *   Point to the Alerts panel: "The system has automatically generated an alert for high turbidity."
    *   Point to the AI panel: "The AI analysis has also updated. Its border is now red, and it has detected an issue with the smell and color, with updated confidence scores."

4.  **Demonstrate Controls**:
    *   "From the controls panel, we can take action. For example, we can flush the water to try and clear the contamination."
    *   Click the "Flush / Recycle Water" button.
    *   Observe the "Water Level" metric dip and then recover, and see the log entry appear in the "System Logs" tab.

5.  **Trigger and Export a Harvest**:
    *   Switch the scenario to "Rapid Growth" and let it run for a moment until a "Harvest Ready" alert appears.
    *   "The system also tells us when it's time to harvest. Let's trigger it manually from the control panel."
    *   Click "Trigger Harvest". Point to the UI feedback showing harvest in progress.
    *   Navigate to the "Harvest Logs" tab. "After each harvest, a detailed report is generated and logged, showing the yield and quality."
    *   Click the "Export Report" button on a harvest log entry. "We can then export these reports for our records."

This script covers the core functionality and demonstrates the reactive, "smart" nature of the simulated system.
# hacksterproject
# hacksterproject
# hacksterproject
# hacksterproject
# hacksterproject
# hacksterproject
# spirulina-project-
# green-algae
