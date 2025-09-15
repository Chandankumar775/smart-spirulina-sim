# **App Name**: Smart Spirulina Sim

## Core Features:

- Landing Page with Animated Hero: A landing page with project title, tagline, and animated tank illustration that starts the demo on click.
- Live Dashboard: Display of live metrics (water level, pH, dissolved oxygen, turbidity, temperature, light intensity, odor index, growth score) with sparklines and status colors. Shows simulated data.
- Simulated AI Camera Check: Shows a placeholder camera feed image and AI analysis results (color balance, biomass density, smell detection) with confidence scores. Alerts triggered when issues are detected.  Uses a 'tool' to evaluate.
- Controls Panel: Buttons/toggles to simulate control commands: Start/Stop Mixer, Toggle Light (Auto/Manual), Trigger Harvest, Flush/Recycle Water. UI feedback on actions.
- Harvest & Filtration Simulation: Simulate automatic harvest cycle with progress animation, biomass reduction, water recycling, and harvest report generation.
- Alerts & Logs: Real-time alert stream (low oxygen, high turbidity, low light, contamination, harvest ready) and activity log.
- Analytics & Charts: Time-series charts for pH, oxygen, biomass, and water level with timeline switching. Simulated future-prediction line for biomass.
- Demo Scenarios: Selectable demo scenarios: Normal growth, Contamination event, Low-light failure, Rapid growth/harvest ready. Scenarios affect mock values and trigger alerts.
- Settings & Mock Data Controls: Sliders to tune simulation parameters: growth rate, contamination probability, AI sensitivity, update frequency. Option to switch between deterministic and randomized data sources.
- Export & Download: Allow exporting mock Harvest Report or System Log as PDF or CSV. Simple printable summary.

## Style Guidelines:

- Primary color: Spirulina green (#70AD47), evoking growth and natural processes.
- Background color: Soft white (#F8F8F8), for a clean and modern feel.
- Accent color: Dark green (#386B22), used sparingly for key interactive elements to draw user attention.
- Body and headline font: 'Inter', a grotesque-style sans-serif font known for its modern, neutral appearance, providing excellent readability for both headlines and body text.
- Use clear and minimal icons representing tanks, pumps, sensors, and camera, all following a consistent, simple line style.
- Responsive layout: Dashboard view for desktop, compact view for mobile. Use circular gauges for metrics and line charts for trends.
- Smooth animations for live updates, toggles, and transitions, providing a fluid and engaging user experience.