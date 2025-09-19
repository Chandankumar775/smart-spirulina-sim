import { cn } from "@/lib/utils";

export const SpirulinaTankIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("spirulina-tank", className)}
  >
    <style>{`
      @keyframes bubble {
        0% { transform: translateY(0px) scale(0.8); opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
      }
      .bubble { animation: bubble 3s ease-in-out infinite; fill: currentColor; }
      .bubble-1 { animation-delay: 0s; }
      .bubble-2 { animation-delay: 0.8s; }
      .bubble-3 { animation-delay: 1.5s; }
    `}</style>
    <path d="M8 3h8" />
    <path d="M7 3v11a5 5 0 0 0 10 0V3" />
    <path d="M6 21h12" />
    <path d="M12 14a3 3 0 0 0-3 3v4h6v-4a3 3 0 0 0-3-3z" fill="currentColor" opacity="0.3" />
    <circle cx="11" cy="16" r="0.5" className="bubble bubble-1" />
    <circle cx="13.5" cy="15" r="0.7" className="bubble bubble-2" />
    <circle cx="12" cy="17" r="0.4" className="bubble bubble-3" />
  </svg>
);


export const SystemDiagramIcon = ({ className, waterLevel = 80, cultureColor = 'hsl(150, 54%, 48%)', mixerOn = false, lightOn = true }: {
    className?: string;
    waterLevel?: number;
    cultureColor?: string;
    mixerOn?: boolean;
    lightOn?: boolean;
}) => {
    const waterHeight = 155 * (waterLevel / 100);
    const waterY = 210 - waterHeight;
    
    return (
        <svg viewBox="0 0 400 300" className={cn(className)}>
            <defs>
                <linearGradient id="tankGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d1d5db" />
                    <stop offset="50%" stopColor="#f9fafb" />
                    <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
                <linearGradient id="pipeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>
                <clipPath id="tankClip">
                    <rect x="100" y="50" width="200" height="200" rx="10"/>
                </clipPath>
                 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <style>
                {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .mixer-blade {
                    transform-origin: 200px 182px;
                    animation: spin 2s linear infinite;
                }
                .light-glow {
                   filter: url(#glow);
                }
                 @keyframes wave {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-40px); }
                }
                .water-wave {
                    animation: wave 1.5s linear infinite;
                }
                @keyframes bubble {
                  0% { transform: translateY(0); opacity: 0; }
                  50% { opacity: 0.7; }
                  100% { transform: translateY(-${waterHeight * 0.8}px); opacity: 0; }
                }
                .bubble {
                  fill: white;
                  opacity: 0;
                  animation-name: bubble;
                  animation-duration: 4s;
                  animation-iteration-count: infinite;
                  animation-timing-function: linear;
                }
                `}
            </style>
            
            {/* Main Tank Structure */}
            <rect x="100" y="50" width="200" height="200" rx="10" fill="url(#tankGradient)" stroke="#94A3B8" strokeWidth="1"/>
            <rect x="90" y="40" width="220" height="20" rx="5" fill="url(#pipeGradient)" />
            <rect x="90" y="250" width="220" height="10" rx="5" fill="url(#pipeGradient)" />

            {/* Water/Culture */}
            <g clipPath="url(#tankClip)">
                 <rect x="100" y={waterY} width="200" height={waterHeight} style={{ fill: cultureColor, transition: 'y 0.5s ease, height 0.5s ease, fill 0.5s ease' }} opacity="0.8" />
                {/* Wave Animation */}
                <path d={`M 100 ${waterY} q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 V 250 H 100 Z`} fill={cultureColor} style={{transition: 'd 0.5s ease, fill 0.5s ease'}} className="water-wave" />
                <path d={`M 80 ${waterY} q 20 10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 V 250 H 80 Z`} fill={cultureColor} opacity="0.5" style={{transition: 'd 0.5s ease, fill 0.5s ease'}} className="water-wave" transform="translate(20, 2)" />
                
                {/* Bubbles */}
                <g style={{ transition: 'transform 0.5s ease' }} transform={`translate(0, ${waterY + waterHeight - 10})`}>
                    <circle cx="130" r="3" className="bubble" style={{ animationDelay: '0s' }} />
                    <circle cx="160" r="2" className="bubble" style={{ animationDelay: '1s' }} />
                    <circle cx="200" r="4" className="bubble" style={{ animationDelay: '0.5s' }} />
                    <circle cx="240" r="3" className="bubble" style={{ animationDelay: '2s' }} />
                    <circle cx="270" r="2.5" className="bubble" style={{ animationDelay: '3s' }} />
                </g>
            </g>

            {/* Pipes */}
            <rect x="300" y="100" width="50" height="15" fill="url(#pipeGradient)" stroke="#94A3B8" strokeWidth="1" />
            <path d="M350 107.5 H 370 V 220 H 300" strokeWidth="15" fill="none" stroke="url(#pipeGradient)" />
             <path d="M350 107.5 H 370 V 220 H 300" stroke="#94A3B8" strokeWidth="1.5" fill="none" />

            <rect x="50" y="100" width="50" height="15" fill="url(#pipeGradient)" stroke="#94A3B8" strokeWidth="1" />
            <path d="M50 107.5 H 30 V 150 H 100" strokeWidth="15" fill="none" stroke="url(#pipeGradient)" />
             <path d="M50 107.5 H 30 V 150 H 100" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
            
            {/* Turbine Fan */}
            <line x1="200" y1="50" x2="200" y2="180" stroke="#A0AEC0" strokeWidth="4" />
            <g className={cn(mixerOn ? "mixer-blade": "")}>
                <rect x="195" y="162" width="10" height="40" rx="5" fill="#718096" transform="rotate(0 200 182)"/>
                <rect x="195" y="162" width="10" height="40" rx="5" fill="#718096" transform="rotate(90 200 182)"/>
                <rect x="195" y="162" width="10" height="40" rx="5" fill="#718096" transform="rotate(180 200 182)"/>
                <rect x="195" y="162" width="10" height="40" rx="5" fill="#718096" transform="rotate(270 200 182)"/>
            </g>
            <circle cx="200" cy="182" r="8" fill="#4A5568" />
            
            {/* Light */}
            <g className={cn(lightOn ? 'light-glow' : '')} style={{transition: 'filter 0.3s ease'}}>
               <rect x="140" y="25" width="120" height="10" rx="5" fill={lightOn ? 'hsl(var(--primary))' : '#94A3B8'}  style={{ transition: 'fill 0.3s ease' }} />
            </g>

        </svg>
    )
};
